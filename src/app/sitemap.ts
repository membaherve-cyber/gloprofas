import type { MetadataRoute } from "next";
import { buildAlternateMap } from "@/server/queries";
import { ensureSeeded } from "@/db/seed";
import { siteUrl } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await ensureSeeded();
  const map = await buildAlternateMap();
  const paths = Object.keys(map).filter((path) => path.startsWith("/en"));
  return paths.map((path) => ({
    url: `${siteUrl()}${path}`,
    alternates: { languages: { en: `${siteUrl()}${path}`, fr: `${siteUrl()}${map[path]}` } },
  }));
}
