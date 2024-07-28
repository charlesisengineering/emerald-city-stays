import Image from "next/image";
import image1 from "@/app/landingpic.jpg"
import Link from "next/link";


// <Properties/> displays the short term rental property pages
// See <Pricing/> for the origin of this page




const Property1 = () => {
  return (
    <section className="bg-base-200 overflow-hidden" id="Property1">
      <div className="py-24 px-8 max-w-5xl mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <p className="font-medium text-primary mb-8">Property 1</p>
          <h2 className="font-bold text-3xl lg:text-5xl tracking-tight">
            {'Name of Property 1'}
          </h2>
        </div>
      </div>

      {/* Container with minimum width and height */}
      <div className="min-w-[320px] h-[900px] bg-gray-200 p-4 mx-auto">
      <iframe 
        id="booking-iframe" 
        sandbox="allow-top-navigation allow-scripts allow-same-origin" 
        style={{ width: '100%', height: '900px' }}
        frameBorder="0" 
        src="https://booking.hospitable.com/widget/9ca01362-9da8-44f3-9e64-18080aceba27/493270"></iframe>
      </div>



      
    </section>
  );
};

export default Property1;
