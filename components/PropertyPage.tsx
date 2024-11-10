// this page is a server component by default which does not allow event listeners e.g. onClick or state effects e.g. useState
// this currently causes react-slick to throw a fit, let's try setting the page to a client component
// TODO read https://nextjs.org/docs/app/building-your-application/rendering#when-to-use-server-and-client-components
// TODO read https://stackoverflow.com/questions/74614922/super-expression-must-either-be-null-or-a-function-nextjs-13
'use client'

import PictureSlideshow from "./PictureSlideshow"
import { PropertyPageProps } from "@/types/userTypes";
import React, { useEffect } from 'react'
import Script from 'next/script'

const PropertyPage: React.FC<PropertyPageProps> = ({
    propertyName,
    propertyDescription,
    propertyProse,
    propertyAmenities,
    neighborhoodDescription,
    carouselImages,
    bookingWidget
}) => {



    // script to pull dates selected in property search into property page
    // because clicking on a search result redirects to the live url, this can't be debugged easily on localhost

    function getQueryParams(param: string) {
        const urlSearchParams = new URLSearchParams(window.location.search);
        return urlSearchParams.get(param);
    }

    function updateIframeSrc() {
        const iframe = document.getElementById("booking-iframe") as HTMLIFrameElement;
        if (!iframe) return;

        const checkin = getQueryParams("checkin");
        const checkout = getQueryParams("checkout");
        const adults = getQueryParams("adults");
        const children = getQueryParams("children");
        const infants = getQueryParams("infants");
        const pets = getQueryParams("pets");

        let newSrc = iframe.src;
        newSrc += newSrc.includes("?") ? "&" : "?";
        newSrc += `checkin=${checkin}&checkout=${checkout}&adults=${adults}&children=${children}&pets=${pets}&infants=${infants}`;

        iframe.src = newSrc;
    }
    let map: google.maps.Map;

    async function initMap(): Promise<void> {
        // load library at runtime per https://developers.google.com/maps/documentation/javascript/load-maps-js-api
        const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
        // this is how you import markers
        // const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
        // TODO: so is this how you import circle symbols?
        //const { Circle } = await google.maps.importLibrary("circle") as google.maps.Symbol;

        map = new Map(document.getElementById("map") as HTMLElement, {
            zoom: 15,
            center: {lat: 47.5421028137207, lng: -122.37831115722656}
          });
        
        // TODO should we import a library for the circle element? Seems like no. Does this need to happen after the .importLibrary("maps") promise resolves?
        const circle = new google.maps.Circle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            center: {lat: 47.5421028137207, lng: -122.37831115722656},
            radius: 250
        });

        circle.setMap(map);
    }

    // Use useEffect to initialize the map when the component mounts
    // TODO this is necessary to make the map appear but I think that's an error. The script callback should do that but maybe defer isn't good enough?
    useEffect(() => {
        initMap();
    }, []);

    useEffect(() => {
        updateIframeSrc();
    })

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

        {/* ~~~~~~~~~~~~~~~ TODO: COMPARE THIS IMPLEMENTATION TO SOUND BREEZE, LEARN WHY THIS WORKS AND SB DOESNT~~~~~~~~~~~~~~~~~~~~~~ */}
        {/* Container with flexbox layout */}
        <div className="flex flex-col md:flex-row bg-base-100 p-4 lg:p-10 max-w-screen-xl mx-auto">

            {/* Picture slideshow */}
            <div className="flex justify-center mb-10 md:mb-0 md:w-2/3">
                <div className="w-full">
                <PictureSlideshow images={carouselImages} />
                </div>
            </div>

            {/* Booking iframe */}
            <div className="flex justify-center items-center md:w-1/3">
                <iframe
                id="booking-iframe"
                title="Booking Widget"
                sandbox="allow-top-navigation allow-scripts allow-same-origin"
                style={{ width: '320px', height: '750px' }}
                frameBorder="0"
                src={bookingWidget}
                />
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
                    <input type="radio" name="my-accordion-3" aria-label="Expand Basic Amenities" defaultChecked />
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
                    <input type="radio" name="my-accordion-3" aria-label="Expand Kitchen and Dining Amenities"/>
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
                    <input type="radio" name="my-accordion-3" aria-label="Expand Bathroom Amenities"/>
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
                    <input type="radio" name="my-accordion-3" aria-label="Expand Bedroom Amenities"/>
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
                    <input type="radio" name="my-accordion-3" aria-label="Expand Additional Amenities"/>
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
                <div className="grid grid-cols-1 space-y-8 max-w-screen-xl">
                    <article className="prose lg:prose-l">
                        <h3> About the Neighborhood</h3>
                        <p>
                            {neighborhoodDescription}
                        </p>
                    </article>
                    <div className="flex w-full h-96" id='map'>
                        <script async defer
                            // TODO debug Uncaught (in promise) InvalidValueError: initMap is not a function. Does script callback before my function is defined?
                            src= {`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&callback=initMap&v=weekly&loading=async`}
                        ></script>
                        {/* <Script 
                            src= {`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&callback=initMap&v=weekly`} 
                            strategy="beforeInteractive"
                        />  */}
                    </div > 
                </div>
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