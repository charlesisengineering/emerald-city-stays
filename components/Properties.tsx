import Image from "next/image";
import image1 from "@/app/landingpic.jpg"
import Link from "next/link";


// <Properties/> displays the short term rental property pages
// See <Pricing/> for the origin of this page

const links: {
    href: string;
    label: string;
  }[] = [
    {
      href: "/#pricing",
      label: "Pricing",
    },
    {
      href: "/#testimonials",
      label: "Reviews",
    },
    {
      href: "/#faq",
      label: "FAQ",
    },
  ];


const Properties = () => {
  return (
    <section className="bg-base-200 overflow-hidden" id="properties">
      <div className="py-24 px-8 max-w-5xl mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <p className="font-medium text-primary mb-8">Our Properties</p>
          <h2 className="font-bold text-3xl lg:text-5xl tracking-tight">
            We've got you convered from Shoreline to Tukwila
          </h2>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-3 grid-rows-2" id="testgrid">
    </div>

    {/* <div className="flex flex-row">
        <div className="flex-1 bg-gray-200 p-4 m-2">Item 1</div>
        <div className="flex-1 bg-gray-200 p-4 m-2">Item 2</div>
        <div className="flex-1 bg-gray-200 p-4 m-2">Item 3</div>
    </div> */}

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gray-200 p-4">
        <Image 
            src={image1} 
            alt="Image 1" 
            className="w-full h-auto"           
            priority={true}
            width={500}
            height={500}
        />
    </div>
        <div className="bg-gray-200 p-4">
        <Image 
            src={image1} 
            alt="Image 1" 
            className="w-full h-auto"           
            priority={true}
            width={500}
            height={500}
        />

    </div>
    <div className="bg-gray-200 p-4">
    <Image 
            src={image1} 
            alt="Image 1" 
            className="w-full h-auto"           
            priority={true}
            width={500}
            height={500}
        />

    </div>
</div>

      
    </section>
  );
};

export default Properties;
