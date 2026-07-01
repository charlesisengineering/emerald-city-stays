import "server-only";
import { unstable_cache } from "next/cache";
import { Review } from "@/types/userTypes";

// Server-side Hospitable reviews integration (issue #35).
//
// This module must only ever run on the server: it uses HOSPITABLE_API_TOKEN
// (a server-only secret — NOT NEXT_PUBLIC_) and the `server-only` import above
// makes the build fail if it's ever imported into a client component.
//
// Results are cached with unstable_cache so we hit the Hospitable API at most
// once per REVALIDATE_SECONDS regardless of traffic — reviews change slowly, so
// no Lambda/S3/cron infra is needed (see #34 for the chosen approach).

const HOSPITABLE_API = "https://public.api.hospitable.com/v2";
const REVALIDATE_SECONDS = 60 * 60; // 1 hour

// Hospitable property UUIDs (verified via GET /v2/properties). These are the
// API's ids — distinct from the numeric ids in the booking-widget URLs.
export const PROPERTY_IDS = {
  songbird: "cd772683-92f8-4bdc-ad7d-a09bc47b3bc3",
  launchpad: "e3a626e7-de87-4d9e-b5fc-db9761dcb887",
  soundBreeze: "68ed0d13-cf00-4ef8-aba1-b85db359067f",
} as const;

function authHeaders(): HeadersInit {
  const token = process.env.HOSPITABLE_API_TOKEN;
  if (!token) {
    throw new Error("HOSPITABLE_API_TOKEN is not set");
  }
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

// Map a raw Hospitable review to our normalized, PUBLIC-ONLY Review shape.
// Verified against a live response: shape is { id, platform, public: { rating,
// review, response }, private: {...}, reviewed_at, ... }.
// We deliberately read ONLY from `public` — `raw.private` holds confidential
// guest feedback and detailed ratings that must never be exposed.
function normalize(raw: any, propertyId?: string): Review {
  const pub = raw?.public ?? {};
  return {
    id: String(raw?.id ?? ""),
    rating: Number(pub?.rating ?? 0),
    text: String(pub?.review ?? ""),
    response: pub?.response ? String(pub.response) : null,
    channel: String(raw?.platform ?? "direct"),
    reviewedAt: String(raw?.reviewed_at ?? ""),
    propertyId,
  };
}

async function fetchReviewsForProperty(propertyId: string): Promise<Review[]> {
  const url = `${HOSPITABLE_API}/properties/${propertyId}/reviews`;
  const res = await fetch(url, {
    headers: authHeaders(),
    // Let unstable_cache own caching; keep the raw fetch uncached here.
    cache: "no-store",
  });

  if (!res.ok) {
    // Don't blow up a whole page because one property's reviews failed —
    // log and return nothing for this property.
    console.error(
      `[reviews] Hospitable ${res.status} for property ${propertyId}`
    );
    return [];
  }

  const json = await res.json();
  const items: any[] = Array.isArray(json?.data) ? json.data : [];
  return items.map((r) => normalize(r, propertyId));
}

// Public API: all reviews across every property, cached.
// Used by the hero page (#37) to show aggregate/featured reviews.
export const getAllReviews = unstable_cache(
  async (): Promise<Review[]> => {
    const perProperty = await Promise.all(
      Object.values(PROPERTY_IDS).map((id) => fetchReviewsForProperty(id))
    );
    return perProperty
      .flat()
      .filter((r) => r.text && r.rating > 0)
      .sort((a, b) => (a.reviewedAt < b.reviewedAt ? 1 : -1));
  },
  ["hospitable-all-reviews"],
  { revalidate: REVALIDATE_SECONDS, tags: ["reviews"] }
);

// Public API: reviews for a single property, cached. For property pages (#36).
export const getReviewsForProperty = (propertyId: string) =>
  unstable_cache(
    () => fetchReviewsForProperty(propertyId),
    ["hospitable-reviews", propertyId],
    { revalidate: REVALIDATE_SECONDS, tags: ["reviews"] }
  )();
