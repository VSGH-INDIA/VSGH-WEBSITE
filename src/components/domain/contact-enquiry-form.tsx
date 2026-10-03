"use client";

import Script from "next/script";
import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { track } from "@vercel/analytics";
import {
  ENQUIRY_TYPES,
  ENQUIRY_TYPE_LABELS,
  isEnquiryType,
  type EnquiryType,
} from "@/content/contact-enquiry";
import { Button } from "@/components/ui/button";
import { Badge, Heading, Text } from "@/components/ui/primitives";

type FormStatus = "idle" | "submitting" | "success" | "error";

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    },
  ) => string;
  reset: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

function initialEnquiryType(): EnquiryType {
  if (typeof window === "undefined") return ENQUIRY_TYPES[0];
  const enquiry = new URLSearchParams(window.location.search).get("enquiry");
  return isEnquiryType(enquiry) ? enquiry : ENQUIRY_TYPES[0];
}

const fieldClass =
  "min-h-12 border border-border bg-surface px-3 text-foreground outline-none focus:border-[#8ec0ff]";

function subscribeToLocation() {
  return () => undefined;
}

function serverEnquiryType(): EnquiryType {
  return ENQUIRY_TYPES[0];
}

export function ContactEnquiryForm() {
  const startedAt = useRef<number | null>(null);
  const turnstileContainer = useRef<HTMLDivElement | null>(null);
  const turnstileWidget = useRef<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const queryEnquiryType = useSyncExternalStore(
    subscribeToLocation,
    initialEnquiryType,
    serverEnquiryType,
  );
  const [selectedEnquiryType, setSelectedEnquiryType] =
    useState<EnquiryType | null>(null);
  const enquiryType = selectedEnquiryType ?? queryEnquiryType;
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  function mountTurnstile() {
    if (
      !siteKey ||
      !turnstileContainer.current ||
      !window.turnstile ||
      turnstileWidget.current
    ) {
      return;
    }
    turnstileWidget.current = window.turnstile.render(
      turnstileContainer.current,
      {
        sitekey: siteKey,
        callback: setTurnstileToken,
        "expired-callback": () => setTurnstileToken(""),
        "error-callback": () => setTurnstileToken(""),
      },
    );
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    if (startedAt.current === null) {
      setStatus("error");
      setMessage(
        "Please take a moment to review the enquiry before submitting.",
      );
      return;
    }
    setStatus("submitting");
    setMessage("");
    const values = new FormData(form);
    const payload = {
      name: values.get("name"),
      organization: values.get("organization"),
      email: values.get("email"),
      country: values.get("country"),
      enquiryType,
      message: values.get("message"),
      consent: values.get("consent") === "on",
      website: values.get("website"),
      formStartedAt: startedAt.current,
      turnstileToken: turnstileToken || values.get("turnstileToken"),
    };
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;
      if (!response.ok || !result?.ok) {
        setStatus("error");
        setMessage(
          result?.error ??
            "We could not send your enquiry. Please try again later.",
        );
        return;
      }
      form.reset();
      startedAt.current = null;
      setTurnstileToken("");
      if (turnstileWidget.current)
        window.turnstile?.reset(turnstileWidget.current);
      setStatus("success");
      setMessage("Your enquiry has been submitted to VSGH.");
      track("contact_enquiry_submitted", { enquiryType });
    } catch {
      setStatus("error");
      setMessage("We could not send your enquiry. Please try again later.");
    }
  }

  return (
    <section
      aria-labelledby="enquiry-heading"
      className="border border-border bg-background p-6 sm:p-8"
    >
      <div className="max-w-2xl space-y-3">
        <Badge>Business enquiry</Badge>
        <Heading
          as="h2"
          variant="h2"
          className="text-balance"
          id="enquiry-heading"
        >
          Discuss a programme with VSGH.
        </Heading>
        <Text className="text-muted">
          Share only public business context. Do not send confidential technical
          data, drawings, export-controlled information, or personal data beyond
          what is needed for this enquiry.
        </Text>
      </div>
      <form
        className="mt-8 grid gap-5"
        onFocusCapture={() => {
          if (startedAt.current === null) startedAt.current = Date.now();
        }}
        onSubmit={submit}
        noValidate
      >
        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium">
            Name
            <input
              name="name"
              required
              minLength={2}
              maxLength={100}
              autoComplete="name"
              className={fieldClass}
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Organisation
            <input
              name="organization"
              required
              minLength={2}
              maxLength={120}
              autoComplete="organization"
              className={fieldClass}
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Work email
            <input
              name="email"
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              className={fieldClass}
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Country / region{" "}
            <span className="font-normal text-muted">Optional</span>
            <input
              name="country"
              maxLength={80}
              autoComplete="country-name"
              className={fieldClass}
            />
          </label>
        </div>
        <label className="grid gap-2 text-sm font-medium">
          Enquiry type
          <select
            name="enquiryType"
            value={enquiryType}
            onChange={(event) =>
              setSelectedEnquiryType(event.target.value as EnquiryType)
            }
            className={fieldClass}
          >
            {ENQUIRY_TYPES.map((type) => (
              <option key={type} value={type}>
                {ENQUIRY_TYPE_LABELS[type]}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Message
          <textarea
            name="message"
            required
            minLength={20}
            maxLength={4000}
            rows={7}
            className="border border-border bg-surface p-3 text-foreground outline-none focus:border-[#8ec0ff]"
          />
        </label>
        <label className="flex items-start gap-3 text-sm leading-6 text-muted">
          <input
            name="consent"
            type="checkbox"
            required
            className="mt-1 size-4 accent-[#8ec0ff]"
          />
          <span>
            I understand that VSGH will use these details only to respond to
            this business enquiry.
          </span>
        </label>
        {siteKey ? (
          <>
            <Script
              src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
              strategy="afterInteractive"
              onLoad={mountTurnstile}
            />
            <div ref={turnstileContainer} aria-label="Spam protection" />
          </>
        ) : null}
        <div aria-hidden="true" className="hidden">
          <label>
            Website <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
          <input
            name="turnstileToken"
            type="hidden"
            value={turnstileToken}
            readOnly
          />
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button
            type="submit"
            loading={status === "submitting"}
            disabled={status === "success"}
          >
            Submit enquiry
          </Button>
          <p
            aria-live="polite"
            role={status === "error" ? "alert" : undefined}
            className={
              status === "error" ? "text-sm text-red-300" : "text-sm text-muted"
            }
          >
            {message ||
              "No files or confidential attachments can be sent through this form."}
          </p>
        </div>
      </form>
    </section>
  );
}
