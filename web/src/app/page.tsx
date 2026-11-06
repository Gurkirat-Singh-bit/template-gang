import { CatalogBrowser } from "@/components/catalog-browser";
import { getCatalog } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  return (
    <CatalogBrowser catalog={await getCatalog()} initialCategory={category} />
  );
}
