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
    propertyCoordinates: MapCoordinates;
    neighborhoodDescription: string;
    carouselImages: StaticImageData[]; // An array of all images to live in the carousel 
    bookingWidget: string; // url for the booking widget, goes into the src of the iframe
}

export interface MapCoordinates {
    latitude: number;
    longitude: number;
}

export type listingCardProps = {
    songbirdLink: string;
    soundBreezeLink: string;
    launchpadLink: string;
    headlineText: string;
    taglineText: string;
    showHospitableSearchWidget?: boolean;
}

export interface PropertyCardProps {
    href: string;
    title: string;
    description: string;
    imageSrc: StaticImageData;
    primaryBadgeHidden?: boolean;
    secondaryBadgesHidden?: boolean;
}

export interface searchWidgetProps{
    widgetElement: string;
    searchAttribute?: string;
}