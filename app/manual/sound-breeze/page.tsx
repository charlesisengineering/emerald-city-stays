// Sound Breeze PropertyPage
import { Suspense } from 'react'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { renderSchemaTags } from "@/libs/seo";
import React from 'react';
import image1 from '@/app/SoundBreezePhotos/rear.jpg'
import image2 from '@/app/SoundBreezePhotos/entry_door.jpg'
import image3 from '@/app/SoundBreezePhotos/kitchen_dining.jpg'
import image4 from '@/app/SoundBreezePhotos/bathroom.jpg'
import image5 from '@/app/SoundBreezePhotos/seating.jpg'

export default function soundBreezeManual() {

    // assemble an array of images to use in the Carousel. Eventually do this a cooler way?
    const images = [
        image1,
        image2,
        image3,
        image4,
        image5
    ];

    

  return (
    <>
    {renderSchemaTags()}
      <Suspense>
        <Header />
      </Suspense>
      <main data-theme="mybrand">
        <div className='flex bg-base-100 max-w-screen-xl mx-auto p-4 lg:p-10'>
            <article className="prose lg:prose-l">
                <h1>Sound Breeze House Manual</h1>
                    <h2>Getting Here</h2>
                        <p>
                            Your vacation rental is located on the South side of 6725 36th Ave SW. Access to 
                            the rental is via the paved alley between 36th Ave SW and 37th Ave SW. Please drive 
                            down the alley until you arrive at the house and then pull into the driveway at the 
                            back of the house.
                        </p>

                        {/* TODO Should we be using the Next.js Image class here? */}
                        <img src={image1.src} alt="Entry"/>
                    
                        <p>
                            Head around the right side of the house to the orange door to gain entry into the 
                            guest suite!    
                        </p>

                        <img src={image2.src} alt="Entry Door"/>

                    <h2>Checking In</h2>
                        <p>
                            You should have a keypad code for the smart lock that secures your guest suite. 
                            Please note that by default your code will not function until after your 3 PM check in time.
                        </p>

                        <p>
                            To unlock the door simply enter your keypad code. the lock will chime and then begin to 
                            unlock. Please give it a few seconds to fully open before attempting to open the door. 
                            Please lock the door after yourself when leaving the guest suite by pressing the lock 
                            button on the bottom right.
                        </p>
                    <h2>House Rules</h2>
                    <h2>Getting Around</h2>
                    <h2>Things to Do</h2>
                    <h2>Useful Info</h2>
            </article>
        </div>
      </main>
      <Footer />
    </>
  );
}