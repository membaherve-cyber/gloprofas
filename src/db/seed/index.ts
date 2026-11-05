import { sql } from "drizzle-orm";
import { db } from "@/db";
import {
  articles,
  resources,
  scamAlerts,
  scamCategories,
  services,
  users,
  websiteSettings,
} from "@/db/schema";
import { alertSeed, articleSeed, resourceSeed, serviceSeed, siteSettingsSeed } from "./content";
import { categorySeed } from "./categories";
import { hashPassword } from "@/lib/password";
import { STAFF_CREDENTIALS } from "@/lib/admin-credentials";

export const SEED_VERSION = "2026-11-04.6";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@gloprofas.org";
const ADMIN_PASSWORD = process.env.ADMIN_INITIAL_PASSWORD ?? "Gloprofas#2026";

function daysAgo(days: number): Date {
  return new Date(Date.now() - days * 86_400_000);
}

export async function seedDatabase(): Promise<{ seeded: boolean }> {
  await db.execute(sql`select pg_advisory_lock(918273645)`);
  try {
    const existing = await db
      .select()
      .from(websiteSettings)
      .where(sql`${websiteSettings.key} = 'seed.version'`);
    if (existing[0]?.value?.version === SEED_VERSION) {
      return { seeded: false };
    }

    await db.delete(scamAlerts);
    await db.delete(scamCategories);
    await db.delete(articles);
    await db.delete(resources);
    await db.delete(services);

    const insertedCategories = await db
      .insert(scamCategories)
      .values(
        categorySeed.map((c, index) => ({
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
          isDemo: true,
        })),
      )
      .returning({ id: scamCategories.id, slugEn: scamCategories.slugEn });

    const idBySlug = new Map(insertedCategories.map((c) => [c.slugEn, c.id]));

    await db.insert(scamAlerts).values(
      alertSeed.map((a, index) => ({
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
        publishedAt: "date" in a && a.date ? new Date(a.date) : daysAgo(index * 6 + 2),
        isDemo: true,
      })),
    );

    await db.insert(articles).values(
      articleSeed.map((a, index) => ({
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
        publishedAt: "date" in a && a.date ? new Date(a.date) : daysAgo(index * 9 + 4),
        isDemo: true,
      })),
    );

    await db.insert(resources).values(
      resourceSeed.map((r, index) => ({
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
        publishedAt: daysAgo(index * 4 + 1),
        isDemo: true,
      })),
    );

    await db.insert(services).values(
      serviceSeed.map((s, index) => ({
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
        isDemo: true,
      })),
    );

    const settingRows = [
      { key: "site", value: siteSettingsSeed as unknown as Record<string, unknown> },
      { key: "seed.version", value: { version: SEED_VERSION } },
    ];
    for (const row of settingRows) {
      await db
        .insert(websiteSettings)
        .values(row)
        .onConflictDoUpdate({ target: websiteSettings.key, set: { value: row.value, updatedAt: new Date() } });
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

    return { seeded: true };
  } finally {
    await db.execute(sql`select pg_advisory_unlock(918273645)`);
  }
}
