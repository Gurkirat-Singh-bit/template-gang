import { notFound } from "next/navigation";
import { previews } from "@/lib/generated-previews";
import { getCatalog } from "@/lib/catalog";
import { PreviewFallback } from "@/components/preview-fallback";

export const dynamic = "force-dynamic";

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const id = slug.join("/");
  const Preview = previews[id];
  if (!(await getCatalog()).entries.some((entry) => entry.id === id))
    notFound();
  if (!Preview)
    return (
      <main className="preview-page">
        <PreviewFallback
          title="Preview not registered"
          description="Restart the dev server to register this component."
        />
      </main>
    );
  return (
    <main className="preview-page">
      <Preview />
    </main>
  );
}
