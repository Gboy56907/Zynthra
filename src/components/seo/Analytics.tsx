import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";

interface AnalyticsConfig {
  ga4MeasurementId?: string;
  plausibleDomain?: string;
}

export function Analytics({ ga4MeasurementId, plausibleDomain }: AnalyticsConfig) {
  const location = useLocation();

  useEffect(() => {
    if (ga4MeasurementId) {
      window.gtag?.("config", ga4MeasurementId, {
        page_path: location.pathname,
      });
    }
  }, [location.pathname, ga4MeasurementId]);

  useEffect(() => {
    if (plausibleDomain) {
      window.plausible?.("pageview");
    }
  }, [location.pathname, plausibleDomain]);

  return null;
}

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    plausible: (event: string, options?: { referrer?: string }) => void;
  }
}

export function AnalyticsScript({ ga4MeasurementId }: { ga4MeasurementId: string }) {
  if (!ga4MeasurementId) return null;

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${ga4MeasurementId}', { page_location: window.location.pathname });
          `,
        }}
      />
    </>
  );
}

export function PlausibleScript({ plausibleDomain }: { plausibleDomain: string }) {
  if (!plausibleDomain) return null;

  return (
    <script
      async
      defer
      data-domain={plausibleDomain}
      src={`https://plausible.io/js/script.js`}
    />
  );
}

export const EVENTS = {
  SIGNUP_START: "signup_start",
  SIGNUP_COMPLETE: "signup_complete",
  PRICING_VIEW: "pricing_view",
  PRICING_CLICK: "pricing_click",
  DEMO_REQUEST: "demo_request",
  CONTACT_SUBMIT: "contact_submit",
  CTA_CLICK: "cta_click",
  SEARCH: "search",
  FORM_START: "form_start",
  FORM_ERROR: "form_error",
};

export function trackEvent(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined") {
    window.gtag?.("event", event, params);
    window.plausible?.(event, { referrer: document.referrer });
  }
}

export function trackPageView(pathname: string) {
  if (typeof window !== "undefined") {
    window.gtag?.("config", "MEASUREMENT_ID", { page_path: pathname });
    window.plausible?.("pageview");
  }
}