import Properties from "@/components/Properties";
import { getSEOTags, renderSchemaTags } from "@/libs/seo";
import React from "react";

// House manuals are for booked guests and contain access info (WiFi, entry
// codes) — they should not be indexed by search engines.
export const metadata = getSEOTags({
  title: "House Manuals | Emerald City Stays",
  canonicalUrlRelative: "/manuals",
  robots: { index: false, follow: true },
});

export default function HouseManual() {
  return (
    <>
    {renderSchemaTags()}
      <main>
        <Properties 
            songbirdLink='/manuals/songbird'
            soundBreezeLink='/manuals/sound-breeze'
            launchpadLink='/manuals/launchpad'
            headlineText='House Manuals'
            taglineText='Click a property below for your guide to a great stay'/>
      </main>
    </>
  );
}