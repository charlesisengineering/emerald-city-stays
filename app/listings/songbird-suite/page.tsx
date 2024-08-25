import { Suspense } from 'react'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Property1 from "@/components/Property1";
// import { renderSchemaTags } from "@/libs/seo";
import React from 'react';

export default function Home() {
  return (
    <>
    {/* {renderSchemaTags()} */}
      <Suspense>
        <Header />
      </Suspense>
      <main>
        <Property1 />
      </main>
      <Footer />
    </>
  );
}