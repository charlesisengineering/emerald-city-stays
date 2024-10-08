'use client'

import React from 'react'
import image1 from "@/app/landingpic.jpg"
import image2 from "@/app/Songbird.jpg"
import image3 from "@/app/Launchpad.jpg"
import PropertyCard from "./PropertyCard";
import { listingCardProps, searchWidgetProps } from '@/types/userTypes';
import buildSearchWidget from "@/libs/hospitable";

// <Properties/> displays the short term rental property pages
// See <Pricing/> for the origin of this page

const Properties: React.FC<listingCardProps> = ({
    songbirdLink,
    soundBreezeLink,
    launchpadLink,
    headlineText,
    taglineText,
    showHospitableSearchWidget
}) => {

    if (showHospitableSearchWidget){
        const searchWidgetQueryProps:searchWidgetProps = {
            widgetElement: 'hospitable-widget-container',
            searchAttribute: '/search'
        }
    
        buildSearchWidget(searchWidgetQueryProps);
    }


  return (
    <section className="bg-base-100 overflow-hidden max-w-screen-xl" id="properties" data-theme="mybrand" style={{ margin: '0 auto' }}>
        <div className="px-8 max-w-5xl mx-auto">
            <div className="flex flex-col text-center w-full mb-10">
                <h1 className="font-bold text-3xl lg:text-5xl tracking-tight text-primary mb-8">{headlineText}</h1>
                <h2 className="font-medium text-xl lg:text-2xl tracking-tight">
                {taglineText}
                </h2>
            </div>
        </div>

        < div id='hospitable-widget-container' className={`${showHospitableSearchWidget ? '' : 'hidden'}`} />

        <div className="grid grid-cols-1 gap-5 px-4 md:grid-cols-3 md:gap-6">
            <PropertyCard href={soundBreezeLink} 
                title="Sound Breeze"       
                imageSrc={image1}
                description='A stylish West Seattle gem with all the comforts of home'
                primaryBadgeHidden
                secondaryBadgesHidden/>
            < PropertyCard href={songbirdLink}      
                title="Songbird Suite"  
                imageSrc={image2}
                description='A verdant getaway in North Seattle&apos;s Maple Leaf'
                primaryBadgeHidden
                secondaryBadgesHidden/>
            < PropertyCard href={launchpadLink}     
                title="Launchpad"       
                imageSrc={image3}
                description='Your cozy home base between SeaTac airport and Seattle'
                primaryBadgeHidden
                secondaryBadgesHidden/>
        </div>

        <div className="flex w-full h-10"/>

    </section>
  );
};

export default Properties;
