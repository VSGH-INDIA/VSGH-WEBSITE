import { useEffect, useState } from "react";
import { useClient } from "sanity";

type DashboardData = {
  lifecycle: {
    draft: number;
    review: number;
    approved: number;
    published: number;
  };
  missingSeo: number;
  missingAlt: number;
  recent: {
    _id: string;
    _type: string;
    title?: string;
    headline?: string;
    _updatedAt: string;
    lifecycle?: string;
  }[];
};

const QUERY = `{
  "lifecycle": {
    "draft": count(*[_type in ["homepage", "businessPage", "businessLine", "aboutPage", "capabilityPage", "contactPage", "insightArticle", "careerVacancy", "siteSettings"] && lifecycle == "draft"]),
    "review": count(*[_type in ["homepage", "businessPage", "businessLine", "aboutPage", "capabilityPage", "contactPage", "insightArticle", "careerVacancy", "siteSettings"] && lifecycle == "review"]),
    "approved": count(*[_type in ["homepage", "businessPage", "businessLine", "aboutPage", "capabilityPage", "contactPage", "insightArticle", "careerVacancy", "siteSettings"] && lifecycle == "approved"]),
    "published": count(*[_type in ["homepage", "businessPage", "businessLine", "aboutPage", "capabilityPage", "contactPage", "insightArticle", "careerVacancy", "siteSettings"] && lifecycle == "published"])
  },
  "missingSeo": count(*[_type in ["homepage", "businessPage", "businessLine", "aboutPage", "capabilityPage", "contactPage", "insightArticle"] && (!defined(seoTitle) || !defined(description))]),
  "missingAlt": count(*[_type in ["businessPage", "businessLine", "contactPage", "insightArticle", "capabilityPage"] && defined(media) && !defined(media.alt)]),
  "recent": *[_type in ["homepage", "businessPage", "businessLine", "aboutPage", "capabilityPage", "contactPage", "insightArticle", "careerVacancy", "siteSettings"]] | order(_updatedAt desc)[0...8]{ _id, _type, title, headline, _updatedAt, lifecycle }
}`;

const empty: DashboardData = {
  lifecycle: { draft: 0, review: 0, approved: 0, published: 0 },
  missingSeo: 0,
  missingAlt: 0,
  recent: [],
};

function card(title: string, value: number, detail: string) {
  return (
    <article
      key={title}
      style={{
        border: "1px solid #d7dde5",
        minWidth: "150px",
        padding: "16px",
      }}
    >
      <p
        style={{
          color: "#536171",
          fontSize: "12px",
          letterSpacing: "0.08em",
          margin: 0,
          textTransform: "uppercase",
        }}
      >
        {title}
      </p>
      <p style={{ fontSize: "32px", fontWeight: 600, margin: "10px 0 4px" }}>
        {value}
      </p>
      <p style={{ color: "#536171", fontSize: "13px", margin: 0 }}>{detail}</p>
    </article>
  );
}

