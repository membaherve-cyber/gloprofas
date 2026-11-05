/**
 * Single source of truth for photographic assets.
 *
 * RULE: one file, one slot. Every path below is used in exactly one place on the
 * site, so no image is ever repeated between sections or pages. Content records
 * (articles) own their image and show it only on their own detail page; listing
 * cards are text-first for the same reason. Alerts and the how-it-works cards are
 * intentionally image-free (icon and badge led).
 *
 * `npm run check:assets` (scripts/check-assets.mjs) fails the build if any asset
 * is referenced twice or if a file in public/images is unreferenced.
 */
export const ASSETS = {
  /** Homepage hero: video poster and reduced-motion still. */
  heroAerial: "/images/hero-city-aerial.jpg",
  /** Homepage introduction, circular crop. */
  introPhone: "/images/intro-phone.jpg",
  /** Homepage report section. */
  reportScene: "/images/market-cash.jpg",
  /** Homepage featured resource card. */
  featuredResource: "/images/payment-counter.jpg",
  /** Homepage campaigns band. */
  campaignsBand: "/images/campaign-community.jpg",
  /** Campaigns page hero. */
  campaignsHero: "/images/campaign-school.jpg",
  /** Campaigns page audience illustration. */
  campaignsAudience: "/images/campaign-youth.jpg",
  /** About page hero. */
  aboutHero: "/images/article-standards.jpg",
  /** About page campaigns section. */
  aboutCampaigns: "/images/campaign-corporate.jpg",
  /** Professional services page hero. */
  servicesHero: "/images/services-assessment.jpg",
  /** Article: five minutes that stop most payment fraud. */
  articlePaymentPause: "/images/article-payment-pause.jpg",
  /** Article: four controls that protect a small business. */
  articleBusinessControls: "/images/article-business-controls.jpg",
  /** Article: a guided way to report what happened. */
  articleReporting: "/images/article-reporting.jpg",
} as const;

export type AssetKey = keyof typeof ASSETS;

export const ASSET_LIST: string[] = Object.values(ASSETS);

/** Slots that must stay photographic, with the reason recorded for review. */
export const ASSET_USAGE: Record<AssetKey, string> = {
  heroAerial: "Homepage hero only (video poster + still)",
  introPhone: "Homepage introduction only",
  reportScene: "Homepage report section only",
  featuredResource: "Homepage featured resource only",
  campaignsBand: "Homepage campaigns band only",
  campaignsHero: "Campaigns page hero only",
  campaignsAudience: "Campaigns page audience section only",
  aboutHero: "About page hero only",
  aboutCampaigns: "About page campaigns section only",
  servicesHero: "Services page hero only",
  articlePaymentPause: "Article detail: five minutes before you pay",
  articleBusinessControls: "Article detail: small business controls",
  articleReporting: "Article detail: reporting service",
};
