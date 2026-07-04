import { Suspense } from 'react'
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Properties from "@/components/Properties";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import { getSEOTags, renderSchemaTags } from "@/libs/seo";
import React from "react";

export const metadata = getSEOTags({
  title: "Emerald City Stays | Furnished Short-Term Rentals in Seattle",
  description:
    "Book furnished short-term rentals in Seattle neighborhoods — Maple Leaf, Gatewood/West Seattle, and more. Fully equipped suites for business and leisure stays.",
  keywords: [
    "Seattle furnished rentals",
    "Seattle short-term rentals",
    "vacation rentals Seattle",
    "furnished suites Seattle",
  ],
  canonicalUrlRelative: "/",
});

export default function Home() {
  return (
    <>
    {renderSchemaTags()}
      <Suspense>
        <Header />
      </Suspense>
      <main>
        <Hero />
        <Properties 
            songbirdLink='/listings/songbird-suite'
            soundBreezeLink='/listings/sound-breeze'
            launchpadLink='/listings/seattle-launchpad'
            headlineText='Our Properties'
            taglineText='We&apos;ve got you covered from Shoreline to Tukwila'
            showHospitableSearchWidget/>
        <Suspense>
          <Reviews />
        </Suspense>
        {/* <FAQ />
        <CTA /> */}
      </main>
      <Footer />
    </>
  );
}