export function VSGHDashboard() {
  const client = useClient({ apiVersion: "2026-08-19" });
  const [data, setData] = useState<DashboardData>(empty);
  const [error, setError] = useState(false);
  useEffect(() => {
    let active = true;
    client
      .fetch<DashboardData>(QUERY)
      .then((result) => {
        if (active && result) setData(result);
      })
      .catch(() => {
        if (active) setError(true);
      });
    return () => {
      active = false;
    };
  }, [client]);
  return (
    <main
      style={{
        color: "#17202d",
        margin: "0 auto",
        maxWidth: "1120px",
        padding: "32px 24px",
      }}
    >
      <p
        style={{
          color: "#2c6fb7",
          fontSize: "12px",
          letterSpacing: "0.1em",
          margin: 0,
          textTransform: "uppercase",
        }}
      >
        VSGH editorial control panel
      </p>
      <h1 style={{ fontSize: "36px", margin: "10px 0 8px" }}>Dashboard</h1>
      <p style={{ color: "#536171", maxWidth: "680px" }}>
        Edit approved public content, send it through review, and verify content
        health before publication. Technical configuration and secrets are
        intentionally kept outside this workspace.
      </p>
      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          marginTop: "28px",
        }}
      >
        <a
          href="#/structure/homepage"
          style={{
            border: "1px solid #2c6fb7",
            color: "#174d84",
            padding: "10px 14px",
            textDecoration: "none",
          }}
        >
          Edit Homepage
        </a>
        <a
          href="#/structure/businessPage"
          style={{
            border: "1px solid #2c6fb7",
            color: "#174d84",
            padding: "10px 14px",
            textDecoration: "none",
          }}
        >
          Edit Business
        </a>
        <a
          href="#/structure/businessLine"
          style={{
            border: "1px solid #2c6fb7",
            color: "#174d84",
            padding: "10px 14px",
            textDecoration: "none",
          }}
        >
          Edit Business Lines
        </a>
        <a
          href="#/structure/contactPage"
          style={{
            border: "1px solid #2c6fb7",
            color: "#174d84",
            padding: "10px 14px",
            textDecoration: "none",
          }}
        >
          Edit Contact
        </a>
        <a
          href="#/structure/insightArticle"
          style={{
            border: "1px solid #2c6fb7",
            color: "#174d84",
            padding: "10px 14px",
            textDecoration: "none",
          }}
        >
          Create Insight
        </a>
        <a
          href="#/structure/careerVacancy"
          style={{
            border: "1px solid #2c6fb7",
            color: "#174d84",
            padding: "10px 14px",
            textDecoration: "none",
          }}
        >
          Manage Careers
        </a>
      </section>
      <h2 style={{ fontSize: "20px", marginTop: "40px" }}>Content status</h2>
      <section style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
        {card("Draft", data.lifecycle.draft, "Still being prepared")}
        {card(
          "In review",
          data.lifecycle.review,
          "Needs technical or publication review",
        )}
        {card(
          "Approved",
          data.lifecycle.approved,
          "Ready for authorized publication",
        )}
        {card(
          "Published",
          data.lifecycle.published,
          "Eligible for public delivery",
        )}
      </section>
      <h2 style={{ fontSize: "20px", marginTop: "40px" }}>Content health</h2>
      <section style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
        {card(
          "SEO fields missing",
          data.missingSeo,
          "Pages requiring title or description",
        )}
        {card(
          "Media alt missing",
          data.missingAlt,
          "Media requiring accessibility review",
        )}
      </section>
      <h2 style={{ fontSize: "20px", marginTop: "40px" }}>Recent updates</h2>
      {error ? (
        <p>
          Recent activity could not be loaded. Check Studio access, then
          refresh.
        </p>
      ) : null}
      <ul
        style={{
          borderTop: "1px solid #d7dde5",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
      >
        {data.recent.map((item) => (
          <li
            key={item._id}
            style={{
              borderBottom: "1px solid #d7dde5",
              display: "grid",
              gap: "4px",
              padding: "14px 0",
            }}
          >
            <strong>{item.title || item.headline || "Untitled content"}</strong>
            <span style={{ color: "#536171", fontSize: "13px" }}>
              {item._type} · {item.lifecycle || "unclassified"} · updated{" "}
              {new Date(item._updatedAt).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
      <h2 style={{ fontSize: "20px", marginTop: "40px" }}>Production links</h2>
      <p>
        <a href="https://vsghindia.com" target="_blank" rel="noreferrer">
          Open live website
        </a>{" "}
        ·{" "}
        <a
          href="https://vsghindia.com/sitemap.xml"
          target="_blank"
          rel="noreferrer"
        >
          Sitemap
        </a>{" "}
        ·{" "}
        <a
          href="https://vsghindia.com/robots.txt"
          target="_blank"
          rel="noreferrer"
        >
          Robots
        </a>
      </p>
    </main>
  );
}
