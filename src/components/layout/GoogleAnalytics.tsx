/**
 * Google Analytics component
 *
 * Add to layout.tsx:
 * import { GoogleAnalytics } from "@/components/layout/GoogleAnalytics";
 * <GoogleAnalytics />
 *
 * Requires: NEXT_PUBLIC_GA_MEASUREMENT_ID in .env
 */

import Script from "next/script";

export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!measurementId) {
    return null; // GA not configured
  }

  return (
    <>
      {/* Google Analytics (gtag.js) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
            send_page_view: true,
            cookie_flags: 'SameSite=None;Secure',
          });
        `}
      </Script>
    </>
  );
}

/**
 * Track a custom event
 * Call from client components: trackEvent('generate_listing', { platform: 'amazon' })
 */
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, eventParams);
  }
}

/**
 * Track conversion (e.g. user signs up, starts trial)
 */
export function trackConversion(
  conversionName: string,
  value?: number,
  currency = "USD"
) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "conversion", {
      send_to: `${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}/${conversionName}`,
      value,
      currency,
    });
  }
}
