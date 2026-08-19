import { ButtonLink } from "@/components/ui/button";
import { Metric } from "@/components/ui/card";
import { Hero } from "@/components/ui/hero";
import { Container, Divider } from "@/components/ui/primitives";
import { homeContent } from "@/content/home";
import { MediaPlaceholder } from "@/components/home/media-placeholder";

export function HomeHero() {
  const { hero } = homeContent;

  return (
    <>
      <Hero
        eyebrow={hero.eyebrow}
        headline={hero.headline}
        emphasis={hero.emphasis}
        body={hero.body}
        media={
          <MediaPlaceholder
            label="Visual placeholder · approved photography to replace"
            className="aspect-[16/10] lg:aspect-[4/5]"
          />
        }
        actions={
          <>
            <ButtonLink href="/contact" variant="primary">
              Discuss a programme
            </ButtonLink>
            <ButtonLink href="#capability" variant="secondary">
              View capability
            </ButtonLink>
          </>
        }
      />
      <Container wide>
        <div className="grid border-x border-border md:grid-cols-4">
          <Metric
            index="[01]"
            value="Resource"
            label="Recovered feedstock as the start"
          />
          <Metric
            index="[02]"
            value="Material"
            label="Metallurgy and development"
          />
          <Metric
            index="[03]"
            value="Qualification"
            label="Evidence before declaration"
          />
          <Metric
            index="[04]"
            value="Application"
            label="Aerospace-adjacent use"
          />
        </div>
      </Container>
      <Divider />
    </>
  );
}
