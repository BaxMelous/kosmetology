import { buildRemoteFileUrl } from "@/lib/api/client";

type RouteContext = {
  params: Promise<{
    fileId: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { fileId } = await context.params;

  try {
    const response = await fetch(buildRemoteFileUrl(fileId), {
      next: { revalidate: 60 * 60 * 24 },
    });

    if (!response.ok) {
      return new Response(null, { status: response.status });
    }

    const contentType = response.headers.get("content-type") ?? "image/jpeg";
    const arrayBuffer = await response.arrayBuffer();

    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error) {
    console.error(`Failed to proxy doctor image ${fileId}`, error);
    return new Response(null, { status: 502 });
  }
}
