import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React from 'react';

export default async function LayoutManual({ children }: { children: React.ReactNode }) {
  return (
    <div>
        <Suspense>
            <Header/>
        </Suspense>

        <main className="min-h-screen max-w-6xl mx-auto px-4 lg:p-8 overflow-hidden">
            {children}
        </main>

        <Footer />
    </div>
  );
}
