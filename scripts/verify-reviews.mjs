// Throwaway spike to verify the Hospitable reviews endpoint (#35):
//   node --env-file=.env.local scripts/verify-reviews.mjs
// Confirms the endpoint path, response shape, and which booking channels
// actually return reviews before we design the hero display around it.

const TOKEN = process.env.HOSPITABLE_API_TOKEN;
const IDS = { songbird: "493270", launchpad: "614010", soundBreeze: "1198778" };
const BASE = "https://api.hospitable.com/v2";

if (!TOKEN) {
  console.error("HOSPITABLE_API_TOKEN not found. Run with: node --env-file=.env.local scripts/verify-reviews.mjs");
  process.exit(1);
}

const headers = { Authorization: `Bearer ${TOKEN}`, Accept: "application/json" };

for (const [name, id] of Object.entries(IDS)) {
  const url = `${BASE}/properties/${id}/reviews`;
  try {
    const res = await fetch(url, { headers });
    console.log(`\n=== ${name} (${id}) → ${res.status} ${res.statusText} ===`);
    if (!res.ok) {
      console.log("  body:", (await res.text()).slice(0, 300));
      continue;
    }
    const json = await res.json();
    const items = Array.isArray(json?.data) ? json.data : [];
    console.log(`  count: ${items.length}`);
    if (items.length) {
      console.log("  channels:", [...new Set(items.map((r) => r.channel ?? r.platform ?? "?"))]);
      console.log("  first review keys:", Object.keys(items[0]));
      console.log("  first review sample:", JSON.stringify(items[0], null, 2).slice(0, 800));
    }
  } catch (e) {
    console.log(`  ERROR: ${e.message}`);
  }
}
