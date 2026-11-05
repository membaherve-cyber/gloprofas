import { count, sql } from "drizzle-orm";
import { db } from "@/db";
import {
  articles,
  resources,
  scamAlerts,
  scamCategories,
  scamReports,
  services,
  users,
  websiteSettings,
} from "@/db/schema";
import { alertSeed, articleSeed, resourceSeed, serviceSeed, siteSettingsSeed } from "./content";
import { categorySeed } from "./categories";
import { hashPassword } from "@/lib/password";
import { STAFF_CREDENTIALS } from "@/lib/admin-credentials";

export const SEED_VERSION = "2026-11-05.2";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@gloprofas.org";
const ADMIN_PASSWORD = process.env.ADMIN_INITIAL_PASSWORD ?? "Gloprofas#2026";

function daysAgo(days: number): Date {
  return new Date(Date.now() - days * 86_400_000);
}

export async function seedDatabase(): Promise<{ seeded: boolean }> {
  const existing = await db
    .select()
    .from(websiteSettings)
    .where(sql`${websiteSettings.key} = 'seed.version'`);
  if (existing[0]?.value?.version === SEED_VERSION) {
    return { seeded: false };
  }

  const idBySlug = new Map<string, number>();

  for (let index = 0; index < categorySeed.length; index += 1) {
    const c = categorySeed[index];
    const row = {
      slugEn: c.slugEn,
      slugFr: c.slugFr,
      nameEn: c.nameEn,
      nameFr: c.nameFr,
      summaryEn: c.summaryEn,
      summaryFr: c.summaryFr,
      definitionEn: c.definitionEn,
      definitionFr: c.definitionFr,
      stepsEn: c.stepsEn,
      stepsFr: c.stepsFr,
      signsEn: c.signsEn,
      signsFr: c.signsFr,
      techniquesEn: c.techniquesEn,
      techniquesFr: c.techniquesFr,
      protectEn: c.protectEn,
      protectFr: c.protectFr,
      affectedEn: c.affectedEn,
      affectedFr: c.affectedFr,
      icon: c.icon,
      featured: c.featured ?? false,
      tileSize: c.tileSize ?? "compact",
      position: index,
      isPublished: true,
      isDemo: true,
    };
    const [inserted] = await db
      .insert(scamCategories)
      .values(row)
      .onConflictDoUpdate({
        target: scamCategories.slugEn,
        set: row,
      })
      .returning({ id: scamCategories.id, slugEn: scamCategories.slugEn });
    if (inserted) {
      idBySlug.set(inserted.slugEn, inserted.id);
    }
  }

  for (let index = 0; index < alertSeed.length; index += 1) {
    const a = alertSeed[index];
    const row = {
      slugEn: a.slugEn,
      slugFr: a.slugFr,
      titleEn: a.titleEn,
      titleFr: a.titleFr,
      summaryEn: a.summaryEn,
      summaryFr: a.summaryFr,
      bodyEn: a.bodyEn,
      bodyFr: a.bodyFr,
      actionsEn: a.actionsEn,
      actionsFr: a.actionsFr,
      categoryId: idBySlug.get(a.categorySlugEn) ?? null,
      country: a.country,
      riskLevel: a.riskLevel,
      imageUrl: a.imageUrl,
      status: "published",
      publishedAt: "date" in a && a.date ? new Date(a.date) : daysAgo(index * 6 + 2),
      isDemo: true,
    };
    await db
      .insert(scamAlerts)
      .values(row)
      .onConflictDoUpdate({
        target: scamAlerts.slugEn,
        set: row,
      });
  }

  for (let index = 0; index < articleSeed.length; index += 1) {
    const a = articleSeed[index];
    const row = {
      slugEn: a.slugEn,
      slugFr: a.slugFr,
      titleEn: a.titleEn,
      titleFr: a.titleFr,
      excerptEn: a.excerptEn,
      excerptFr: a.excerptFr,
      bodyEn: a.bodyEn,
      bodyFr: a.bodyFr,
      kind: a.kind,
      tag: a.tag,
      authorName: "authorName" in a && a.authorName ? a.authorName : "GLOPROFAS Editorial",
      imageUrl: a.imageUrl,
      status: "published",
      publishedAt: "date" in a && a.date ? new Date(a.date) : daysAgo(index * 9 + 4),
      isDemo: true,
    };
    await db
      .insert(articles)
      .values(row)
      .onConflictDoUpdate({
        target: articles.slugEn,
        set: row,
      });
  }

  for (let index = 0; index < resourceSeed.length; index += 1) {
    const r = resourceSeed[index];
    const row = {
      slugEn: r.slugEn,
      slugFr: r.slugFr,
      titleEn: r.titleEn,
      titleFr: r.titleFr,
      descriptionEn: r.descriptionEn,
      descriptionFr: r.descriptionFr,
      type: r.type,
      category: r.category,
      language: r.language,
      fileSizeKb: r.fileSizeKb,
      featured: r.featured,
      status: "published",
      publishedAt: daysAgo(index * 4 + 1),
      isDemo: true,
    };
    await db
      .insert(resources)
      .values(row)
      .onConflictDoUpdate({
        target: resources.slugEn,
        set: row,
      });
  }

  for (let index = 0; index < serviceSeed.length; index += 1) {
    const s = serviceSeed[index];
    const row = {
      slugEn: s.slugEn,
      slugFr: s.slugFr,
      nameEn: s.nameEn,
      nameFr: s.nameFr,
      descriptionEn: s.descriptionEn,
      descriptionFr: s.descriptionFr,
      groupKey: s.groupKey,
      pricingMode: s.pricingMode,
      bulletsEn: s.bullets,
      bulletsFr: s.bulletsFr,
      position: index,
      isPublished: true,
      isDemo: true,
    };
    await db
      .insert(services)
      .values(row)
      .onConflictDoUpdate({
        target: services.slugEn,
        set: row,
      });
  }

  const [repCount] = await db.select({ value: count() }).from(scamReports);
  if (Number(repCount?.value ?? 0) === 0) {
    await db
      .insert(scamReports)
      .values([
        {
          reference: "GLP-2026-DEMO01",
          categorySlug: "mobile-money-scams",
          description:
            "Illustrative report. Received an SMS claiming a 50,000 FCFA transfer was sent by mistake and requesting an immediate reversal.",
          incidentDate: "2026-10-28",
          channel: "SMS",
          country: "Cameroon",
          city: "Douala",
          moneyLost: false,
          ongoing: false,
          reporterName: "Demo Reporter",
          reporterEmail: "demo.reporter@example.com",
          language: "fr",
          status: "new",
        },
        {
          reference: "GLP-2026-DEMO02",
          categorySlug: "employment-scams",
          description:
            "Illustrative report. Contacted on WhatsApp regarding a job offer that requested a registration fee before the interview.",
          incidentDate: "2026-10-24",
          channel: "WhatsApp / messaging",
          country: "Cameroon",
          city: "Yaoundé",
          moneyLost: false,
          ongoing: true,
          reporterName: "Demo Candidate",
          reporterEmail: "demo.candidate@example.com",
          language: "en",
          status: "under-review",
        },
      ])
      .onConflictDoNothing();
  }

  for (const staff of STAFF_CREDENTIALS) {
    const passwordHash = await hashPassword(staff.password);
    await db
      .insert(users)
      .values({
        name: staff.name,
        email: staff.email.toLowerCase(),
        passwordHash,
        role: staff.role,
        isActive: true,
      })
      .onConflictDoUpdate({
        target: users.email,
        set: {
          name: staff.name,
          passwordHash,
          role: staff.role,
          isActive: true,
        },
      });
  }

  await db
    .insert(users)
    .values({
      name: "GLOPROFAS Administrator",
      email: ADMIN_EMAIL.toLowerCase(),
      passwordHash: await hashPassword(ADMIN_PASSWORD),
      role: "super-administrator",
      isActive: true,
    })
    .onConflictDoNothing();

  const settingRows = [
    { key: "site", value: siteSettingsSeed as unknown as Record<string, unknown> },
    { key: "seed.version", value: { version: SEED_VERSION } },
  ];
  for (const row of settingRows) {
    await db
      .insert(websiteSettings)
      .values(row)
      .onConflictDoUpdate({
        target: websiteSettings.key,
        set: { value: row.value, updatedAt: new Date() },
      });
  }

  return { seeded: true };
}
