import "server-only";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { inferComponentGroup } from "./component-groups";
import type { Catalog, CatalogEntry, EntryKind } from "./types";

export const categoryRoot = path.resolve(process.cwd(), "../category");
const groups = new Set([
  "components",
  "templates",
  "blocks",
  "screens",
  "snippets",
  "resources",
  "hooks",
]);
const excluded = new Set([
  "node_modules",
  "vendor",
  "dist",
  "build",
  "coverage",
]);
const allowed =
  /(?:\.(tsx?|jsx?|mjs|cjs|json|mdx?|css|scss|html|ya?ml|toml|sh|txt|svg)$|^(Dockerfile|Containerfile|Makefile|LICENSE|Procfile)$)/i;
const privateFile =
  /(?:^|[._-])(?:secrets?|credentials?)(?:[._-]|$)|(?:\.lockb?$|lock\.json$)/i;

export function humanize(value: string) {
  const names: Record<string, string> = {
    expo: "Expo",
    react: "React",
    nextjs: "Next.js",
    hono: "Hono",
    docker: "Docker",
    turborepo: "Turborepo",
    "github-workflows": "GitHub Workflows",
  };
  return (
    names[value] ??
    value
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase())
  );
}

async function directories(directory: string) {
  return (await readdir(directory, { withFileTypes: true }))
    .filter(
      (entry) =>
        entry.isDirectory() &&
        !entry.name.startsWith(".") &&
        !excluded.has(entry.name),
    )
    .map((entry) => entry.name)
    .sort();
}

export async function sourceFiles(
  directory: string,
  prefix = "",
  depth = 0,
): Promise<string[]> {
  if (depth > 5) return [];
  const entries = await readdir(directory, { withFileTypes: true });
  const result: string[] = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (
      entry.name.startsWith(".") ||
      excluded.has(entry.name) ||
      privateFile.test(entry.name)
    )
      continue;
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory())
      result.push(
        ...(await sourceFiles(
          path.join(directory, entry.name),
          relative,
          depth + 1,
        )),
      );
    else if (
      entry.isFile() &&
      allowed.test(entry.name) &&
      (await stat(path.join(directory, entry.name))).size <= 200_000
    )
      result.push(relative);
    if (result.length >= 200) break;
  }
  return result.slice(0, 200);
}

async function loadEntry(
  category: string,
  slug: string,
  group?: string,
): Promise<CatalogEntry> {
  const directory = path.join(categoryRoot, category, slug);
  const files = await sourceFiles(directory);
  let metadata: Record<string, unknown> = {};
  if (files.includes("item.json")) {
    const parsed: unknown = JSON.parse(
      await readFile(path.join(directory, "item.json"), "utf8"),
    );
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      throw new Error(`Invalid item.json in ${category}/${slug}`);
    metadata = parsed as Record<string, unknown>;
  }
  const readmeFile = files.find((file) => /^readme\.md$/i.test(file));
  const readme = readmeFile
    ? await readFile(path.join(directory, readmeFile), "utf8")
    : "";
  const heading = readme.match(/^#\s+(.+)$/m)?.[1];
  const description = readme
    .replace(/```[\s\S]*?```/g, "")
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line && !/^[#>|`\-\[]/.test(line) && !line.includes("{{"));
  const tags = Array.isArray(metadata.tags)
    ? metadata.tags.filter((tag): tag is string => typeof tag === "string")
    : [];
  const keywords = Array.isArray(metadata.keywords)
    ? metadata.keywords.filter(
        (keyword): keyword is string => typeof keyword === "string",
      )
    : [];
  const kind: EntryKind =
    metadata.kind === "component" ||
    metadata.kind === "resource" ||
    metadata.kind === "template"
      ? metadata.kind
      : group === "components" || group === "blocks"
        ? "component"
        : group === "resources" || group === "snippets"
          ? "resource"
          : "template";
  return {
    id: `${category}/${slug}`,
    slug,
    category,
    title:
      typeof metadata.title === "string"
        ? metadata.title
        : heading && !heading.includes("{{")
          ? heading
          : humanize(path.basename(slug)),
    description:
      typeof metadata.description === "string"
        ? metadata.description
        : (description?.slice(0, 180) ??
          `Reusable ${humanize(category)} ${kind}. Open to explore the source and setup.`),
    kind,
    componentGroup:
      kind === "component"
        ? typeof metadata.componentGroup === "string"
          ? metadata.componentGroup
          : inferComponentGroup(
              `${metadata.title || ""} ${slug} ${tags.join(" ")}`,
            )
        : undefined,
    hidden: metadata.hidden === true,
    keywords,
    tags,
    files,
    readme,
    preview: files.includes("preview.tsx"),
    updatedAt: (await stat(directory)).mtime.toISOString(),
  };
}

async function looseEntries(
  category: string,
  group?: string,
): Promise<CatalogEntry[]> {
  const directory = path.join(categoryRoot, category, group ?? "");
  const children = await readdir(directory, { withFileTypes: true });
  const entries: CatalogEntry[] = [];
  for (const child of children) {
    if (
      !child.isFile() ||
      child.name.startsWith(".") ||
      privateFile.test(child.name) ||
      !allowed.test(child.name) ||
      /^(?:readme\.md|item\.json)$/i.test(child.name)
    )
      continue;
    const info = await stat(path.join(directory, child.name));
    if (info.size > 200_000) continue;
    const slug = group ? `${group}/${child.name}` : child.name;
    entries.push({
      id: `${category}/${slug}`,
      slug,
      category,
      title: humanize(child.name.replace(/\.[^.]+$/, "")),
      description: `A reusable ${humanize(category)} file. Open to read the source.`,
      kind: "resource",
      tags: [path.extname(child.name).slice(1)],
      files: [child.name],
      readme: /\.md$/i.test(child.name)
        ? await readFile(path.join(directory, child.name), "utf8")
        : "",
      preview: false,
      singleFile: true,
      updatedAt: info.mtime.toISOString(),
    });
  }
  return entries;
}

/** Discover on every request so adding folders never requires editing a catalog. */
export async function getCatalog(): Promise<Catalog> {
  const categories = await directories(categoryRoot);
  const entries: CatalogEntry[] = [];
  for (const category of categories) {
    entries.push(...(await looseEntries(category)));
    for (const child of await directories(path.join(categoryRoot, category))) {
      if (groups.has(child)) {
        entries.push(...(await looseEntries(category, child)));
        for (const item of await directories(
          path.join(categoryRoot, category, child),
        ))
          entries.push(await loadEntry(category, `${child}/${item}`, child));
      } else entries.push(await loadEntry(category, child));
    }
  }
  const visibleEntries = entries.filter((entry) => !entry.hidden);
  return {
    categories: categories.map((slug) => ({
      slug,
      title: humanize(slug),
      count: visibleEntries.filter((entry) => entry.category === slug).length,
    })),
    entries: visibleEntries,
  };
}

export async function getEntry(category: string, slug: string[]) {
  return (await getCatalog()).entries.find(
    (entry) => entry.id === `${category}/${slug.join("/")}`,
  );
}

export async function readEntrySource(entry: CatalogEntry, file: string) {
  if (!entry.files.includes(file)) return null;
  return readFile(
    path.join(
      categoryRoot,
      entry.singleFile ? path.dirname(entry.id) : entry.id,
      file,
    ),
    "utf8",
  );
}
