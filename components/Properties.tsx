import React from 'react'
import image1 from "@/app/landingpic.jpg"
import image2 from "@/app/Songbird.jpg"
import image3 from "@/app/Launchpad.jpg"
import PropertyCard from "./PropertyCard";

// <Properties/> displays the short term rental property pages
// See <Pricing/> for the origin of this page

const Properties = () => {
  return (
    <section className="bg-base-200 overflow-hidden" id="properties">
      <div className="py-24 px-8 max-w-5xl mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <p className="font-medium text-primary mb-8">Our Properties</p>
          <h2 className="font-bold text-3xl lg:text-5xl tracking-tight">
            {'We\'ve got you convered from Shoreline to Tukwila'}
          </h2>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-3 grid-rows-2" id="testgrid">
        </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        < PropertyCard href="/#Property1" title="Sound Breeze" imageSrc={image1}/>
        < PropertyCard href="/#Property2" title="Songbird Suite" imageSrc={image2}/>
        < PropertyCard href="/#Property3" title="Launchpad" imageSrc={image3}/>
    </div>

    </section>
  );
};

export default Properties;
