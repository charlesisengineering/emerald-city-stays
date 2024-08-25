// Songbird PropertyPage
import { Suspense } from 'react'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyPage from "@/components/PropertyPage";
import { renderSchemaTags } from "@/libs/seo";
import React from 'react';
import image1 from '@/app/SongbirdPhotos/living.jpeg';
import image2 from '@/app/SongbirdPhotos/king3.jpeg';
import image3 from '@/app/SongbirdPhotos/kitchen.jpeg';
import image4 from '@/app/SongbirdPhotos/bathroom.jpeg';
import { amenitiesList } from "@/types/userTypes";

export default function songbirdPropertyPage() {

    // assemble an array of images to use in the Carousel. Eventually do this a cooler way?
    const images = [
        image1,
        image2,
        image3,
        image4
    ];

    // create an instance of an amenitiesList to pass to propertyAmenities below
    const songbirdAmenities: amenitiesList = {
        basicAmenities: ['Fully stocked kitchen',
            'Washing machine, dryer', 
            'Smart TV, couch, coffee table', 
            'High-speed WiFi, office with workstation', 
            'Towels, linens, pillows, toilet paper'
        ],
        kitchenAndDining: ['stove, oven, dishwasher, microwave', 
            'full refrigerator & freezer',
            'pots, pans, oil, seasonings',
            'dishes, silverware, paper towels',
            'coffee, coffee maker, electric kettle', 
            'toaster, dining table'
        ],
        bathroom: ['shower, bathtub, bath mat',
            'body wash, shampoo, conditioner', 
            'blow dryer, black makeup towels',
            'towels, hand towels, toilet paper',
            'cotton balls, hand soap'
        ],
        bedroom: ['memory foam mattresses, linens',
            'duvets, pillows, blankets',
            'closets, hangers, luggage racks',
            'room-darkening shades',
            'iron, ironing board',
            'nightstands, tissues, lamps'
        ],
        additional: ['private entrance, off-street parking',
            'washing machine, dryer, detergent',
            'fire extinguisher, smoke & CO detectors'
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
            looking for a temporary home for a longer term stay. New pictures will be posted in mid-March and the unit will 
            e available to guests again in late March. We look forward to hosting you!
            
            The home itself is older and sound travels fairly well, which makes it ideal for groups who are happy to relax 
            quietly once quiet hours begin. The tenants upstairs are young professionals and are generally in bed early.'
            propertyAmenities={songbirdAmenities}
            propertyDescription='This spacious recently renovated 1100 sqft Highline mother-in-law invites you to 
            relax after a day of exploring Seattle. Centrally located between SeaTac Airport and Downtown Seattle, 
            you&apos;ll be just a short drive from everything the Emerald City has to offer. The private suite accommodates 
            4 guests with plenty of space to stretch out, super-fast internet, air conditioning, two workstations 
            for remote workers, a new 58" smart TV, and a full kitchen for preparing meals.' 
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