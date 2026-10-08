"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import type { GlobalProgrammePartner } from "@/content/global-programme-partners";
import { ButtonLink } from "@/components/ui/button";
import { Container, Heading, Text } from "@/components/ui/primitives";

function partnerEnquiryHref(partner: GlobalProgrammePartner): string {
  return `/contact?enquiry=global-partnership-programme&partner=${partner.slug}`;
}

export function GlobalPartnerDirectory({
  partners,
}: {
  partners: GlobalProgrammePartner[];
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const selected = partners.find((partner) => partner.slug === selectedSlug);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selected) {
      if (!dialog.open) dialog.showModal();
      return;
    }
    if (dialog.open) dialog.close();
  }, [selected]);

  function closeProfile() {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    setSelectedSlug(null);
  }

  function openProfile(partner: GlobalProgrammePartner) {
    setSelectedSlug(partner.slug);
    track("global_partner_profile_opened", { partner: partner.slug });
  }

  if (!partners.length) return null;

  return (
    <section
      aria-labelledby="global-partner-directory-heading"
      className="border-y border-border bg-surface"
      style={{ paddingBlock: "var(--vsgh-section-y)" }}
    >
      <Container wide className="space-y-8">
        <div className="max-w-3xl space-y-3">
          <p className="font-mono text-[length:var(--vsgh-text-label)] uppercase tracking-[var(--vsgh-tracking-label)] text-muted">
            Global connections
          </p>
          <Heading as="h2" variant="h2" id="global-partner-directory-heading">
            Selected partner companies.
          </Heading>
          <Text className="max-w-2xl text-muted">
            Explore approved public company profiles and begin the relevant
            conversation through VSGH.
          </Text>
        </div>

        <ul className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => (
            <li key={partner.id} className="bg-background">
              <button
                type="button"
                className="group flex min-h-64 w-full flex-col justify-between p-6 text-left outline-none transition-colors hover:bg-surface-elevated focus-visible:bg-surface-elevated focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#8ec0ff] sm:p-8"
                aria-haspopup="dialog"
                aria-label={`View ${partner.companyName} profile`}
                onClick={() => openProfile(partner)}
              >
                <span className="relative block h-20 w-full max-w-48">
                  <Image
                    fill
                    src={partner.logo.src}
                    alt={partner.logo.decorative ? "" : partner.logo.altText}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain object-left"
                  />
                </span>
                <span className="mt-10 block">
                  <span className="block font-display text-[length:var(--vsgh-text-h3)] font-medium text-foreground">
                    {partner.companyName}
                  </span>
                  <span className="mt-4 block font-mono text-[length:var(--vsgh-text-meta)] uppercase tracking-[var(--vsgh-tracking-label)] text-[#9fb7cf] transition-colors group-hover:text-foreground">
                    View company profile ↗
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Container>

      <dialog
        ref={dialogRef}
        aria-labelledby="partner-profile-title"
        className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-3xl border border-border bg-background p-0 text-foreground shadow-2xl backdrop:bg-black/80"
        onCancel={(event) => {
          event.preventDefault();
          closeProfile();
        }}
        onClose={() => setSelectedSlug(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeProfile();
        }}
      >
        {selected ? (
          <article className="max-h-[calc(100dvh-2rem)] overflow-y-auto p-6 sm:p-8 lg:p-10">
            <div className="flex items-start justify-between gap-6 border-b border-border pb-6">
              <div className="relative h-16 w-44 shrink-0 sm:h-20 sm:w-52">
                <Image
                  fill
                  src={selected.logo.src}
                  alt={selected.logo.decorative ? "" : selected.logo.altText}
                  sizes="208px"
                  className="object-contain object-left"
                />
              </div>
              <button
                type="button"
                className="grid size-10 shrink-0 place-items-center border border-border text-xl leading-none outline-none transition-colors hover:border-foreground focus-visible:ring-2 focus-visible:ring-[#8ec0ff]"
                aria-label={`Close ${selected.companyName} profile`}
                onClick={closeProfile}
              >
                ×
              </button>
            </div>

            <div className="mt-8 space-y-8">
              <div className="max-w-2xl space-y-3">
                <p className="font-mono text-[length:var(--vsgh-text-label)] uppercase tracking-[var(--vsgh-tracking-label)] text-muted">
                  Partner profile
                </p>
                <Heading as="h2" variant="h2" id="partner-profile-title">
                  {selected.companyName}
                </Heading>
                <Text className="whitespace-pre-line text-muted">
                  {selected.overview}
                </Text>
              </div>

              <div className="grid gap-8 border-y border-border py-7 md:grid-cols-2">
                <section aria-labelledby="partner-services-heading">
                  <p
                    id="partner-services-heading"
                    className="font-mono text-[length:var(--vsgh-text-meta)] uppercase tracking-[var(--vsgh-tracking-label)] text-muted"
                  >
                    Public services
                  </p>
                  <ul className="mt-4 space-y-2">
                    {selected.services.map((service) => (
                      <li
                        key={service}
                        className="text-sm leading-6 text-foreground"
                      >
                        {service}
                      </li>
                    ))}
                  </ul>
                </section>
                <section aria-labelledby="partner-contact-heading">
                  <p
                    id="partner-contact-heading"
                    className="font-mono text-[length:var(--vsgh-text-meta)] uppercase tracking-[var(--vsgh-tracking-label)] text-muted"
                  >
                    Public contact
                  </p>
                  <address className="mt-4 not-italic text-sm leading-6 text-foreground">
                    <p>{selected.contact.name ?? "Business enquiries"}</p>
                    {selected.contact.role ? (
                      <p className="text-muted">{selected.contact.role}</p>
                    ) : null}
                    <a
                      className="mt-3 block underline underline-offset-4 hover:text-accent-strong"
                      href={`mailto:${selected.contact.email}`}
                    >
                      {selected.contact.email}
                    </a>
                    {selected.contact.phone ? (
                      <a
                        className="block underline underline-offset-4 hover:text-accent-strong"
                        href={`tel:${selected.contact.phone.replace(/[^+\d]/g, "")}`}
                      >
                        {selected.contact.phone}
                      </a>
                    ) : null}
                  </address>
                </section>
              </div>

              <section aria-labelledby="partner-locations-heading">
                <p
                  id="partner-locations-heading"
                  className="font-mono text-[length:var(--vsgh-text-meta)] uppercase tracking-[var(--vsgh-tracking-label)] text-muted"
                >
                  Public locations
                </p>
                <div className="mt-4 grid gap-5 sm:grid-cols-2">
                  {selected.locations.map((location) => (
                    <address
                      key={`${location.label}-${location.address}`}
                      className="border-l border-border pl-4 text-sm leading-6 not-italic text-muted"
                    >
                      <p className="font-medium text-foreground">
                        {location.label}
                      </p>
                      <p className="mt-1 whitespace-pre-line">
                        {location.address}
                      </p>
                    </address>
                  ))}
                </div>
              </section>

              <div className="flex flex-wrap gap-3 border-t border-border pt-7">
                <ButtonLink
                  href={partnerEnquiryHref(selected)}
                  variant="primary"
                >
                  Discuss through VSGH
                </ButtonLink>
                <a
                  href={selected.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[var(--vsgh-control)] items-center justify-center border border-border px-5 py-2.5 text-[length:var(--vsgh-text-nav)] font-medium transition-colors hover:border-foreground"
                >
                  Visit official website ↗
                </a>
              </div>
            </div>
          </article>
        ) : null}
      </dialog>
    </section>
  );
}
