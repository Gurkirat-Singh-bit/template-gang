import { afterAll, beforeAll, expect, mock, test } from "bun:test";
import { mkdir, mkdtemp, rm, symlink, writeFile } from "node:fs/promises";
import path from "node:path";

mock.module("server-only", () => ({}));
const { categoryRoot, getCatalog, getEntry, readEntrySource } =
  await import("../src/lib/catalog");
let fixture: string;
let category: string;

beforeAll(async () => {
  fixture = await mkdtemp(path.join(categoryRoot, "test-catalog-"));
  category = path.basename(fixture);
  await mkdir(path.join(fixture, "components/button"), { recursive: true });
  await mkdir(path.join(fixture, "empty"));
  await writeFile(path.join(fixture, "build.yml"), "name: Build\non: push\n");
  await writeFile(
    path.join(fixture, "components/button/index.tsx"),
    "export default function Button() { return null; }",
  );
  await writeFile(
    path.join(fixture, "components/button/README.md"),
    "# Test button\n\nA reusable button.",
  );
  await writeFile(
    path.join(fixture, "components/button/.env"),
    "PRIVATE=never-serve",
  );
  await symlink(
    path.join(fixture, "components/button/.env"),
    path.join(fixture, "components/button/leak.ts"),
  );
});

afterAll(async () => {
  if (fixture) await rm(fixture, { recursive: true });
});

test("discovers a new category and grouped component without configuration", async () => {
  const catalog = await getCatalog();
  expect(catalog.categories.find((item) => item.slug === category)?.count).toBe(
    3,
  );
  const entry = catalog.entries.find(
    (item) => item.id === `${category}/components/button`,
  );
  expect(entry?.title).toBe("Test button");
  expect(entry?.kind).toBe("component");
  expect(entry?.description).toBe("A reusable button.");
  expect(catalog.entries.some((item) => item.id === "expo/expo-01")).toBe(true);
  const workflow = await getEntry(category, ["build.yml"]);
  expect(workflow?.singleFile).toBe(true);
  expect(await readEntrySource(workflow!, "build.yml")).toContain(
    "name: Build",
  );
});

test("only exposes discovered source files, rejecting hidden files, symlinks and traversal", async () => {
  const entry = await getEntry(category, ["components", "button"]);
  expect(entry).toBeDefined();
  expect(entry!.files).toEqual(["index.tsx", "README.md"]);
  expect(await readEntrySource(entry!, "index.tsx")).toContain(
    "function Button",
  );
  expect(await readEntrySource(entry!, ".env")).toBeNull();
  expect(await readEntrySource(entry!, "leak.ts")).toBeNull();
  expect(
    await readEntrySource(entry!, "../../../../web/package.json"),
  ).toBeNull();
  expect(await getEntry("missing-category", ["nothing"])).toBeUndefined();
});

test("components are discoverable by purpose and hidden demos stay out of the catalog", async () => {
  const { componentGroups, matchesSearch } =
    await import("../src/lib/component-groups");
  const catalog = await getCatalog();
  const navbars = catalog.entries.filter((entry) =>
    matchesSearch(entry, "navbar"),
  );
  expect(navbars).toHaveLength(2);
  expect(navbars.every((entry) => entry.componentGroup === "Navbars")).toBe(
    true,
  );
  expect(
    catalog.entries.filter((entry) =>
      matchesSearch(entry, "repoassistant navbar"),
    ),
  ).toHaveLength(1);
  expect(
    catalog.entries.filter((entry) => matchesSearch(entry, "calculator")),
  ).toHaveLength(2);
  expect(
    catalog.entries
      .filter((entry) => entry.kind === "component")
      .every((entry) => entry.tags.length <= 2),
  ).toBe(true);
  expect(componentGroups(catalog.entries)[0]).toBe("Navbars");
  expect(
    catalog.entries.some((entry) => entry.id.includes("reference-image")),
  ).toBe(false);
  expect(
    (await getEntry(category, ["components", "button"]))?.componentGroup,
  ).toBe("Buttons");
});

test("future libraries infer common component types rather than source project names", async () => {
  const { inferComponentGroup } = await import("../src/lib/component-groups");
  for (const [name, expected] of Object.entries({
    Navbar: "Navbars",
    FAQAccordion: "FAQ",
    URLInput: "Inputs",
    HTTPStatusBadge: "Badges",
    SiteHeader: "Navbars",
    TableHeader: "Tables",
    DialogHeader: "Dialogs",
    CardHeader: "Cards",
    LoginForm: "Forms",
    AlertDialog: "Dialogs",
    DataTable: "Tables",
    DropdownMenu: "Dropdowns",
    ProfileAvatar: "Avatars",
    SkeletonLoader: "Loaders",
    ProductCard: "Cards",
    Accordion: "Accordions",
    Tabs: "Tabs",
    Sidebar: "Sidebars",
    Breadcrumbs: "Breadcrumbs",
    PlatformLinks: "Other components",
  })) {
    expect(inferComponentGroup(name)).toBe(expected);
  }
});
