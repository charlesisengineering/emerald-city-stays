import { renderSchemaTags } from "@/libs/seo";
import React from 'react';
import parkingImage from '@/app/LaunchpadPhotos/parking.png'
import lockImage from '@/app/LaunchpadPhotos/lock.jpeg'
// import trashImage from '@/app/SongbirdPhotos/trash.jpeg'
import entryImage from '@/app/LaunchpadPhotos/rear.png'
import Image from "next/image";

export default function launchpadManual() {

  return (
    <>
    {renderSchemaTags()}
      <main data-theme="mybrand">
        <div className='flex bg-base-100 max-w-screen-lg mx-auto p-4 lg:p-10'>
            <article className="prose max-w-none lg:prose-l">
                <h1>Seattle Launchpad House Manual</h1>
                    <h2>Getting Here</h2>
                        <p>
                        Your vacation rental is located at 1025 S 112th St, Seattle 98168. The home is on the South side of the street and features ample street parking for guests. Please note that the front door to the house is for a separate unit. When you arrive please park on the street, then walk down the driveway towards the garage. When you reach the back of the house you will see a set of stairs leading down to the entrance to your guest suite.                        </p>

                        {/* TODO Should we be using the Next.js Image class here? */}
                        <Image src={parkingImage.src} 
                            alt="View of Seattle Launchpad parking"
                            className="w-full max-w-screen-sm"
                            priority={true}
                            width={500}
                            height={500}/>
                    
                        <p>
                        Rounding the back corner of the house, the stairs down to your unit are in the bottom left of the photo.

                        Ample street parking is typically available on both sides of S 112th St. Please do not park in the driveway other than briefly for loading and unloading. Do not park on the grass under any circumstances, as a very expensive septic system is installed in the lawn.                        </p>

                        <Image src={entryImage.src} 
                            alt='Seattle Launchpad entry'
                            className="w-full max-w-screen-sm"
                            priority={true}
                            width={500}
                            height={500}/>

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
                        <Image src={lockImage.src} 
                            alt='Seattle Launchpad smart lock'
                            className="object-cover max-w-xs"
                            priority={true}
                            width={500}
                            height={500}/>

                    <h2>Useful Info</h2>
                        <h3>Wifi Info</h3>
                            <ul>
                                <li>Network: 2.4crabapples</li>
                                <li>Password: thxgiuseppe</li>
                            </ul>
                        <h3>Heating and Cooling</h3>
                            <p>
                            The home has central heating and cooling from a heat pump, which is controlled by a thermostat upstairs. If too much hot or cold air is entering the unit for your comfort, please try closing the vents in the rooms that you&apos;d like less air delivered to. If that doesn&apos;t work please contact your host as we can often adjust the thermostat to your liking. Finally, space heaters are provided so guests can add heating to the space if they get cold. Please use these on medium or low and only while you&apos;re in the same room.
                            </p>
                        <h3>Safety</h3>
                        <p>The home is equipped with smoke and CO detectors. Under the kitchen sink you&apos;ll find a fire 
                            extinguisher. Please take a moment to familiarize yourself with them as you settle in.
                        </p>
                        <h3>Smart TV and Accounts</h3>
                            <p>A smart TV in the living room is available to guests. An Amazon Prime Video account and 
                                a Netflix account are linked and an antenna is connected for local broadcast TV. Guests 
                                wishing to watch other streaming services are free to log in with their own accounts.
                            </p>
                        <h3>Laundry</h3>
                            <p>
                            Laundry is available via the common laundry room attached to the living and dining area. Please be sure to turn the laundry room vent on while doing laundry. When done with the washing machine please open the washer door and the detergent drawer so they can dry out.
                            </p>
                    
                    <h2>House Rules</h2>
                        <h3>Quiet Hours</h3>
                        <p>
                            Please observe quiet hours from 10:30 PM to 8 AM every night of the week. The home is 
                            older and sound travels fairly well, which makes it ideal for groups looking to relax 
                            quietly or sleep once quiet hours begin. The tenants upstairs are young professionals 
                            and are in bed shortly after quiet hours begin. Once quiet hours begin only those 
                            guests listed on the reservation are allowed in the unit.
                        </p>
                        <h3>Sanitary Products</h3>
                        <p>Please do not flush anything other than toilet paper and human waste down the toilet. 
                            Do not flush sanitary items or baby wipes in the toilet, even if they&apos;re 
                            advertised as flushable. This property is on a septic system, rather than municipal
                            sewer, and anything flushed besides toilet paper and human waste can damage the 
                            system. Guests who violate this rule may be liable for damage to the septic system.</p>
                        <h3>Shower Hair Catcher</h3>
                        <p>A hair catcher is installed on the shower drain to keep it flowing well for you. Please 
                            do not remove the hair catcher. It will be cleaned and sanitized before your visit, 
                            simply remove the hair and replace the hair catcher if it becomes clogged during your stay.
                        </p>
                        <h3>Cooking</h3>
                        <p>When cooking please always use the vent above the stove. As it&apos;s heated modern cookware 
                            produces particulates that may be harmful to your lungs. Warm, moist air from cooking 
                            can also cause paint to blister and mold to form. Using the vent during cooking is a simple 
                            and effective way to protect human health as well as property.
                            </p>
                        <h3>Shoes</h3>
                        <p>Please remove your shoes when in the house. A shoe rack is provided near the entry door.</p>
                        <h3>Door Locks</h3>
                        <p>Please lock the door by pressing the lock icon on the smart lock upon leaving the unit.</p>
                        <h3>Laundry</h3>
                        <p>Detergent pods will be left out in a small wooden bowl for you to use during your stay. 
                            If you need more detergent please get in touch with your host. Please clean the dryer&apos;s lint
                            filter before each use, it can be found on the top of the dyer.</p>
                        <h3>Waste Disposal</h3>
                        <p>The kitchen trash can has seperate bins for trash and recycling. Please separate trash and 
                            recycling and bring bags to the street bins on the alley as needed. Additional kitchen bin 
                            liners are available under the kitchen sink. The street bins are color coded as follows:</p>
                        <ul>
                            <li>Black: non-recyclable or compostable waste</li>
                            <li>Blue: clean and dry recyclable waste (paper, plastic, glass, metal without residues or 
                                greases)</li>
                            <li>Green: industrially compostable waste (food scraps, paper products with food residue)</li>
                        {/* <img src={trashImage.src} alt="Trash cans at Sound Breeze"/> */}
                        </ul>
                        <h3>Smoking</h3>
                        <p>The property is non-smoking. If you wish to smoke, please do so at the alley in the back.</p>
                        <h3>Check In and Out Times</h3>
                        <p>Check-in begins at 3 PM on your arrival date and check-out is at 10 AM.</p>

                    {/* <h2>Getting Around the Area</h2>
                    <p>The Gatewood neighborhood provides some fantastic businesses and points of interest within 
                        walking distance. The Myrtle Street Reservoir Park is a great place to stretch your legs and 
                        the intersection of SW Willow Street and 38th Ave SW is a local favorite for watching incredible
                        sunsets over the Puget Sound. QED Coffee is a short walk to the Northeast and the Morgan Junction
                        to the West has a grocery store and a selction of bars, restaurants, and other businesses. </p>
                        <p>A bit further afield, Lincoln Park to the Southwest provides great trails, access to the Puget
                            Sound, and even some Redwoods and Giant Sequoias! The 21 bus is a great way to get into 
                            Downtown Seattle and has a stop about one block away, on 35th Ave SW and SW Holly St. The 128
                            bus will take you directly to the Alaska Junction, which is the heart of West Seattle. The stop
                            for the 128 bus is about two blocks away on Morgan and 35th Ave SW.
                        </p> */}

                    <h2>Checking Out</h2>
                    <p>We appreciate you choosing to book your stay with us and we want your stay to feel like vacation up 
                        to the very last minute. We ask that you leave the unit in a reasonably tidy condition and return 
                        any furnishings that were moved during the stay to their original position. Beyond that we don&apos;t 
                        require any chores for guests checking out. </p>
                    <p>If you return to the area again we&apos;d love to earn your repeat business! Repeat guests can book directly 
                        with us for significant discounts to sites like Airbnb and Vrbo. Please click the link below to check 
                        availability at our properties for your next visit!</p>
                    <a href="https://emeraldcitystays.com">emeraldcitystays.com</a>
            </article>
        </div>
      </main>
    </>
  );
}