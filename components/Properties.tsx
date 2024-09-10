import React from 'react'
import image1 from "@/app/landingpic.jpg"
import image2 from "@/app/Songbird.jpg"
import image3 from "@/app/Launchpad.jpg"
import PropertyCard from "./PropertyCard";
import { listingCardProps } from '@/types/userTypes';

// <Properties/> displays the short term rental property pages
// See <Pricing/> for the origin of this page

const Properties: React.FC<listingCardProps> = ({
    songbirdLink,
    soundBreezeLink,
    launchpadLink,
    headlineText,
    taglineText
}) => {
  return (
    <section className="bg-base-100 overflow-hidden max-w-screen-xl" id="properties" data-theme="mybrand" style={{ margin: '0 auto' }}>
        <div className="py-8 px-8 max-w-5xl mx-auto">
            <div className="flex flex-col text-center w-full mb-10">
                <p className="font-bold text-3xl lg:text-5xl tracking-tight text-primary mb-8">{headlineText}</p>
                <h2 className="font-medium text-xl lg:text-2xl tracking-tight">
                {taglineText}
                </h2>
            </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-10">
            < PropertyCard href={soundBreezeLink}   title="Sound Breeze"    imageSrc={image1}/>
            < PropertyCard href={songbirdLink}      title="Songbird Suite"  imageSrc={image2}/>
            < PropertyCard href={launchpadLink}     title="Launchpad"       imageSrc={image3}/>
        </div>

        <div className="flex w-full h-10"/>

    </section>
  );
};

export default Properties;
