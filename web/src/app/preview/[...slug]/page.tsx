import { notFound } from "next/navigation";
import { previews } from "@/lib/generated-previews";
import { getCatalog } from "@/lib/catalog";
import { PreviewFallback } from "@/components/preview-fallback";

export const dynamic = "force-dynamic";

export default async function PreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ thumbnail?: string }>;
}) {
  const { slug } = await params;
  const id = slug.join("/");
  const thumbnail = (await searchParams).thumbnail === "1";
  const loadPreview = previews[id];
  if (!(await getCatalog()).entries.some((entry) => entry.id === id))
    notFound();
  if (!loadPreview)
    return (
      <main
        className={`preview-page${thumbnail ? " preview-page--thumbnail" : ""}`}
      >
        <PreviewFallback
          title="Preview not registered"
          description="Restart the dev server to register this component."
        />
      </main>
    );
  const { default: Preview } = await loadPreview();
  return (
    <main
      className={`preview-page${thumbnail ? " preview-page--thumbnail" : ""}`}
    >
      <Preview />
    </main>
  );
}
