# Property Pages & Listings

## Overview

Each of the three rental properties has a public listing page under `/listings/`. These pages use a shared `PropertyPage` component that renders a photo slideshow, booking widget iframe, amenities, neighborhood info, a Google Map, and house rules.

## Files

| File | Purpose |
|------|---------|
| `app/listings/songbird-suite/page.tsx` | Songbird Suite listing |
| `app/listings/seattle-launchpad/page.tsx` | Seattle Launchpad listing |
| `app/listings/sound-breeze/page.tsx` | Sound Breeze listing |
| `components/PropertyPage.tsx` | Shared property detail layout |
| `components/PictureSlideshow.tsx` | Image carousel (react-slick) |
| `components/PropertyCard.tsx` | Card component for property grids |
| `components/Properties.tsx` | Grid of PropertyCards + optional search widget |
| `components/Map.tsx` | Google Maps embed |
| `types/userTypes.ts` | Type definitions for all property-related props |

## Architecture

Each listing page is a thin wrapper that assembles property-specific data (images, amenities, coordinates, description, booking widget URL) and passes it to `PropertyPage`:

```
/listings/songbird-suite/page.tsx
  → imports images from /app/SongbirdPhotos/
  → defines amenities, coordinates, descriptions as local constants
  → renders <PropertyPage {...props} />
```

### PropertyPage Layout
```
┌─────────────────────────────────────────┐
│              Property Name               │
│            Property Description           │
├────────────────────┬────────────────────┤
│  PictureSlideshow  │  Booking iframe    │
│  (2/3 width)       │  (1/3 width)       │
├────────────────────┴────────────────────┤
│  About the Property  │  Amenities       │
│                      │  (collapsible)    │
├──────────────────────┴──────────────────┤
│  Neighborhood + Map  │  House Rules     │
└─────────────────────────────────────────┘
```

## Data Flow

All property data is hardcoded in each listing page file. There's no CMS, database, or API involved. Images are statically imported from folders under `/app/`.

The booking widget is an iframe pointing to Hospitable (`booking.hospitable.com/widget/...`). The `PropertyPage` component reads URL query params (checkin, checkout, adults, children, infants, pets) and appends them to the iframe src on mount.

## Issues

### Code Quality
- **`useEffect` without dependency array** in `PropertyPage.tsx` — `updateIframeSrc()` runs on every render, repeatedly appending query params to the iframe URL. Should have `[]` as the dependency array.
- **Direct DOM manipulation** — `updateIframeSrc` uses `document.getElementById` and manually mutates `iframe.src`. This works but bypasses React's rendering model. A ref-based approach would be cleaner.
- **House Rules section is lorem ipsum** — the "House Rules" and the paragraph below it in `PropertyPage.tsx` are placeholder text that's shipping to production.

### Component Design
- **`PropertyPage` is `'use client'`** — the entire component is client-side because of `useEffect` and the slideshow. The static content (amenities, descriptions) could be server-rendered with only the interactive parts (slideshow, iframe) as client components.
- **Amenity categories are hardcoded in the component** — the accordion sections (Basic, Kitchen, Bathroom, Bedroom, Additional) are hardcoded in `PropertyPage.tsx`. If a property has different categories, the component can't accommodate it.
- **No loading state for the booking iframe** — the iframe loads silently; users see a blank space until Hospitable responds.

### PictureSlideshow
- Has a known visual bug noted in a TODO comment: "the extreme right side of pictures shows overlap of the next image in the carousel"
- Alt text is generic (`Slide 1`, `Slide 2`) — should describe the room/area shown
- Uses `react-slick` which is a jQuery-era library. Works fine but is heavy for what it does.

### Map Component
- **`useEffect` with empty dependency array** — correct, but the `latitude` and `longitude` props should be in the dependency array in case they change.
- **No error handling** — if the Google Maps API key is missing or invalid, the component fails silently.
- **No loading state** — the map div is empty until the API loads.

### PropertyCard
- Badge content (4 guests, 2 bedrooms, 1 king bed, etc.) is hardcoded in the component, not passed as props. The `primaryBadgeHidden` and `secondaryBadgesHidden` props just hide them. All three properties currently hide all badges.
- The hidden badges still render in the DOM (just with `hidden` class).

### Properties Component
- **Hook violation** — `buildSearchWidget` is called conditionally inside the component body (`if (showHospitableSearchWidget)`). React hooks must be called unconditionally. This can cause bugs and will fail React's hook rules linter.

## Improvement Opportunities

1. Add `[]` dependency array to `useEffect` in PropertyPage
2. Replace lorem ipsum House Rules with real content
3. Fix the conditional hook call in Properties component
4. Make PropertyCard badges data-driven (pass as props)
5. Add loading states for iframe and map
6. Improve slideshow alt text with descriptive labels
7. Consider extracting property data into a shared data file or simple CMS
