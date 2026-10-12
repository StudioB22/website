import { readFile } from "node:fs/promises";
import type { APIRoute } from "astro";
import { localProjectPreviews } from "../../../../config/local-project-preview";

export const getStaticPaths = () =>
  import.meta.env.DEV
    ? localProjectPreviews.flatMap((preview) =>
        preview.captures.map((capture) => ({
          params: { slug: preview.projectSlug, name: capture.name },
        })),
      )
    : [];

export const GET: APIRoute = async ({ params }) => {
  const capture = import.meta.env.DEV
    ? localProjectPreviews
        .find((preview) => preview.projectSlug === params.slug)
        ?.captures.find((item) => item.name === params.name)
    : undefined;
  if (!capture) {
    return new Response(null, { status: 404 });
  }
  const bytes = await readFile(capture.fileUrl);
  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
};
