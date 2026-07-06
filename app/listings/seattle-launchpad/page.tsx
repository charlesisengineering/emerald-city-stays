// Launchpad PropertyPage
import { Suspense } from 'react'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyPage from "@/components/PropertyPage";
import HouseRules from "@/components/HouseRules";
import PropertySchema from "@/components/PropertySchema";
import PropertyReviews from "@/components/PropertyReviews";
import { getSEOTags } from "@/libs/seo";

export const metadata = getSEOTags({
  title: "Seattle Launchpad — Furnished Rental near SeaTac & Downtown Seattle",
  description:
    "A furnished guest suite in the Boulevard Park / Highline area of Seattle, minutes from SeaTac Airport and a short drive to Downtown. Full kitchen, private entrance, and off-street parking.",
  keywords: [
    "furnished rental near SeaTac",
    "Boulevard Park Seattle rental",
    "Highline Seattle guest suite",
    "furnished rental south Seattle",
  ],
  canonicalUrlRelative: "/listings/seattle-launchpad",
});
import React from 'react';
import image1 from '@/app/LaunchpadPhotos/living.jpeg'
import image2 from '@/app/LaunchpadPhotos/king.jpeg'
import image3 from '@/app/LaunchpadPhotos/kitchen.jpeg'
import image4 from '@/app/LaunchpadPhotos/bathroom.jpeg'
import { amenitiesList } from "@/types/userTypes";
import { PROPERTIES, bookingWidgetUrl } from "@/libs/properties";

export default function launchpadPropertyPage() {

    // assemble an array of images to use in the Carousel. Eventually do this a cooler way?
    const images = [
        image1,
        image2,
        image3,
        image4
    ];

    // create an instance of an amenitiesList to pass to propertyAmenities below
    const launchpadAmenities: amenitiesList = {
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
    <PropertySchema property="launchpad" />
      <Suspense>
        <Header />
      </Suspense>
      <main>
        <PropertyPage 
            propertyName='Seattle Launchpad' 
            propertyProse='The unit is a basement mother-in-law suite within a charming Craftsman style home. Minimalist 
            décor highlighting Earth tones and neutrals makes it a relaxing place to unwind during a trip to Seattle. 
            The master bedroom features a king bed and a full length mirror and the second bedroom provides two twin beds 
            for guests who prefer their own sleeping space. A full coffee and tea bar is available in the kitchen as well 
            as all the cookware and appliances you&apos;ll need to create great meals during your stay. The living room features 
            a TV, sectional, poufs, as well as a workstation and dining nook.' 
            propertyAmenities={launchpadAmenities}
            propertyDescription='This spacious recently renovated 1100 sqft Highline mother-in-law invites you to 
            relax after a day of exploring Seattle. Centrally located between SeaTac Airport and Downtown Seattle, 
            you&apos;ll be just a short drive from everything the Emerald City has to offer. The private suite accommodates 
            4 guests with plenty of space to stretch out, super-fast internet, air conditioning, two workstations 
            for remote workers, a new 58" smart TV, and a full kitchen for preparing meals.' 
            propertyCoordinates={PROPERTIES['launchpad'].coords}
            neighborhoodDescription='The neighborhood is very residential while also being centrally located. You&apos;ll be 
            within 15 minutes of Downtown Seattle and within 10 minutes of cool urban centers in White Center and Georgetown.'
            carouselImages={images}
            bookingWidget={bookingWidgetUrl('launchpad')}
            houseRules={<HouseRules property="launchpad" />}
            reviews={<PropertyReviews property="launchpad" />}/>
      </main>
      <Footer />
    </>
  );
}