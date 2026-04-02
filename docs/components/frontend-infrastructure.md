# Frontend Infrastructure

## Overview

The frontend uses Next.js App Router with a mix of server and client components, Tailwind CSS with DaisyUI for styling, and several third-party integrations for analytics, toast notifications, and loading indicators.

## Files

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout (fonts, metadata, providers, analytics) |
| `app/providers.tsx` | NextAuth SessionProvider wrapper |
| `app/globals.css` | Global styles (Tailwind directives) |
| `app/error.tsx` | Root error boundary |
| `app/not-found.tsx` | 404 page |
| `components/Header.tsx` | Responsive header with nav links |
| `components/Footer.tsx` | Site footer with links |
| `components/Hero.tsx` | Landing page hero section |
| `components/LayoutClient.tsx` | Client-side wrappers (Crisp, Toaster, Tooltip) |
| `components/Modal.tsx` | Reusable modal component |

## Root Layout

The root layout (`app/layout.tsx`) sets up:
- Inter font from Google Fonts
- HTML `lang="en"` and DaisyUI theme via `data-theme`
- `<Providers>` wrapper (SessionProvider)
- `NextTopLoader` progress bar
- `react-hot-toast` Toaster
- Vercel Analytics + Speed Insights

Note: `LayoutClient.tsx` exists and provides similar functionality (NextTopLoader, Toaster, Tooltip, Crisp) but appears to not be used in the root layout. The root layout directly includes NextTopLoader and Toaster, making LayoutClient partially redundant.

## Header Component

### Behavior
- Sticky header that hides on scroll-down and shows on scroll-up
- Responsive: full nav on desktop, hamburger menu on mobile
- Links: Properties, House Manuals, Blog, FAQ
- CTA: "Check Availability" button (scrolls to properties section)

### Issues
- **`useScrollDirection` hook defined inside the component body** — a new function is created on every render. This should be extracted to a separate file (`hooks/useScrollDirection.ts`).
- **Scroll direction state uses `null` initial value** — the comment notes Q suggested `useState("up")` which would be better for the initial render (avoids a flash where the header position is indeterminate).
- **Mobile menu close relies on `searchParams` change** — the TODO comment acknowledges this doesn't always work ("stale urls due to scroll-away causing mobile menu not to close").
- **No focus trap in mobile menu** — when the mobile menu is open, keyboard users can tab to elements behind the overlay.

## Footer Component

- Links to Pricing (`/#pricing`) and Affiliates (`/#`) — both are boilerplate links that don't lead anywhere meaningful on this site.
- Support email link works correctly (pulls from config).
- Blog, TOS, and Privacy Policy links are functional.

## Error Handling

- `app/error.tsx` provides a root error boundary with refresh, support, and home buttons.
- `app/not-found.tsx` provides a 404 page.
- No per-route error boundaries exist — a failure in any page falls through to the root boundary.
- The error boundary displays `error?.message` directly to the user, which could expose internal details.

## Analytics

Two analytics systems are active:
- **Vercel Analytics** (`@vercel/analytics`) — page views and web vitals
- **Plausible** (`next-plausible`) — privacy-focused analytics

Both are loaded in the root layout. Having two analytics systems is redundant unless they serve different purposes (e.g., Plausible for public dashboard, Vercel for developer metrics).

## Styling

- Tailwind CSS with DaisyUI component library
- Custom theme `"mybrand"` referenced in several components via `data-theme="mybrand"` but the theme definition would be in `tailwind.config.js`
- The root layout uses `data-theme="light"` (from config) while individual components override with `data-theme="mybrand"` — this creates a theme hierarchy that could cause inconsistencies

## LayoutClient (Unused?)

`components/LayoutClient.tsx` contains:
- NextTopLoader (duplicated in root layout)
- Toaster (duplicated in root layout)
- Tooltip setup
- CrispChat component (uses Supabase auth to identify users — dead code since Crisp ID is empty and auth is NextAuth)

This component appears to be the original ShipFast client layout that was replaced by the simpler setup in `app/layout.tsx` + `app/providers.tsx`. The CrispChat component inside it still calls `supabase.auth.getSession()` which is a Supabase auth call that doesn't work with the NextAuth setup.

**Recommendation:** Delete `LayoutClient.tsx` if it's not imported anywhere.

## Improvement Opportunities

1. Extract `useScrollDirection` to its own hook file
2. Remove or update boilerplate footer links (Pricing, Affiliates)
3. Delete `LayoutClient.tsx` if unused
4. Add focus trap to mobile menu for accessibility
5. Sanitize error messages before displaying to users
6. Consider consolidating analytics (Vercel + Plausible)
7. Resolve theme inconsistency (`"light"` vs `"mybrand"`)
