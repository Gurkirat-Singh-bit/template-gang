import { getEntry, readEntrySource } from "@/lib/catalog";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id") ?? "";
  const [category, ...slug] = id.split("/");
  const entry = await getEntry(category, slug);
  if (!entry) return new Response("Entry not found", { status: 404 });
  const source = await readEntrySource(
    entry,
    url.searchParams.get("file") ?? "",
  );
  if (source === null) return new Response("File not found", { status: 404 });
  return new Response(source, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
