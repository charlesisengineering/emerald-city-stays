import { PROPERTIES, PropertySlug } from '@/libs/properties';

type WiFiCredentials = {
  network: string;
  password: string;
};

// WiFi credentials come from env vars (never committed), one pair per property.
// The env var names derive from each property's wifiEnvPrefix in the single
// source of truth (libs/properties.ts) — e.g. SOUND_BREEZE_WIFI_NETWORK — so
// adding a property in one place wires up its WiFi lookup automatically.
const wifiCredentials = Object.fromEntries(
  (Object.keys(PROPERTIES) as PropertySlug[]).map((slug) => {
    const prefix = PROPERTIES[slug].wifiEnvPrefix;
    return [
      slug,
      {
        network: process.env[`${prefix}_WIFI_NETWORK`] || '',
        password: process.env[`${prefix}_WIFI_PASSWORD`] || '',
      },
    ];
  })
) as Record<PropertySlug, WiFiCredentials>;

export default wifiCredentials;
