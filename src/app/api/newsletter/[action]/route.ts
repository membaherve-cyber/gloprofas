import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";
import { verifyToken } from "@/server/mail";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ action: string }> },
) {
  const { action } = await params;
  if (action !== "confirm" && action !== "unsubscribe") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const token = new URL(request.url).searchParams.get("token") ?? "";
  const email = verifyToken(action, token);
  const redirectBase = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;

  if (!email) {
    return NextResponse.redirect(`${redirectBase}/en/newsletter?status=invalid`);
  }

  await db
    .update(newsletterSubscribers)
    .set({ status: action === "confirm" ? "confirmed" : "unsubscribed" })
    .where(eq(newsletterSubscribers.email, email));

  return NextResponse.redirect(`${redirectBase}/en/newsletter?status=${action === "confirm" ? "confirmed" : "unsubscribed"}`);
}
