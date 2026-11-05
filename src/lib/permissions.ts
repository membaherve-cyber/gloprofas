import type { RoleKey } from "@/lib/types";
import type { SessionUser } from "@/lib/auth";

export const PERMISSIONS = [
  "dashboard.view",
  "reports.read",
  "reports.update",
  "reports.export",
  "reports.notes",
  "alerts.manage",
  "content.manage",
  "enquiries.manage",
  "volunteers.manage",
  "partnerships.manage",
  "newsletter.manage",
  "users.manage",
  "settings.manage",
  "ai.manage",
  "logs.read",
  "media.manage",
] as const;

export type Permission = (typeof PERMISSIONS)[number];

const ALL = PERMISSIONS;

export const ROLE_PERMISSIONS: Record<RoleKey, readonly Permission[]> = {
  super_admin: ALL,
  administrator: [
    "dashboard.view",
    "reports.read",
    "reports.update",
    "reports.export",
    "reports.notes",
    "alerts.manage",
    "content.manage",
    "enquiries.manage",
    "volunteers.manage",
    "partnerships.manage",
    "newsletter.manage",
    "settings.manage",
    "logs.read",
    "media.manage",
  ],
  report_officer: ["dashboard.view", "reports.read", "reports.update", "reports.export", "reports.notes", "logs.read"],
  content_editor: ["dashboard.view", "alerts.manage", "content.manage", "media.manage"],
  customer_support: ["dashboard.view", "enquiries.manage", "newsletter.manage"],
  ai_manager: ["dashboard.view", "ai.manage", "logs.read"],
  volunteer_manager: ["dashboard.view", "volunteers.manage", "partnerships.manage"],
};

export function can(user: SessionUser | null, permission: Permission) {
  if (!user) return false;
  return user.roles.some((role) => ROLE_PERMISSIONS[role]?.includes(permission));
}

export function canAny(user: SessionUser | null, permissions: Permission[]) {
  return permissions.some((permission) => can(user, permission));
}
