import { Suspense } from 'react'
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Properties from "@/components/Properties";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Property1 from "@/components/Property1";
import Property2 from "@/components/Property2";
import Property3 from "@/components/Property3";

export default function Home() {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main>
        <Hero />
        <Properties />
        <Property1 />
        <Property2 />
        <Property3 />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}