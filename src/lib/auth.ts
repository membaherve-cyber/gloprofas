import "server-only";
import { argon2Verify, argon2id } from "hash-wasm";
import { createHmac, randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies, headers } from "next/headers";
import { and, eq, gt, isNull } from "drizzle-orm";
import { db } from "@/db";
import { sessions, userRoles, users, roles } from "@/db/schema";
import { env } from "@/lib/env";
import type { RoleKey } from "@/lib/types";
import { hashIp, sha256, uid } from "@/lib/utils";

const scrypt = promisify(scryptCb);
const COOKIE = "glp_session";
const SESSION_DAYS = 7;

export async function hashPassword(password: string) {
  const salt = randomBytes(16);
  return argon2id({
    password,
    salt,
    parallelism: 1,
    iterations: 2,
    memorySize: 8192,
    hashLength: 32,
    outputType: "encoded",
  });
}

export async function verifyPassword(password: string, hash: string) {
  if (hash.startsWith("scrypt$")) {
    const [, salt, expected] = hash.split("$");
    const derived = (await scrypt(password, salt, 32)) as Buffer;
    const exp = Buffer.from(expected, "hex");
    if (derived.length !== exp.length) return false;
    return timingSafeEqual(derived, exp);
  }
  return argon2Verify({ password, hash });
}

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  roles: RoleKey[];
  totpEnabled: boolean;
  isDemo: boolean;
};

export async function createSession(userId: string) {
  const token = randomBytes(32).toString("hex");
  const headerStore = await headers();
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  await db.insert(sessions).values({
    id: uid("ses"),
    userId,
    tokenHash: sha256(token),
    expiresAt,
    userAgent: headerStore.get("user-agent")?.slice(0, 180) || null,
    ipHash: hashIp(headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() || "0.0.0.0"),
  });
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: headerStore.get("x-forwarded-proto") === "https",
    path: "/",
    expires: expiresAt,
  });
}

export async function destroySession() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (token) {
    await db.delete(sessions).where(eq(sessions.tokenHash, sha256(token)));
  }
  jar.delete(COOKIE);
}

export async function getSession(): Promise<SessionUser | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;
  const [row] = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      totpEnabled: users.totpEnabled,
      isDemo: users.isDemo,
      active: users.active,
      deletedAt: users.deletedAt,
    })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(and(eq(sessions.tokenHash, sha256(token)), gt(sessions.expiresAt, new Date())))
    .limit(1);
  if (!row || !row.active || row.deletedAt) return null;
  const roleRows = await db
    .select({ key: roles.key })
    .from(userRoles)
    .innerJoin(roles, eq(userRoles.roleId, roles.id))
    .where(eq(userRoles.userId, row.id));
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    roles: roleRows.map((item) => item.key as RoleKey),
    totpEnabled: row.totpEnabled,
    isDemo: row.isDemo,
  };
}

const BASE32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

export function generateTotpSecret() {
  const bytes = randomBytes(20);
  let bits = "";
  for (const byte of bytes) bits += byte.toString(2).padStart(8, "0");
  let out = "";
  for (let i = 0; i < bits.length; i += 5) {
    const chunk = bits.slice(i, i + 5).padEnd(5, "0");
    out += BASE32[Number.parseInt(chunk, 2)];
  }
  return out;
}

function base32Decode(input: string) {
  const clean = input.replace(/=+$/g, "").toUpperCase();
  let bits = "";
  for (const char of clean) {
    const idx = BASE32.indexOf(char);
    if (idx < 0) continue;
    bits += idx.toString(2).padStart(5, "0");
  }
  const bytes = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) bytes.push(Number.parseInt(bits.slice(i, i + 8), 2));
  return Buffer.from(bytes);
}

export function totpCode(secret: string, at = Date.now()) {
  const counter = Math.floor(at / 30000);
  const buf = Buffer.alloc(8);
  buf.writeBigUInt64BE(BigInt(counter));
  const hmac = createHmac("sha1", base32Decode(secret)).update(buf).digest();
  const offset = hmac[hmac.length - 1] & 0xf;
  const code = (hmac.readUInt32BE(offset) & 0x7fffffff) % 1_000_000;
  return code.toString().padStart(6, "0");
}

export function verifyTotp(secret: string, token: string) {
  const clean = token.replace(/\s/g, "");
  const now = Date.now();
  return [-1, 0, 1].some((step) => totpCode(secret, now + step * 30000) === clean);
}

export function signedToken(payload: string) {
  const body = Buffer.from(payload).toString("base64url");
  const sig = createHmac("sha256", env().APP_ENCRYPTION_KEY).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function readSignedToken(token: string) {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = createHmac("sha256", env().APP_ENCRYPTION_KEY).update(body).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  return Buffer.from(body, "base64url").toString("utf8");
}
