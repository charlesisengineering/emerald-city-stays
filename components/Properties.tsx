import Image from "next/image";
import image1 from "@/app/landingpic.jpg"
import image2 from "@/app/Songbird.jpg"
import image3 from "@/app/Launchpad.jpg"
import Link from "next/link";
import PropertyCard from "./PropertyCard";

// <Properties/> displays the short term rental property pages
// See <Pricing/> for the origin of this page

const links: {
    href: string;
    label: string;
  }[] = [
    {
      href: "/#pricing",
      label: "Property 1",
    },
    {
      href: "/#testimonials",
      label: "Property 2",
    },
    {
      href: "/#faq",
      label: "Property 3",
    },
  ];


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

    {/* <div className="flex flex-row">
        <div className="flex-1 bg-gray-200 p-4 m-2">Item 1</div>
        <div className="flex-1 bg-gray-200 p-4 m-2">Item 2</div>
        <div className="flex-1 bg-gray-200 p-4 m-2">Item 3</div>
    </div> */}

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <Link href="/#Property1">
        <div className="bg-gray-200 p-4 aspect-ratio-4/3 rounded-xl">
        <div className="relative h-full rounded-xl overflow-hidden">
            <Image
            src={image1}
            alt="Image 1"
            className="w-full h-full object-cover"
            priority={true}
            width={500}
            height={500}
            />
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-2 text-white">
            <h3 className="text-lg font-semibold">Property 1</h3>
            </div>
        </div>
        </div>
    </Link>

    <Link href="/#Property2">
        <div className="bg-gray-200 p-4 aspect-ratio-4/3 rounded-xl">
        <div className="relative h-full rounded-xl overflow-hidden">
            <Image
            src={image2}
            alt="Image 1"
            className="w-full h-full object-cover"
            priority={true}
            width={500}
            height={500}
            />
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-2 text-white">
            <h3 className="text-lg font-semibold">Property 2</h3>
            </div>
        </div>
        </div>
    </Link>

    <Link href="/#Property3">
        <div className="bg-gray-200 p-4 aspect-ratio-4/3 rounded-xl">
        <div className="relative h-full rounded-xl overflow-hidden">
            <Image
            src={image3}
            alt="Image 1"
            className="w-full h-full object-cover"
            priority={true}
            width={500}
            height={500}
            />
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-2 text-white">
            <h3 className="text-lg font-semibold">Property 3</h3>
            </div>
        </div>
        </div>
    </Link>
    </div>


      
    </section>
  );
};

export default Properties;
