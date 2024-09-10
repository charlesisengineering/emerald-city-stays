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
            songbirdLink='/listings/songbird'
            soundBreezeLink='/listings/sound-breeze'
            launchpadLink='/listings/launchpad'
            headlineText='Our Properties'
            taglineText='We&apos;ve got you covered from Shoreline to Tukwila'/>
        {/* <FAQ />
        <CTA /> */}
      </main>
      <Footer />
    </>
  );
}