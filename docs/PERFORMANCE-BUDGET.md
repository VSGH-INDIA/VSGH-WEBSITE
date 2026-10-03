# Performance budget

The visual system uses progressive enhancement: text, navigation, and core calls to action remain usable if WebGL, animation, third-party analytics, or optional spam protection is unavailable.

## Release budgets and operating approach

- Keep route-specific interactive JavaScript and imagery intentional; do not add a library for a one-off effect.
- Keep the existing Three.js experience isolated to the client-only visual component and preserve reduced-motion behavior.
- Use responsive image sizing, meaningful `alt`, and approved media only. Audit large source images before publishing.
- Treat Core Web Vitals as production measurements, not build-time promises. Review Vercel Speed Insights after traffic exists.
- Before a major visual feature ships, capture mobile and desktop measurements on a Vercel preview and compare against the last approved release.
- The manual **Lighthouse budget check** workflow uses Google PageSpeed Insights (Lighthouse) against a public HTTPS deployment. It blocks scores below: Performance `0.70`, Accessibility `0.90`, Best Practices `0.85`, SEO `0.90`. The lower initial performance threshold is deliberate while approved hero media and production field data are being baselined; raise it after the first accepted measurement.

The release owner must additionally define and record LCP, INP, CLS, and page-weight thresholds from the first production baseline before a high-traffic launch.
