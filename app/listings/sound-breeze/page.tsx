// Sound Breeze PropertyPage
import { Suspense } from 'react'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyPage from "@/components/PropertyPage";
import { renderSchemaTags } from "@/libs/seo";
import React from 'react';
import image1 from '@/app/SoundBreezePhotos/entry.jpg'
import image2 from '@/app/SoundBreezePhotos/king_bed.jpg'
import image3 from '@/app/SoundBreezePhotos/kitchen_dining.jpg'
import image4 from '@/app/SoundBreezePhotos/bathroom.jpg'
import image5 from '@/app/SoundBreezePhotos/seating.jpg'
import { amenitiesList } from "@/types/userTypes";

export default function soundBreezePropertyPage() {

    // assemble an array of images to use in the Carousel. Eventually do this a cooler way?
    const images = [
        image1,
        image2,
        image3,
        image4,
        image5
    ];

    const soundBreezeCoordinates = [47.542100489716034, -122.3783156994263];

    // create an instance of an amenitiesList to pass to propertyAmenities below
    const soundBreezeAmenities: amenitiesList = {
        basicAmenities: ['Fully stocked kitchen',
            'Washing machine, dryer', 
            'Smart TV, couch, coffee table', 
            'High-speed WiFi, office with workstation', 
            'Towels, linens, pillows, toilet paper'
        ],
        kitchenAndDining: ['Stove, oven, dishwasher, microwave', 
            'Full-size refrigerator & freezer',
            'Pots, pans, oil, seasonings',
            'Dishes, silverware, paper towels',
            'Coffee, coffee maker, electric kettle', 
            'Toaster, dining table'
        ],
        bathroom: ['Shower, bathtub, bath mat',
            'Body wash, shampoo, conditioner', 
            'Blow dryer, black makeup towels',
            'Towels, hand towels, toilet paper',
            'Cotton balls, hand soap'
        ],
        bedroom: ['Memory foam mattresses, linens',
            'Duvets, pillows, blankets',
            'Closets, hangers, luggage racks',
            'Room-darkening shades',
            'Iron, ironing board',
            'Nightstands, tissues, lamps'
        ],
        additional: ['Private entrance, off-street parking',
            'Washing machine, dryer, detergent',
            'Fire extinguisher, smoke & CO detectors'
        ],
      }

  return (
    <>
    {renderSchemaTags()}
      <Suspense>
        <Header />
      </Suspense>
      <main>
        <PropertyPage 
            propertyName='Sound Breeze' 
            propertyProse='The guest suite is located on the basement floor of a detached home, 
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

                Although this unit it freshly renovated, the home itself is older and sound 
                travels fairly well. This makes this unit ideal for groups who are happy 
                to relax quietly once quiet hours begin. The tenants upstairs are young 
                professionals and are generally in bed early.'
            propertyAmenities={soundBreezeAmenities}
            propertyDescription='Kick back and relax in this newly renovated guest suite. 
                The serene Gatewood neighborhood features stunning Puget Sound views, an abundance of 
                walkable cafes, restaurants, and parks, and convenient access to the Morgan Junction, Lincoln Park, or Downtown Seattle.'
            
            propertyCoordinates={soundBreezeCoordinates}
            neighborhoodDescription='Gatewood is a serene neighborhood with lush greenery, abundant parks and cafes, 
                and stunning views of the Puget Sound and Downtown Seattle. The quiet neighborhood 
                is a walker&apos;s delight with multiple parks, coffee shops and restaurants within easy walking distance.

                The West Seattle Junction is a short bus ride away on the 128 line and Downtown 
                Seattle is just 20 minutes away on the 21 bus - both stops are less than two 
                blocks away. Finally, for guests with cars we offer safe off street parking and a 
                15 minute drive to Downtown Seattle.'
            carouselImages={images}
            bookingWidget="https://booking.hospitable.com/widget/9ca01362-9da8-44f3-9e64-18080aceba27/1198778"/>
      </main>
      <Footer />
    </>
  );
}