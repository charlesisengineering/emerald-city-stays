# Search & Booking Integration

## Overview

Booking is handled entirely by Hospitable, a third-party property management platform. The site integrates Hospitable in two ways: a search widget on the landing/search pages, and per-property booking iframes on listing pages. The site itself processes no payments.

## Files

| File | Purpose |
|------|---------|
| `libs/hospitable.ts` | Builds and injects the Hospitable search widget |
| `app/search/page.tsx` | Dedicated search results page |
| `app/search/layout.tsx` | Search page layout |
| `components/Properties.tsx` | Optionally renders search widget above property cards |
| `components/PropertyPage.tsx` | Embeds per-property booking iframe |
| `components/ButtonCheckAvailability.tsx` | CTA button (scrolls to properties section) |

## Architecture

### Search Widget Flow
```
Landing page (/) or Search page (/search)
  → Properties component or SearchPage
    → buildSearchWidget() called
      → Creates <hospitable-direct-mps> config element
      → Loads hospitable-search-widget.prod.js from CDN
      → Widget renders in #hospitable-widget-container
      → User searches → redirected to /search with results
```

### Per-Property Booking Flow
```
Property listing page (/listings/songbird-suite)
  → PropertyPage component
    → Renders <iframe> pointing to booking.hospitable.com/widget/...
    → useEffect reads URL query params (checkin, checkout, guests)
    → Appends params to iframe src
    → User completes booking within Hospitable iframe
```

## Issues

### Critical: Hook Rules Violation in hospitable.ts
`buildSearchWidget` is a regular function that internally calls `useEffect`. This violates React's Rules of Hooks:
- Hook-calling functions must follow the `use` prefix convention
- It's called conditionally in `Properties.tsx` (`if (showHospitableSearchWidget)`)
- Conditional hook calls can cause React to lose track of hook state

```typescript
// Current (broken)
if (showHospitableSearchWidget) {
    buildSearchWidget(searchWidgetQueryProps);  // calls useEffect inside
}
```

**Fix:** Rename to `useSearchWidget`, make it a proper custom hook, and call it unconditionally (use the boolean to control behavior inside the hook).

### Missing useEffect Dependency Array
In `hospitable.ts`, the `useEffect` has no dependency array, meaning it runs on every render. This creates and destroys DOM elements (script tags, config elements) on every render cycle. Should have `[]` or `[inputProps.widgetElement]`.

### Hardcoded Hospitable Identifier
The Hospitable account identifier (`5fb3442b-ded2-4e6b-be42-0292dcd8042a`) is hardcoded in `hospitable.ts`. Should be an environment variable.

### External Script Loading
The Hospitable widget script is loaded by dynamically creating a `<script>` tag pointing to `hospitable.b-cdn.net`. This:
- Has no integrity hash (SRI) — if the CDN is compromised, arbitrary JS runs on your site
- Has no error handling — if the script fails to load, nothing happens
- Loads on every render due to the missing dependency array

### Search Page
- `buildSearchWidget` is called at the component level (outside of the return statement but inside the function body), which is technically valid but unusual and fragile.
- The `renderSchemaTags()` call on the search page renders the same generic schema as the landing page — it should either be customized or omitted.

### ButtonCheckAvailability
- The component is named `ButtonSignin` internally (the `const` name) but exported as the default from `ButtonCheckAvailability.tsx`. The JSDoc comment also describes it as a sign-in button. This is a copy-paste artifact from the boilerplate.
- It just scrolls to `/#properties` — it's an anchor link, not a real availability check.

## Improvement Opportunities

1. Fix the hook violation: rename `buildSearchWidget` to `useSearchWidget` and call unconditionally
2. Add `[]` dependency array to the useEffect in hospitable.ts
3. Move the Hospitable identifier to an environment variable
4. Add SRI hash or at minimum error handling for the external script
5. Fix the ButtonCheckAvailability naming confusion
6. Add a loading/skeleton state while the Hospitable widget initializes
