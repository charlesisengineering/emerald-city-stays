// Single source of truth for property identity.
//
// A property is referenced in several forms across the app — a kebab slug (file
// paths, manual frontmatter, content/rules dirs), a Hospitable UUID (API), a
// display name (UI), and WiFi env-var names. Defining them once here, keyed by
// the KEBAB SLUG (the form that must match file paths), keeps them from drifting
// apart and makes a typo'd property fail at compile time via PropertySlug.
//
// UUIDs verified via GET https://public.api.hospitable.com/v2/properties.
// widgetId is the trailing segment of the Hospitable booking-widget URL
// (all properties share the base account UUID in HOSPITABLE_WIDGET_BASE).
// coords are the map pin for the property page.
export const PROPERTIES = {
  "sound-breeze": {
    uuid: "68ed0d13-cf00-4ef8-aba1-b85db359067f",
    name: "Sound Breeze",
    wifiEnvPrefix: "SOUND_BREEZE",
    widgetId: "1198778",
    coords: { latitude: 47.542100489716034, longitude: -122.3783156994263 },
  },
  songbird: {
    uuid: "cd772683-92f8-4bdc-ad7d-a09bc47b3bc3",
    name: "Songbird Suite",
    wifiEnvPrefix: "SONGBIRD",
    widgetId: "493270",
    coords: { latitude: 47.70262199168761, longitude: -122.31209870196159 },
  },
  launchpad: {
    uuid: "e3a626e7-de87-4d9e-b5fc-db9761dcb887",
    name: "Seattle Launchpad",
    wifiEnvPrefix: "LAUNCHPAD",
    widgetId: "614010",
    coords: { latitude: 47.50275263739177, longitude: -122.31943184513266 },
  },
} as const;

// Shared base of every Hospitable booking-widget URL (the account UUID).
const HOSPITABLE_WIDGET_BASE =
  "https://booking.hospitable.com/widget/9ca01362-9da8-44f3-9e64-18080aceba27";

// Full booking-widget URL for a property, for the iframe src on listing pages.
export function bookingWidgetUrl(slug: PropertySlug): string {
  return `${HOSPITABLE_WIDGET_BASE}/${PROPERTIES[slug].widgetId}`;
}

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
