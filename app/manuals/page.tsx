import Properties from "@/components/Properties";
import { renderSchemaTags } from "@/libs/seo";
import React from "react";

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