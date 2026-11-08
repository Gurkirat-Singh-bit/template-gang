import { CatalogBrowser } from "@/components/catalog-browser";
import { getCatalog } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; group?: string }>;
}) {
  const { category, group } = await searchParams;
  return (
    <CatalogBrowser
      catalog={await getCatalog()}
      initialCategory={category}
      initialGroup={group}
    />
  );
}
