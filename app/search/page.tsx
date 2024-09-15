import { renderSchemaTags } from "@/libs/seo";
import React from "react";

export default function HouseManual() {
  return (
    <>
    {renderSchemaTags()}
      <main>
        <script src="https://hospitable.b-cdn.net/direct-property-search-widget/hospitable-search-widget.prod.js"></script>
        <hospitable-direct-mps identifier="5fb3442b-ded2-4e6b-be42-0292dcd8042a" type="custom"></hospitable-direct-mps>
      </main>
    </>
  );
}