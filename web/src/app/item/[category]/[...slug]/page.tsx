import { notFound } from "next/navigation";
import { EntryViewer } from "@/components/entry-viewer";
import { getCatalog, readEntrySource } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export default async function ItemPage({
  params,
}: {
  params: Promise<{ category: string; slug: string[] }>;
}) {
  const { category, slug } = await params;
  const catalog = await getCatalog();
  const entry = catalog.entries.find(
    (item) => item.id === `${category}/${slug.join("/")}`,
  );
  if (!entry) notFound();
  const initialFile =
    entry.files.find((file) => file === "component.tsx") ??
    entry.files.find((file) => file === "index.tsx") ??
    entry.files.find((file) => /\.(tsx?|jsx?)$/.test(file)) ??
    entry.files[0];
  return (
    <EntryViewer
      catalog={catalog}
      entry={entry}
      initialFile={initialFile ?? ""}
      initialSource={
        initialFile ? ((await readEntrySource(entry, initialFile)) ?? "") : ""
      }
    />
  );
}
