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
import React from 'react'

const propertyName = 'Sound Breeze'

const Property1 = () => {
    const images = [
        image1,
        image2,
        image3,
        image4
    ];

  return (
    <section data-theme="mybrand" className="bg-base-100 overflow-hidden" id="Property1">
      <div className="py-8 px-8 max-w-5xl mx-auto">
        <div className="flex flex-col mt-20 text-center w-full gap-10">
          <h2 className="font-bold text-3xl text-primary lg:text-5xl tracking-tight">
            {propertyName}
          </h2>
          <p className="font-medium  mb-8">Kick back and relax in this newly renovated guest suite. 
            The serene Gatewood neighborhood features stunning Puget Sound views, an abundance of 
            walkable cafes, restaurants, and parks, and convenient access to the Morgan Junction, Lincoln Park, or Downtown Seattle.</p>
        </div>
      </div>

        {/* Container with flexbox layout */}
        <div className="flex bg-base-100 p-4">
            <div className="grid grid-cols-1 md:grid-cols-[1fr,350px] gap-4">
                
                {/* Picture slideshow */}
                <div className="flex justify-center md:overflow-hidden"> {/* TODO learn why overflow-hidden fixes layouts with two columns, breaks those with one column*/}
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
                        // src="https://booking.hospitable.com/widget/9ca01362-9da8-44f3-9e64-18080aceba27/1198778"
                        
                    />  
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 mx-auto md:grid-cols-2 gap-4 ">
            <div className="flex justify-center p-4 lg:p-10">
                <article className="prose lg:prose-l">
                    <h3> About the property</h3>
                    <p>
                    The guest suite is located on the basement floor of a detached home, 
                    and is completely seperate from the unit above. The entrance opens to a 
                    stylish, newly renovated kitchen, a living space with West Elm furnishings 
                    and a smart TV, and a dining set for four. The kitchen is fully stocked with 
                    everything you need to cook during your stay, as well as coffee and tea 
                    supplies. The suite has two cozy bedrooms - the first features a king bed 
                    and the second has two twin beds. The bathroom is also newly renovated and 
                    features a tile shower surround and full sized bathtub. A laundry room and 
                    an office with a workstation round out the unit, and fiber optic internet 
                    ensures a reliable and high performance connection for guests looking to 
                    stream or work remotely during their stay.
                    </p>

                    <p>
                    Although this unit it freshly renovated, the home itself is older and sound 
                    travels fairly well. This makes this unit ideal for groups who are happy 
                    to relax quietly once quiet hours begin. The tenants upstairs are young 
                    professionals and are generally in bed early.
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
                                <li>fully stocked kitchen for cooking</li>
                                <li>washing machine and dryer</li>
                                <li>smart tv, couch, coffee table</li>
                                <li>high speed wifi, office with workstation</li>
                                <li>towels, linens, pillows, toilet paper</li>
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
                                <li>stove, oven, dishwasher, microwave</li>
                                <li>full refrigerator & freezer</li>
                                <li>pots, pans, oil, seasonings</li>
                                <li>dishes, silverware, paper towels</li>
                                <li>coffee, coffee maker, electric kettle</li>
                                <li>toaster, dining table</li>
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
                                <li>shower, bathtub, bath mat</li>
                                <li>body wash, shampoo, conditioner</li>
                                <li>blow dryer, black makeup towels</li>
                                <li>towels, hand towels, toilet paper</li>
                                <li>cotton balls, hand soap</li>
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
                                <li>memory foam mattresses, linens</li>
                                <li>duvets, pillows, blankets</li>
                                <li>closets, hangers, luggage racks</li>
                                <li>room-darkening shades</li>
                                <li>iron, ironing board</li>
                                <li>nightstands, tissues, lamps</li>
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
                                <li>private entrance, off-street parking</li>
                                <li>washing machine, dryer, detergent</li>
                                <li>fire extinguisher, smoke & CO detectors</li>
                            </ul>
                        </article>
                    </div>
                </div>


            </div>

        </div>

        <div className="grid grid-cols-1 mx-auto md:grid-cols-2 gap-4 ">
            <div className="flex justify-center p-4 lg:p-10">
                <article className="prose lg:prose-l">
                    <h3> About the Neighborhood</h3>
                    <p>
                    Gatewood is a serene neighborhood with lush greenery, abundant parks and cafes, 
                    and stunning views of the Puget Sound and Downtown Seattle. The quiet neighborhood 
                    is a walker&apos;s delight with multiple parks, coffee shops and restaurants within easy walking distance.
                    </p>

                    <p>
                    The West Seattle Junction is a short bus ride away on the 128 line and Downtown 
                    Seattle is just 20 minutes away on the 21 bus - both stops are less than two 
                    blocks away. Finally, for guests with cars we offer safe off street parking and a 
                    15 minute drive to Downtown Seattle.
                    </p>
                </article>
            </div>

            <div className="flex justify-center p-4 lg:p-10">
                <article className="prose lg:prose-l">
                    <h3>House Rules</h3>
                    <p>
                    Lorem ipsum
                    </p>

                    <p>
                    The quick brown fox jumped over the lazy dog.
                    </p>
                </article>
            </div>
        </div>
      
    </section>
  );
};

export default Property1;