const origin = (
  process.env.PUBLIC_TEST_ORIGIN || "https://vsghindia.com"
).replace(/\/$/, "");
const routes = [
  "/",
  "/business",
  "/business/aerospace-systems-components",
  "/business/imports-exports",
  "/business/global-programmes",
  "/contact",
];

async function request(path) {
  const response = await fetch(`${origin}${path}`, { redirect: "follow" });
  const body = await response.text();
  if (!response.ok)
    throw new Error(`${path}: expected 2xx, received ${response.status}`);
  return { response, body };
}

function requireHeader(response, name) {
  const value = response.headers.get(name);
  if (!value) throw new Error(`Missing ${name} header`);
  return value;
}

for (const route of routes) {
  const { response, body } = await request(route);
  if (!/<title>[^<]+<\/title>/i.test(body))
    throw new Error(`${route}: missing title`);
  if (
    !new RegExp(
      `<link[^>]+rel="canonical"[^>]+href="${origin.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
    ).test(body)
  ) {
    throw new Error(`${route}: canonical does not use ${origin}`);
  }
  requireHeader(response, "content-security-policy");
  requireHeader(response, "x-content-type-options");
  requireHeader(response, "referrer-policy");
  console.log(`PASS ${route} ${response.status}`);
}

const { response: robots, body: robotsBody } = await request("/robots.txt");
const { response: sitemap, body: sitemapBody } = await request("/sitemap.xml");
if (!/Sitemap:/i.test(robotsBody))
  throw new Error("robots.txt: missing sitemap declaration");
if (!sitemapBody.includes("/business/aerospace-systems-components"))
  throw new Error("sitemap.xml: missing business-line route");
requireHeader(robots, "content-security-policy");
requireHeader(sitemap, "content-security-policy");
console.log(`PASS production smoke against ${origin}`);
