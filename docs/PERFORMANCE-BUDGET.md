# Performance budget

The visual system uses progressive enhancement: text, navigation, and core calls to action remain usable if WebGL, animation, third-party analytics, or optional spam protection is unavailable.

## Budget and operating approach

- Keep route-specific interactive JavaScript and imagery intentional; do not add a library for a one-off effect.
- Keep the existing Three.js experience isolated to the client-only visual component and preserve reduced-motion behavior.
- Use responsive image sizing, meaningful `alt`, and approved media only. Audit large source images before publishing.
- Treat Core Web Vitals as production measurements, not build-time promises. Review Vercel Speed Insights after traffic exists.
- Before a major visual feature ships, capture mobile and desktop measurements on a Vercel preview and compare against the last approved release.

No universal numeric budget is asserted here because production traffic, device mix, CDN configuration, and approved media have not been measured. The release owner must define and record LCP, INP, CLS, and page-weight thresholds before a high-traffic launch.
