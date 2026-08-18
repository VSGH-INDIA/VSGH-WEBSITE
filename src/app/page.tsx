export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-16">
      <p className="text-sm tracking-[0.18em] uppercase text-muted">VSGH</p>
      <h1 className="font-display text-4xl leading-tight tracking-tight">
        Advanced materials. Controlled public presence.
      </h1>
      <p className="max-w-xl text-lg leading-8 text-muted">
        This repository is the WP03 Rev B implementation bootstrap for the VSGH
        external website. Public navigation, brand tokens, and CMS content are
        withheld until documented specification conflicts are resolved.
      </p>
      <p className="max-w-xl text-sm leading-6 text-muted">
        Canonical production host remains www.vsgh.com after VSGH acceptance
        gates. This build is not authorized for production release.
      </p>
    </main>
  );
}
