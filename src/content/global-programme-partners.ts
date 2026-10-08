import { publicMediaOrNull, type MediaAsset } from "@/lib/media";

export type GlobalProgrammePartner = {
  id: string;
  slug: string;
  companyName: string;
  overview: string;
  logo: MediaAsset;
  services: string[];
  contact: {
    name?: string;
    role?: string;
    email: string;
    phone?: string;
  };
  locations: { label: string; address: string }[];
  website: string;
};

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[0-9+().\-\s]{4,40}$/;

function text(value: unknown, max: number): string {
  return typeof value === "string"
    ? value.replace(/\s+/g, " ").trim().slice(0, max)
    : "";
}

function multilineText(value: unknown, max: number): string {
  return typeof value === "string"
    ? value.replace(/\r\n?/g, "\n").trim().slice(0, max)
    : "";
}

function safeWebsite(value: unknown): string {
  if (typeof value !== "string" || value.length > 2_048) return "";
  try {
    const url = new URL(value);
    return url.protocol === "https:" &&
      url.hostname &&
      !url.username &&
      !url.password
      ? url.toString()
      : "";
  } catch {
    return "";
  }
}

function normalizeServices(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return [
    ...new Set(value.map((item) => text(item, 100)).filter(Boolean)),
  ].slice(0, 12);
}

function normalizeLocations(
  value: unknown,
): GlobalProgrammePartner["locations"] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item !== "object" || item === null) return null;
      const row = item as Record<string, unknown>;
      const label = text(row.label, 80);
      const address = multilineText(row.address, 400);
      return label && address ? { label, address } : null;
    })
    .filter(
      (item): item is GlobalProgrammePartner["locations"][number] =>
        item !== null,
    )
    .slice(0, 6);
}

export function normalizeGlobalProgrammePartner(
  value: unknown,
): GlobalProgrammePartner | null {
  if (typeof value !== "object" || value === null) return null;
  const row = value as Record<string, unknown>;
  const id = text(row.id ?? row._id, 160);
  const slug = text(row.slug, 96);
  const companyName = text(row.companyName, 120);
  const overview = multilineText(row.overview, 1_200);
  const logo = publicMediaOrNull(row.logo);
  const services = normalizeServices(row.services);
  const locations = normalizeLocations(row.locations);
  const website = safeWebsite(row.website);
  const contactRow =
    typeof row.contact === "object" && row.contact !== null
      ? (row.contact as Record<string, unknown>)
      : null;
  const contactName = text(contactRow?.name, 120);
  const contactRole = text(contactRow?.role, 120);
  const email = text(contactRow?.email, 254).toLowerCase();
  const phone = text(contactRow?.phone, 40);

  if (
    !id ||
    !SLUG.test(slug) ||
    !companyName ||
    !overview ||
    !logo ||
    !services.length ||
    !locations.length ||
    !website ||
    !EMAIL.test(email) ||
    (phone && !PHONE.test(phone))
  ) {
    return null;
  }

  return {
    id,
    slug,
    companyName,
    overview,
    logo,
    services,
    contact: {
      ...(contactName ? { name: contactName } : {}),
      ...(contactRole ? { role: contactRole } : {}),
      email,
      ...(phone ? { phone } : {}),
    },
    locations,
    website,
  };
}

export function normalizeGlobalProgrammePartners(
  value: unknown,
): GlobalProgrammePartner[] {
  if (!Array.isArray(value)) return [];
  return value
    .map(normalizeGlobalProgrammePartner)
    .filter((item): item is GlobalProgrammePartner => item !== null);
}
