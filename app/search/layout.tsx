import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React from 'react';

export default async function LayoutManual({ children }: { children: any }) {
  return (
    <div>
      <Suspense>
        <Header/>
      </Suspense>

      <main className="min-h-screen max-w-6xl mx-auto lg:p-8">{children}</main>

      <div className="h-24" />

      <Footer />
    </div>
  );
}
