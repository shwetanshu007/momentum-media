"use client";

/**
 * Unified analytics helpers for Meta Pixel (fbq) and Google Analytics 4 (gtag).
 *
 * - `trackLead(params)` — standard Meta Lead + GA generate_lead. Use for
 *   WhatsApp discovery-call clicks, form submissions, etc.
 * - `trackContact(params)` — Meta Contact + GA contact. Email clicks.
 * - `trackClick(params)` — generic click (GA "click" + Meta custom event).
 * - `trackViewContent(params)` — blog / case-study views beyond base pageview.
 * - `trackPageView(url)` — manual pageview (used by the route listener).
 */

export const META_PIXEL_ID = "2965537043641776";
export const GA_MEASUREMENT_ID = "G-5KH6KNXG1N";

type FbqParams = Record<string, unknown>;
type GtagParams = Record<string, unknown>;

type FbqFunction = (
  command: "init" | "track" | "trackCustom" | "consent",
  eventOrId: string,
  params?: FbqParams
) => void;

type GtagFunction = (
  command: "config" | "event" | "js" | "set",
  targetOrName: string | Date,
  params?: GtagParams
) => void;

declare global {
  interface Window {
    fbq?: FbqFunction;
    gtag?: GtagFunction;
    dataLayer?: unknown[];
  }
}

function fbq(...args: Parameters<FbqFunction>): void {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq(...args);
}

function gtag(...args: Parameters<GtagFunction>): void {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag(...args);
}

export interface TrackParams {
  /** Human-readable label shown in GA reports. */
  label?: string;
  /** Where the event fired — e.g. "hero", "navbar", "footer". */
  location?: string;
  /** Destination URL for outbound links. */
  destination?: string;
  /** Optional monetary value. */
  value?: number;
  /** Currency code (default INR). */
  currency?: string;
  /** Any extra attributes — forwarded to both pixels. */
  [key: string]: unknown;
}

export function trackLead(params: TrackParams = {}): void {
  const {
    label = "Lead",
    location,
    destination,
    value,
    currency = "INR",
    ...rest
  } = params;

  fbq("track", "Lead", {
    content_name: label,
    source: location,
    ...(value !== undefined ? { value, currency } : {}),
    ...rest,
  });

  gtag("event", "generate_lead", {
    event_category: "engagement",
    event_label: label,
    location,
    destination,
    ...(value !== undefined ? { value, currency } : {}),
    ...rest,
  });
}

export function trackContact(params: TrackParams = {}): void {
  const { label = "Contact", location, destination, ...rest } = params;

  fbq("track", "Contact", {
    content_name: label,
    source: location,
    ...rest,
  });

  gtag("event", "contact", {
    event_category: "engagement",
    event_label: label,
    location,
    destination,
    ...rest,
  });
}

export function trackClick(params: TrackParams = {}): void {
  const { label = "Click", location, destination, ...rest } = params;

  fbq("trackCustom", "ClickOutbound", {
    content_name: label,
    source: location,
    destination,
    ...rest,
  });

  gtag("event", "click", {
    event_category: "engagement",
    event_label: label,
    location,
    destination,
    outbound: destination?.startsWith("http"),
    ...rest,
  });
}

export function trackViewContent(params: TrackParams = {}): void {
  const { label = "Content", location, ...rest } = params;

  fbq("track", "ViewContent", {
    content_name: label,
    content_category: location,
    ...rest,
  });

  gtag("event", "view_content", {
    event_category: "content",
    event_label: label,
    location,
    ...rest,
  });
}

export function trackPageView(url: string): void {
  fbq("track", "PageView");
  gtag("config", GA_MEASUREMENT_ID, { page_path: url });
}
