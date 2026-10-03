import { ButtonLink } from "@/components/ui/button";
import { CtaBlock } from "@/components/ui/card";
import { Container, Section } from "@/components/ui/primitives";
import type { HomeContent } from "@/content/home";

export function HomeCta({ content }: { content: HomeContent }) {
  const { cta } = content;

  return (
    <Section id="contact-cta" className="vsgh-reveal">
      <Container wide>
        <CtaBlock
          title={cta.title}
          body={cta.body}
          actions={
            <>
              <ButtonLink href="/contact" variant="primary">
                Discuss a programme
              </ButtonLink>
              <ButtonLink href="/business" variant="secondary">
                VSGH Business
              </ButtonLink>
            </>
          }
        />
      </Container>
    </Section>
  );
}
