"use client";

import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import type { HomeContent } from "@/content/home";
import { HeroMotionField } from "@/components/home/hero-motion-field";

export function HomeHero({ content }: { content: HomeContent }) {
  const { hero } = content;

  return (
    <section className="group relative isolate min-h-[calc(100svh-4.31rem)] overflow-hidden border-b border-border bg-[#05080d]">
      <Image
        src="/images/vsgh-aerospace-material-hero-v1.png"
        alt="A precision aerospace component with cool blue and restrained amber light"
        fill
        priority
        sizes="100vw"
        className="absolute z-0 object-cover object-[72%_50%] opacity-75 transition-transform duration-1000 ease-out motion-safe:group-hover:scale-[1.025]"
      />
      <div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(5,8,13,.96)_0%,rgba(5,8,13,.76)_37%,rgba(5,8,13,.15)_76%),linear-gradient(0deg,rgba(5,8,13,.82)_0%,transparent_48%)]" />
      <HeroMotionField />
      <div className="pointer-events-none absolute inset-0 z-30 opacity-50 [background-image:linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] [background-size:4.5rem_4.5rem,4.5rem_4.5rem]" />

      <div
        className="relative z-40 mx-auto flex min-h-[calc(100svh-4.31rem)] max-w-[var(--vsgh-content-wide)] flex-col justify-end pb-6 pt-24"
        style={{ paddingInline: "var(--vsgh-gutter)" }}
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,.55fr)] lg:items-end">
          <div className="max-w-4xl">
            <p className="mb-5 font-mono text-[length:var(--vsgh-text-label)] uppercase tracking-[var(--vsgh-tracking-label)] text-[#b9c4cf]">
              {hero.eyebrow}
            </p>
            <h1 className="max-w-4xl font-display text-[clamp(3.2rem,8.7vw,8.6rem)] font-semibold leading-[.9] tracking-[-.07em] text-white">
              {hero.headline}{" "}
              <span className="text-[#9fb7cf]">{hero.emphasis}</span>
            </h1>
          </div>
          <div className="max-w-md border-l border-white/20 pl-5">
            <p className="text-sm leading-6 text-[#c8d0d8] sm:text-base">
              {hero.body}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink
                href="#explorer"
                variant="primary"
                className="!rounded-full !bg-[#e9eff3] !px-5 !text-[#080c14] hover:!bg-white"
              >
                Explore programme path <span aria-hidden>↘</span>
              </ButtonLink>
              <ButtonLink
                href="/contact"
                variant="secondary"
                className="!rounded-full !border-white/30 !px-5 hover:!border-white hover:!bg-white/10"
              >
                Start a conversation
              </ButtonLink>
            </div>
          </div>
        </div>
        <div className="mt-12 grid border-y border-white/15 sm:grid-cols-4">
          {[
            ["01", "Resource", "Recovered feedstock"],
            ["02", "Material", "Metallurgy & development"],
            ["03", "Qualification", "Evidence before declaration"],
            ["04", "Application", "Flight-relevant context"],
          ].map(([index, value, label]) => (
            <a
              className="group/item flex min-h-24 flex-col justify-between border-white/15 p-4 no-underline sm:border-r last:sm:border-r-0"
              href="#explorer"
              key={index}
            >
              <span className="font-mono text-[10px] tracking-[.18em] text-[#9fb7cf]">
                /{index}
              </span>
              <span className="flex items-end justify-between gap-2">
                <span>
                  <span className="block text-sm font-medium text-white">
                    {value}
                  </span>
                  <span className="block pt-1 font-mono text-[10px] uppercase tracking-[.1em] text-[#aab4bf]">
                    {label}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="text-sm text-white/60 transition-transform group-hover/item:translate-x-1"
                >
                  ↘
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
