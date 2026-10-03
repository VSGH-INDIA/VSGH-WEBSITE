# Search engine and metadata setup

The application generates canonical metadata, robots, and sitemap output from the controlled production origin. Site Settings can supply only public Google/Bing verification values; it cannot change canonical origin or robots policy.

## Owner procedure

1. Verify ownership of the production domain in Google Search Console and Bing Webmaster Tools using the organization-approved method.
2. Add the returned verification values as `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and `NEXT_PUBLIC_BING_SITE_VERIFICATION` in Vercel, or enter approved public verification values in Site Settings.
3. Deploy, inspect the rendered home-page metadata, then submit the deployed `/sitemap.xml` in each console.
4. Confirm `/robots.txt`, canonical URLs, and sitemap URLs are reachable over HTTPS and contain no preview/staging host.
5. Review indexing coverage after launch. Resolve content/URL problems before requesting removal or recrawls.

No property was verified or sitemap submitted by this implementation. Do not enter private verification credentials into CMS content.
