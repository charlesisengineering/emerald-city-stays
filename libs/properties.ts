// Single source of truth for property identity.
//
// A property is referenced in several forms across the app — a kebab slug (file
// paths, manual frontmatter, content/rules dirs), a Hospitable UUID (API), a
// display name (UI), and WiFi env-var names. Defining them once here, keyed by
// the KEBAB SLUG (the form that must match file paths), keeps them from drifting
// apart and makes a typo'd property fail at compile time via PropertySlug.
//
// UUIDs verified via GET https://public.api.hospitable.com/v2/properties.
export const PROPERTIES = {
  "sound-breeze": {
    uuid: "68ed0d13-cf00-4ef8-aba1-b85db359067f",
    name: "Sound Breeze",
    wifiEnvPrefix: "SOUND_BREEZE",
  },
  songbird: {
    uuid: "cd772683-92f8-4bdc-ad7d-a09bc47b3bc3",
    name: "Songbird Suite",
    wifiEnvPrefix: "SONGBIRD",
  },
  launchpad: {
    uuid: "e3a626e7-de87-4d9e-b5fc-db9761dcb887",
    name: "Seattle Launchpad",
    wifiEnvPrefix: "LAUNCHPAD",
  },
} as const;

// "sound-breeze" | "songbird" | "launchpad"
export type PropertySlug = keyof typeof PROPERTIES;

export const PROPERTY_SLUGS = Object.keys(PROPERTIES) as PropertySlug[];

// All Hospitable UUIDs, for iterating over every property.
export const PROPERTY_UUIDS = PROPERTY_SLUGS.map((s) => PROPERTIES[s].uuid);

// Reverse lookup: Hospitable UUID -> slug. Reviews arrive tagged by UUID, so
// this maps them back to a slug for display-name / metadata lookups.
const UUID_TO_SLUG: Record<string, PropertySlug> = Object.fromEntries(
  PROPERTY_SLUGS.map((s) => [PROPERTIES[s].uuid, s])
) as Record<string, PropertySlug>;

export function slugFromUuid(uuid?: string): PropertySlug | undefined {
  return uuid ? UUID_TO_SLUG[uuid] : undefined;
}

// Display name from either a slug or a raw UUID. Returns "" if unknown.
export function propertyName(slugOrUuid?: string): string {
  if (!slugOrUuid) return "";
  if (slugOrUuid in PROPERTIES) {
    return PROPERTIES[slugOrUuid as PropertySlug].name;
  }
  const slug = slugFromUuid(slugOrUuid);
  return slug ? PROPERTIES[slug].name : "";
}
