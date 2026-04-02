# House Manuals

## Overview

House manuals are auth-protected pages that provide guests with property-specific information: directions, check-in instructions, WiFi credentials, house rules, and checkout procedures. They're gated behind Google OAuth so only booked guests (who receive a login link) can access them.

## Files

| File | Purpose |
|------|---------|
| `app/manuals/page.tsx` | Manual index — shows PropertyCards linking to each manual |
| `app/manuals/layout.tsx` | Auth-protected layout (server-side session check) |
| `app/manuals/launchpad/page.tsx` | Seattle Launchpad manual |
| `app/manuals/songbird/page.tsx` | Songbird Suite manual |
| `app/manuals/sound-breeze/page.tsx` | Sound Breeze manual |

## Architecture

```
/manuals (layout.tsx — auth gate)
  ├── /manuals (page.tsx — property card grid)
  ├── /manuals/launchpad (page.tsx — full manual)
  ├── /manuals/songbird (page.tsx — full manual)
  └── /manuals/sound-breeze (page.tsx — full manual)
```

The layout checks `getServerSession()` and redirects to `/signin` if unauthenticated. The middleware also protects `/manuals/*` at the edge. The index page reuses the `Properties` component to display cards linking to each manual.

## Content Structure (per manual)

Each manual page is a long-form article with:
1. Getting Here (address, parking instructions, photos)
2. Checking In (smart lock instructions, photos)
3. Useful Info (WiFi, heating/cooling, smart TV, laundry)
4. House Rules (quiet hours, sanitary products, cooking, shoes, waste disposal, smoking)
5. Checking Out (expectations, repeat booking CTA)

## Issues

### Security — Hardcoded Credentials
The Launchpad manual contains hardcoded WiFi credentials in the JSX:
```
Network: 2.4crabapples
Password: thxgiuseppe
```

These are committed to git and visible in the source code. Even though the page is auth-protected, the credentials are in the repository history permanently. Other manual pages likely have similar issues.

**Recommendation:** Move WiFi credentials to environment variables or a simple key-value store. Render them server-side so they never appear in client-side JavaScript bundles.

### Content Management
- All manual content is hardcoded JSX. Any text change requires a code deployment.
- Photos are statically imported from folders under `/app/` (e.g., `LaunchpadPhotos/`).
- There's no way for a non-developer to update manual content.

**Recommendation:** For a site with three properties, a full CMS may be overkill. Consider a simpler approach like a JSON/YAML data file per property, or Markdown files that get rendered at build time.

### Code Quality
- Manual pages are large single-file components with all content inline. The Launchpad manual is ~200 lines of JSX.
- Image handling uses `Image` component from Next.js but with hardcoded `width={500} height={500}` that may not match actual image dimensions.
- Some images use `priority={true}` on every image, which defeats the purpose of priority loading (it should only be set on above-the-fold images).

### Access Control
- Currently any Google account can sign in and access manuals. There's no allowlist or role-based check.
- The auth flow doesn't verify that the signed-in user is actually a guest with a booking.

**Recommendation:** Consider adding an email allowlist (even a simple array in env vars) or integrating with Hospitable's API to verify active bookings.

## Improvement Opportunities

1. Move WiFi credentials out of source code
2. Add guest email allowlisting or booking verification
3. Extract manual content from JSX into data files
4. Fix image priority attributes (only above-the-fold images)
5. Consider a lightweight content management approach for non-developer updates
