export const VSGH_ROLE_IDS = {
  superAdmin: "vsgh-super-admin",
  editor: "vsgh-editor",
  technicalReviewer: "vsgh-technical-reviewer",
  ipReviewer: "vsgh-ip-reviewer",
  publisher: "vsgh-publisher",
} as const;

type StudioUser = {
  roles?: { name: string }[];
} | null;

export function studioUserFromValidationContext(context: unknown): StudioUser {
  if (typeof context !== "object" || context === null) {
    return null;
  }
  if (!("currentUser" in context)) {
    return null;
  }
  const user = (context as { currentUser?: StudioUser }).currentUser;
  return user ?? null;
}

function roleNames(user: StudioUser): string[] {
  return user?.roles?.map((role) => role.name) ?? [];
}

export function canSetPublished(user: StudioUser): boolean {
  const names = roleNames(user);
  return (
    names.includes("administrator") ||
    names.includes(VSGH_ROLE_IDS.superAdmin) ||
    names.includes(VSGH_ROLE_IDS.publisher)
  );
}

export function canEditPublicContent(user: StudioUser): boolean {
  const names = roleNames(user);
  if (names.includes("viewer")) {
    return names.length > 1;
  }
  return names.length > 0;
}
