import Image from "next/image";
import image1 from "@/app/landingpic.jpg"
import Link from "next/link";


// <Properties/> displays the short term rental property pages
// See <Pricing/> for the origin of this page




const Property2 = () => {
  return (
    <section className="bg-base-200 overflow-hidden" id="Property2">
      <div className="py-24 px-8 max-w-5xl mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <p className="font-medium text-primary mb-8">Property 1</p>
          <h2 className="font-bold text-3xl lg:text-5xl tracking-tight">
            {'Name of Property 2'}
          </h2>
        </div>
      </div>



      
    </section>
  );
};

export default Property2;
