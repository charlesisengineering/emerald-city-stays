import { Suspense } from 'react'
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Properties from "@/components/Properties";
// import FAQ from "@/components/FAQ";
// import CTA from "@/components/CTA";
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
        <Properties />
        {/* <FAQ />
        <CTA /> */}
      </main>
      <Footer />
    </>
  );
}