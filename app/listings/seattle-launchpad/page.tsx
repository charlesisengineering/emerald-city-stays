import { Suspense } from 'react'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyPage from "@/components/PropertyPage";
// import { renderSchemaTags } from "@/libs/seo";
import React from 'react';
import image1 from '@/app/LaunchpadPhotos/living.jpeg'
import image2 from '@/app/LaunchpadPhotos/king.jpeg'
import image3 from '@/app/LaunchpadPhotos/kitchen.jpeg'
import image4 from '@/app/LaunchpadPhotos/bathroom.jpeg'
import { amenitiesList } from "@/types/userTypes";

export default function Home() {

    const images = [
        image1,
        image2,
        image3,
        image4
    ];

    // create an instance of an amenitiesList to pass to propertyAmenities below


    const launchpadAmenities: amenitiesList = {
        basicAmenities: ['Fully stocked kitchen',
            'washing machine, dryer', 
            'smart TV, couch, coffee table', 
            'high-speed WiFi, office with workstation', 
            'towels, linens, pillows, toilet paper'
        ],
        kitchenAndDining: ['Stove, oven, dishwasher, microwave', 
            'full refrigerator & freezer',
            'pots, pans, oil, seasonings',
            'dishes, silverware, paper towels',
            'coffee, coffee maker, electric kettle', 
            'toaster, dining table'
        ],
        bathroom: ['Shower, bathtub, bath mat',
            'body wash, shampoo, conditioner', 
            'blow dryer, black makeup towels',
            'towels, hand towels, toilet paper',
            'cotton balls, hand soap'
        ],
        bedroom: ['Memory foam mattresses, linens',
            'duvets, pillows, blankets',
            'closets, hangers, luggage racks',
            'room-darkening shades',
            'iron, ironing board',
            'nightstands, tissues, lamps'
        ],
        additional: ['Private entrance, off-street parking',
            'washing machine, dryer, detergent',
            'fire extinguisher, smoke & CO detectors'
        ],
      }

  return (
    <>
    {/* {renderSchemaTags()} */}
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
            neighborhoodDescription='The neighborhood is very residential while also being centrally located. You&apos;ll be 
            within 15 minutes of Downtown Seattle and within 10 minutes of cool urban centers in White Center and Georgetown.'
            carouselImages={images}
            bookingWidget='https://booking.hospitable.com/widget/9ca01362-9da8-44f3-9e64-18080aceba27/614010'/>
      </main>
      <Footer />
    </>
  );
}