import { ButtonLink } from "@/components/ui/button";
import { CtaBlock } from "@/components/ui/card";
import { Container, Section } from "@/components/ui/primitives";
import { homeContent } from "@/content/home";

export function HomeCta() {
  const { cta } = homeContent;

  return (
    <Section id="contact-cta" className="vsgh-reveal">
      <Container wide>
        <CtaBlock
          title={cta.title}
          body={cta.body}
          actions={
            <>
              <ButtonLink href="/contact" variant="primary">
                Contact VSGH
              </ButtonLink>
              <ButtonLink href="/research/overview" variant="secondary">
                Research
              </ButtonLink>
            </>
          }
        />
      </Container>
    </Section>
  );
}
