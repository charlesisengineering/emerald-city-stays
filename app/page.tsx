import { Suspense } from 'react'
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Properties from "@/components/Properties";
import Footer from "@/components/Footer";
import { renderSchemaTags } from "@/libs/seo";
import React from "react";

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
        {/* <FAQ />
        <CTA /> */}
      </main>
      <Footer />
    </>
  );
}