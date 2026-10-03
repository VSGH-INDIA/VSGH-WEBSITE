import {
  PREVIEW_ROBOTS_HEADER,
  PUBLIC_INDEXING_ENABLED,
} from "./indexing-policy";

export const MIN_SECRET_LENGTH = 32;

export function isConfiguredSecret(value: string | undefined): value is string {
  return Boolean(value && value.length >= MIN_SECRET_LENGTH);
}

export function securityHeaders(
  isProduction: boolean,
  isDevelopment = false,
  turnstileEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY),
  frameAncestors = "'none'",
): {
  key: string;
  value: string;
}[] {
  const csp = [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    `frame-ancestors ${frameAncestors}`,
    "object-src 'none'",
    `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""}${turnstileEnabled ? " https://challenges.cloudflare.com" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://cdn.sanity.io",
    "font-src 'self'",
    `connect-src 'self'${turnstileEnabled ? " https://challenges.cloudflare.com" : ""}`,
    ...(turnstileEnabled
      ? ["frame-src 'self' https://challenges.cloudflare.com"]
      : []),
    ...(isProduction ? ["upgrade-insecure-requests"] : []),
  ].join("; ");

  const headers = [
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
      key: "Permissions-Policy",
      value:
        "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
    },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
    { key: "X-DNS-Prefetch-Control", value: "off" },
    { key: "Content-Security-Policy", value: csp },
  ];

  if (!PUBLIC_INDEXING_ENABLED) {
    headers.push({ key: "X-Robots-Tag", value: PREVIEW_ROBOTS_HEADER });
  }

  if (isProduction) {
    headers.push({
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains",
    });
  }

  return headers;
}

/** The only relaxed framing policy is attached to authenticated draft previews. */
export function previewSecurityHeaders(studioOrigin: string): string {
  const header = securityHeaders(
    process.env.VERCEL_ENV === "production",
    process.env.NODE_ENV === "development",
    Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY),
    studioOrigin,
  ).find(({ key }) => key === "Content-Security-Policy");
  return header?.value ?? "default-src 'self'; frame-ancestors 'none'";
}
