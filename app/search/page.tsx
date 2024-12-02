'use client'

import { renderSchemaTags } from "@/libs/seo";
import buildSearchWidget from "@/libs/hospitable";
import React from "react";
import { searchWidgetProps } from "@/types/userTypes";

export default function SearchPage() {

    const searchWidgetResultProps:searchWidgetProps = {
        widgetElement: "hospitable-widget-container",
    }

    // Initialize the widget - call at component level since it contains hooks
    buildSearchWidget(searchWidgetResultProps);

    // not sure this is needed - investigate the z index and if we care to modify it
    // useEffect(() => {
    //     // Fix the overlay z-index
    //     const overlayDiv = document.querySelector<HTMLElement>('div[style*="z-index:9999"]');
    //     if (overlayDiv) {
    //         overlayDiv.style.zIndex = '10';
    //     }
    // }, []);


  return (
    <>
        {renderSchemaTags()}
        <main>
            < div 
                id='hospitable-widget-container' 
                className="w-full relative pb-4 overflow-y-auto max-h-[calc(100vh-200px)]"
            />
        </main>
    </>
  );
}