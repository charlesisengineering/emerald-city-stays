"use client";

import { useState } from "react";
import Image from "next/image";
import ecsLogo from "@/app/icon.png";

// Renders the booking platform a review came from. Airbnb/Vrbo are third-party
// trademarks whose official SVGs should live at /public/logos/{airbnb,vrbo}.svg.
// Until those files exist (or if one fails to load) we fall back to a text
// label, so the UI never shows a broken image.
type PlatformMeta = { label: string; src?: string };

const PLATFORMS: Record<string, PlatformMeta> = {
  airbnb: { label: "Airbnb", src: "/logos/airbnb.svg" },
  vrbo: { label: "Vrbo", src: "/logos/vrbo.svg" },
  // Direct bookings are ours — reuse the site icon.
  direct: { label: "Emerald City Stays" },
};

const PlatformBadge = ({ channel }: { channel: string }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const meta = PLATFORMS[channel] ?? { label: channel };

  // Emerald City Stays: always use the bundled site icon.
  if (channel === "direct") {
    return (
      <span className="flex items-center gap-1.5" title="Booked direct">
        <Image
          src={ecsLogo}
          alt="Emerald City Stays"
          width={16}
          height={16}
          className="rounded-sm"
        />
        <span className="text-xs text-base-content/60">Booked direct</span>
      </span>
    );
  }

  // Airbnb / Vrbo: show the logo if we have one and it loads; else text.
  if (meta.src && !imgFailed) {
    return (
      <img
        src={meta.src}
        alt={`Booked via ${meta.label}`}
        title={`Booked via ${meta.label}`}
        className="h-4 w-auto"
        onError={() => setImgFailed(true)}
      />
    );
  }

  return (
    <span className="text-xs text-base-content/60">via {meta.label}</span>
  );
};

export default PlatformBadge;
