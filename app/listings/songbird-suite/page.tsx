// Songbird PropertyPage
import { Suspense } from 'react'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyPage from "@/components/PropertyPage";
import { renderSchemaTags } from "@/libs/seo";
import React from 'react';
import image1 from '@/app/SongbirdPhotos/king3.jpeg';
import image2 from '@/app/SongbirdPhotos/kitchen.jpeg';
import image3 from '@/app/SongbirdPhotos/living.jpeg';
import image4 from '@/app/SongbirdPhotos/bathroom.jpeg';
import { amenitiesList, MapCoordinates } from "@/types/userTypes";

export default function songbirdPropertyPage() {

    // assemble an array of images to use in the Carousel. Eventually do this a cooler way?
    const images = [
        image1,
        image2,
        image3,
        image4
    ];

    const songbirdCoordinates: MapCoordinates = {
        latitude: 47.70262199168761, 
        longitude: -122.31209870196159};

    // create an instance of an amenitiesList to pass to propertyAmenities below
    const songbirdAmenities: amenitiesList = {
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
            propertyName='Songbird Suite' 
            propertyProse='The space has been recently remodeled, making it a peaceful and beautiful retreat in the quaint 
            Maple Leaf neighborhood that&apos;s still within easy reach of the hustle and bustle the heart of Seattle. The 
            spacious new kitchen, onsite laundry, and blazing fast fiber optic internet make it a perfect choice for guests 
            looking for a temporary home for a longer term stay. The home itself is older and sound travels fairly well, 
            which makes it ideal for groups who are happy to relax quietly once quiet hours begin. The tenants upstairs are 
            young professionals and are generally in bed early.'
            propertyAmenities={songbirdAmenities}
            propertyDescription='This spacious, recently renovated 1100 sqft Maple Leaf mother-in-law invites you to relax 
            after a day of exploring Seattle. Located just North of the heart of the city this suite offers convenient 
            access to the heart of Seattle with just one bus ride from a stop a block away. The private suite accommodates 
            4 guests with plenty of space to stretch out, super-fast fiber internet, a new 65" smart TV, and a brand new 
            kitchen for preparing meals.'
            propertyCoordinates={songbirdCoordinates}
            neighborhoodDescription='Maple Leaf provides a tranquil environment just north of the center of Seattle with 
            plenty of cool eateries and easy access to the developing Northgate area.
            
            The cross streets for the Airbnb are 15th Ave NE and NE 102nd Street.'
            carouselImages={images}
            bookingWidget='https://booking.hospitable.com/widget/9ca01362-9da8-44f3-9e64-18080aceba27/493270'/>
      </main>
      <Footer />
    </>
  );
}