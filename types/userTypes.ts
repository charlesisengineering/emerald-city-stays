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

// A single guest review, normalized from the Hospitable API into just the
// PUBLIC fields we're allowed to render. See libs/reviews.ts.
// NOTE: the API also returns a `private` object (guest feedback + detailed
// ratings) which is confidential and must never be surfaced — it is dropped
// during normalization and intentionally has no home on this type.
export interface Review {
    id: string;
    rating: number;          // public.rating — overall, 1–5
    text: string;            // public.review — the public review body
    response: string | null; // public.response — host's public reply, if any
    channel: string;         // top-level `platform` (airbnb, vrbo, etc.)
    reviewedAt: string;      // top-level `reviewed_at` (ISO date string)
    propertyId?: string;     // Hospitable property UUID this review belongs to
}