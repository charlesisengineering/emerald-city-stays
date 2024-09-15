'use client'

import { renderSchemaTags } from "@/libs/seo";
import buildSearchWidget from "@/libs/hospitable";
import React from "react";
import { searchWidgetProps } from "@/types/userTypes";

export default function SearchPage() {

    const searchWidgetResultProps:searchWidgetProps = {
        widgetElement: "hospitable-widget-container",
    }

    buildSearchWidget(searchWidgetResultProps);


  return (
    <>
    {renderSchemaTags()}
    <main>
        < div id='hospitable-widget-container' />
    </main>
    </>
  );
}