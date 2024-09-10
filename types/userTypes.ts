import { StaticImageData } from 'next/image';

export type amenitiesList = {
    basicAmenities: string[];
    kitchenAndDining: string[];
    bathroom: string[];
    bedroom: string[];
    additional: string[];
  }

export interface PropertyPageProps {
    propertyName: string;
    propertyDescription: string;
    propertyProse: string;
    propertyAmenities: amenitiesList;
    neighborhoodDescription: string;
    carouselImages: StaticImageData[]; // An array of all images to live in the carousel 
    bookingWidget: string; // url for the booking widget, goes into the src of the iframe
  }

export type listingCardProps = {
    songbirdLink: string;
    soundBreezeLink: string;
    launchpadLink: string;
    headlineText: string;
    taglineText: string;
}