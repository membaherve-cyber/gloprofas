import { z } from "zod";

const schema = z.object({
  DATABASE_URL: z.string().min(1),
  NODE_ENV: z.string().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().default("http://localhost:3000"),
  DEFAULT_LOCALE: z.string().default("en"),
  SESSION_SECRET: z.string().min(16).default("dev-only-session-secret-change-me"),
  APP_ENCRYPTION_KEY: z.string().min(16).default("dev-only-encryption-key-change"),
  PRIVATE_STORAGE_PATH: z.string().default("./storage/private"),
  SMTP_HOST: z.string().optional().default(""),
  SMTP_PORT: z.string().optional().default(""),
  SMTP_USERNAME: z.string().optional().default(""),
  SMTP_PASSWORD: z.string().optional().default(""),
  SMTP_SECURE: z.string().optional().default(""),
  MAIL_FROM_ADDRESS: z.string().optional().default(""),
  MAIL_FROM_NAME: z.string().optional().default("GLOPROFAS"),
  TURNSTILE_SITE_KEY: z.string().optional().default(""),
  TURNSTILE_SECRET_KEY: z.string().optional().default(""),
  GEMINI_API_KEY: z.string().optional().default(""),
  GEMINI_MODEL: z.string().optional().default("gemini-2.5-flash"),
  CRON_SECRET: z.string().optional().default(""),
});

export type Env = z.infer<typeof schema>;

let cached: Env | null = null;

export function env(): Env {
  if (cached) return cached;
  const parsed = schema.safeParse(process.env);
  if (!parsed.success) {
    const missing = parsed.error.issues.map((issue) => issue.path.join(".")).join(", ");
    throw new Error(`Invalid environment: ${missing}`);
  }
  cached = parsed.data;
  return cached;
}
