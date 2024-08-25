// this page is a server component by default which does not allow event listeners e.g. onClick or state effects e.g. useState
// this currently causes react-slick to throw a fit, let's try setting the page to a client component
// TODO read https://nextjs.org/docs/app/building-your-application/rendering#when-to-use-server-and-client-components
// TODO read https://stackoverflow.com/questions/74614922/super-expression-must-either-be-null-or-a-function-nextjs-13
'use client'

import PictureSlideshow from "./PictureSlideshow"
import { StaticImageData } from 'next/image';
import React from 'react'
import { amenitiesList } from "@/types/userTypes";

interface PropertyPageProps {
    propertyName: string;
    propertyDescription: string;
    propertyProse: string;
    propertyAmenities: amenitiesList;
    neighborhoodDescription: string;
    carouselImages: StaticImageData[]; // An array of all images to live in the carousel 
    bookingWidget: string; // url for the booking widget, goes into the src of the iframe
  }



const PropertyPage: React.FC<PropertyPageProps> = ({
    propertyName,
    propertyDescription,
    propertyProse,
    propertyAmenities,
    neighborhoodDescription,
    carouselImages,
    bookingWidget
}) => {

  return (
    // TODO use typography for all of this stuff
    <section data-theme="mybrand" className="bg-base-100 overflow-hidden" id="Property1"> 
      <div className="py-8 px-8 max-w-5xl mx-auto">
        <div className="flex flex-col mt-10 text-center w-full gap-10">
          <h1 className="font-bold text-3xl text-primary lg:text-6xl tracking-tight">
            {propertyName}
          </h1>
          <p className="font-medium  mb-8">
            {propertyDescription}
          </p>
        </div>
      </div>

        {/* Container with flexbox layout */}
        <div className="flex bg-base-100 p-4 max-w-screen-xl" style={{ margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-[1fr,350px] gap-4">
                
                {/* Picture slideshow */}
                <div className="flex justify-center md:overflow-hidden mb-10"> {/* TODO learn why overflow-hidden fixes layouts with two columns, breaks those with one column*/}
                    <div className="w-11/12">
                            <PictureSlideshow images={carouselImages}/>
                    </div>
                </div>

                {/* Booking iframe */}
                <div className="flex justify-center items-center">
                    <iframe
                        id="booking-iframe"
                        sandbox="allow-top-navigation allow-scripts allow-same-origin"
                        style={{ width: '320px', height: '750px' }}
                        frameBorder="0"
                        src={bookingWidget}
                        
                    />  
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 mx-auto md:grid-cols-2 gap-4 max-w-screen-xl">
            <div className="flex justify-center p-4 lg:p-10">
                <article className="prose lg:prose-l">
                    <h3> About the Property</h3>
                    <p>
                        {propertyProse}
                    </p>
                </article>
            </div>

            <div className="grid grid-cols-1 justify-center p-4 lg:p-10">
                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" defaultChecked />
                    <div className="collapse-title text-xl font-medium">Basic Amenities</div>
                    <div className="collapse-content">
                        <article className="prose">
                            <ul>
                                {propertyAmenities.basicAmenities.map((amenity,index) => (
                                    <li key={index}>{amenity}</li>
                                ))}
                            </ul>
                        </article>
                    </div>
                </div>

                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-medium">Kitchen and Dining Amenities</div>
                    <div className="collapse-content">
                        <article className="prose">
                            <ul>
                            {propertyAmenities.kitchenAndDining.map((amenity,index) => (
                                    <li key={index}>{amenity}</li>
                                ))}
                            </ul>
                        </article>
                    </div>
                </div>

                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-medium">Bathroom Amenities</div>
                    <div className="collapse-content">
                        <article className="prose">
                            <ul>
                                {propertyAmenities.bathroom.map((amenity,index) => (
                                    <li key={index}>{amenity}</li>
                                ))}
                            </ul>
                        </article>
                    </div>
                </div>

                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-medium">Bedroom Amenities</div>
                    <div className="collapse-content">
                        <article className="prose">
                            <ul>
                                {propertyAmenities.bedroom.map((amenity,index) => (
                                    <li key={index}>{amenity}</li>
                                ))}
                            </ul>
                        </article>
                    </div>
                </div>

                <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-medium">Additional Amenities</div>
                    <div className="collapse-content">
                        <article className="prose">
                            <ul>
                                {propertyAmenities.additional.map((amenity, index) => (
                                    <li key={index}>{amenity}</li>
                                ))}
                            </ul>
                        </article>
                    </div>
                </div>


            </div>

        </div>

        <div className="grid grid-cols-1 mx-auto md:grid-cols-2 gap-4 max-w-screen-xl">
            <div className="flex justify-center p-4 lg:p-10">
                <article className="prose lg:prose-l">
                    <h3> About the Neighborhood</h3>
                    <p>
                        {neighborhoodDescription}
                    </p>
                </article>
            </div>

            <div className="flex justify-center p-4 lg:p-10">
                <article className="prose lg:prose-l">
                    <h3>House Rules</h3>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
                    irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                    deserunt mollit anim id est laborum.
                    </p>

                    <p>
                    The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. 
                    The quick brown fox jumps over the lazy dog.
                    </p>
                </article>
            </div>
        </div>
      
    </section>
  );
};

export default PropertyPage;