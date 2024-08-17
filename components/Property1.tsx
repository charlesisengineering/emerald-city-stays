// this page is a server component by default which does not allow event listeners e.g. onClick or state effects e.g. useState
// this currently causes react-slick to throw a fit, let's try setting the page to a client component
// TODO read https://nextjs.org/docs/app/building-your-application/rendering#when-to-use-server-and-client-components
// TODO read https://stackoverflow.com/questions/74614922/super-expression-must-either-be-null-or-a-function-nextjs-13
'use client'

import image1 from "@/app/GatewoodPhotos/entry.jpg"
import image2 from "@/app/GatewoodPhotos/couch.jpg"
import image3 from "@/app/GatewoodPhotos/king_bed.jpg"
import image4 from "@/app/GatewoodPhotos/bathroom.jpg"
import PictureSlideshow from "./PictureSlideshow"

const propertyName = 'Sound Breeze'


// <Properties/> displays the short term rental property pages
// See <Pricing/> for the origin of this page




const Property1 = () => {
    const images = [
        image1,
        image2,
        image3,
        image4
    ];



  return (
    <section className="bg-base-200 overflow-hidden" id="Property1">
      <div className="py-24 px-8 max-w-5xl mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <p className="font-medium text-primary mb-8">{propertyName}</p>
          <h2 className="font-bold text-3xl lg:text-5xl tracking-tight">
            {propertyName}
          </h2>
        </div>
      </div>

        {/* Container with flexbox layout 
        TODO ask Q to help us establish a fallback strategy for browsers that don't support Flexbox*/}
        <div className="flex bg-gray-200 p-4 max-h-svh">
            <div className="grid grid-cols-1 md:grid-cols-[1fr,350px] gap-4 xl:grid-cols-[1fr,350px]">
                {/* Picture slideshow */}
                <div className="flex justify-center">
                    <div className="w-11/12">
                        <PictureSlideshow images={images}/>
                    </div>
                </div>

                {/* Booking iframe */}
                <div className="flex justify-center items-center">
                    <iframe
                        id="booking-iframe"
                        sandbox="allow-top-navigation allow-scripts allow-same-origin"
                        style={{ width: '320px', height: '900px' }}
                        frameBorder="0"
                        src="https://booking.hospitable.com/widget/9ca01362-9da8-44f3-9e64-18080aceba27/493270"
                    />  
                </div>
            </div>
        </div>


      
    </section>
  );
};

export default Property1;
