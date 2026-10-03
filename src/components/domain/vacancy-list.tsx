import type { CareerVacancy } from "@/content/careers";
import { Heading, Text } from "@/components/ui/primitives";

export function VacancyList({
  vacancies,
}: {
  vacancies: readonly CareerVacancy[];
}) {
  if (vacancies.length === 0) {
    return null;
  }

  return (
    <ul className="divide-y divide-border border-y border-border">
      {vacancies.map((vacancy) => (
        <li
          className="group grid gap-4 py-7 transition-colors hover:bg-white/[.025] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)_auto] md:items-start"
          key={vacancy.slug}
        >
          <div className="space-y-2">
            <p className="font-mono text-[length:var(--vsgh-text-meta)] uppercase tracking-[var(--vsgh-tracking-label)] text-muted">
              {vacancy.discipline}
              {vacancy.location ? ` · ${vacancy.location}` : ""}
            </p>
            <Heading
              as="h3"
              variant="h3"
              className="group-hover:text-[#b9d9ff]"
            >
              {vacancy.title}
            </Heading>
          </div>
          <div className="space-y-3">
            <Text size="small" className="text-muted">
              {vacancy.summary}
            </Text>
            <p className="font-mono text-[length:var(--vsgh-text-meta)] text-muted">
              {vacancy.posted ? `Posted ${vacancy.posted}` : "Open role"}
            </p>
          </div>
          <span
            aria-hidden
            className="hidden font-mono text-lg text-muted md:block"
          >
            ↗
          </span>
        </li>
      ))}
    </ul>
  );
}
