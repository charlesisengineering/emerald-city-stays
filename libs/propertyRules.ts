import "server-only";
import { unstable_cache } from "next/cache";
import { PROPERTY_IDS } from "@/libs/reviews";

// Structured house-rule facts sourced from Hospitable (the authoritative source
// for things that can change and would otherwise drift). Currently check-in /
// check-out times and the three policy flags the API exposes. Narrative rules
// (quiet hours, etc.) have no API equivalent and live in content/rules/*.mdx.
//
// Server-only + cached, mirroring libs/reviews.ts.
const HOSPITABLE_API = "https://public.api.hospitable.com/v2";
const REVALIDATE_SECONDS = 60 * 60; // 1 hour

export interface PropertyRules {
  checkin: string | null; // e.g. "15:00"
  checkout: string | null; // e.g. "10:00"
  petsAllowed: boolean | null;
  smokingAllowed: boolean | null;
  eventsAllowed: boolean | null;
}

// Format Hospitable's 24h "HH:MM" into a friendly "3 PM" / "10 AM".
// Drops ":00" for on-the-hour times; keeps minutes otherwise ("10:30 AM").
export function formatTime(hhmm: string | null): string | null {
  if (!hhmm) return null;
  const [h, m] = hhmm.split(":").map(Number);
  if (Number.isNaN(h)) return hhmm;
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return m ? `${hour12}:${String(m).padStart(2, "0")} ${period}` : `${hour12} ${period}`;
}

// Map a friendly key (or a raw UUID) to the Hospitable property UUID.
function resolvePropertyId(propertyKeyOrId: string): string {
  return (
    (PROPERTY_IDS as Record<string, string>)[propertyKeyOrId] ?? propertyKeyOrId
  );
}

function authHeaders(): HeadersInit {
  const token = process.env.HOSPITABLE_API_TOKEN;
  if (!token) throw new Error("HOSPITABLE_API_TOKEN is not set");
  return { Authorization: `Bearer ${token}`, Accept: "application/json" };
}

async function fetchRules(propertyId: string): Promise<PropertyRules | null> {
  const res = await fetch(`${HOSPITABLE_API}/properties/${propertyId}`, {
    headers: authHeaders(),
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) {
    console.error(`[propertyRules] Hospitable ${res.status} for ${propertyId}`);
    return null;
  }
  const d = (await res.json())?.data ?? {};
  const hr = d.house_rules ?? {};
  return {
    checkin: d.checkin ?? null,
    checkout: d.checkout ?? null,
    petsAllowed: hr.pets_allowed ?? null,
    smokingAllowed: hr.smoking_allowed ?? null,
    eventsAllowed: hr.events_allowed ?? null,
  };
}

export function getPropertyRules(
  propertyKeyOrId: string
): Promise<PropertyRules | null> {
  const id = resolvePropertyId(propertyKeyOrId);
  return unstable_cache(() => fetchRules(id), ["property-rules", id], {
    revalidate: REVALIDATE_SECONDS,
    tags: ["property-rules"],
  })();
}
