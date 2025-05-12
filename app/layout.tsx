import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";
import config from "@/config";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

// SEO
export const metadata: Metadata = {
  metadataBase: new URL(`https://${config.domainName}`),
  title: config.appName,
  description: config.appDescription,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme={config.colors.theme} className={inter.className}>
      <head>
        <link rel="icon" href="/icon.png" />
      </head>
      <body>
        <Providers>
          <NextTopLoader color={config.colors.main} showSpinner={false} />
          {children}
          <Toaster position="bottom-center" />
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}