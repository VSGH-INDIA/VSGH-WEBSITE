import {
  PREVIEW_ROBOTS_HEADER,
  PUBLIC_INDEXING_ENABLED,
} from "./indexing-policy";

export const MIN_SECRET_LENGTH = 32;

export function isConfiguredSecret(value: string | undefined): value is string {
  return Boolean(value && value.length >= MIN_SECRET_LENGTH);
}

export function securityHeaders(isProduction: boolean): {
  key: string;
  value: string;
}[] {
  const csp = [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://cdn.sanity.io",
    "font-src 'self'",
    "connect-src 'self'",
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
