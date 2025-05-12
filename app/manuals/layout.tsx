import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import config from "@/config";
import React from 'react';

export default async function LayoutManual({ children }: { children: React.ReactNode }) {
  // Check if user is authenticated
  const session = await getServerSession();

  // If not authenticated, redirect to login page
  if (!session) {
    redirect(config.auth.loginUrl);
  }

  return (
    <div>
      <Suspense>
        <Header/>
      </Suspense>

      <main className="min-h-screen max-w-screen-xl mx-auto lg:p-8">{children}</main>

      <div className="h-24" />

      <Footer />
    </div>
  );
}
