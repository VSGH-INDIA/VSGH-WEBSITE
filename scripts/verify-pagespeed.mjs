const origin = (
  process.env.PAGESPEED_URL ||
  process.env.PUBLIC_TEST_ORIGIN ||
  ""
).replace(/\/$/, "");
if (!origin) {
  throw new Error(
    "Set PAGESPEED_URL to a public HTTPS deployment before running this Lighthouse-based check.",
  );
}

const budgets = {
  performance: 0.7,
  accessibility: 0.9,
  "best-practices": 0.85,
  seo: 0.9,
};
const endpoint = new URL(
  "https://www.googleapis.com/pagespeedonline/v5/runPagespeed",
);
endpoint.searchParams.set("url", origin);
endpoint.searchParams.set(
  "strategy",
  process.env.PAGESPEED_STRATEGY || "mobile",
);
for (const category of Object.keys(budgets))
  endpoint.searchParams.append("category", category);
if (process.env.PAGESPEED_API_KEY)
  endpoint.searchParams.set("key", process.env.PAGESPEED_API_KEY);

const response = await fetch(endpoint);
if (!response.ok)
  throw new Error(
    `PageSpeed request failed: ${response.status} ${await response.text()}`,
  );
const report = await response.json();
const categoriesReport = report.lighthouseResult?.categories;
if (!categoriesReport)
  throw new Error(
    "PageSpeed response did not include a Lighthouse category report.",
  );

const failures = [];
for (const [category, minimum] of Object.entries(budgets)) {
  const score = categoriesReport[category]?.score;
  if (typeof score !== "number") failures.push(`${category}: no score`);
  else if (score < minimum)
    failures.push(
      `${category}: ${score.toFixed(2)} below ${minimum.toFixed(2)}`,
    );
  else
    console.log(
      `PASS ${category}: ${score.toFixed(2)} >= ${minimum.toFixed(2)}`,
    );
}
if (failures.length)
  throw new Error(`Lighthouse budget failure: ${failures.join("; ")}`);
