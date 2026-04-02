# Emerald City Stays — Architecture Overview

## What This Is

A Next.js 14 website for a Seattle short-term rental business operating three properties: Sound Breeze (West Seattle), Songbird Suite (Maple Leaf), and Seattle Launchpad (near SeaTac). The site was bootstrapped from the [ShipFast](https://shipfa.st) SaaS boilerplate and customized for the rental use case.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict mode disabled) |
| Styling | Tailwind CSS + DaisyUI |
| Auth | NextAuth.js with Google OAuth |
| Database | Supabase (used by boilerplate routes, not by core rental features) |
| Booking | Hospitable embedded widgets (iframes + JS SDK) |
| Maps | Google Maps JavaScript API |
| Email | Mailgun |
| Analytics | Vercel Analytics + Plausible |
| Hosting | Vercel (inferred from dependencies) |

## High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Next.js App Router                │
├──────────┬──────────┬───────────┬───────────────────┤
│  Public  │ Listings │  Manuals  │    API Routes     │
│  Pages   │  Pages   │ (Authed)  │                   │
│          │          │           │  /api/auth/*      │
│  /       │ /listings│ /manuals  │  /api/lead        │
│  /blog   │  /sound- │  /launch- │  /api/webhook/*   │
│  /search │  breeze  │  pad      │  /api/stripe/*    │
│  /signin │  /song-  │  /song-   │  /api/auth-test   │
│  /tos    │  bird    │  bird     │                   │
│  /privacy│  /launch-│  /sound-  │                   │
│          │  pad     │  breeze   │                   │
├──────────┴──────────┴───────────┴───────────────────┤
│              Middleware (NextAuth)                    │
│         Protects: /dashboard/*, /manuals/*           │
├─────────────────────────────────────────────────────┤
│  External Services                                   │
│  ┌───────────┐ ┌───────────┐ ┌────────────────────┐ │
│  │  Google   │ │ Hospitable│ │  Supabase (legacy) │ │
│  │  OAuth    │ │ Booking   │ │  Mailgun, Stripe   │ │
│  │  Maps API │ │ Widgets   │ │  (boilerplate)     │ │
│  └───────────┘ └───────────┘ └────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

## Key Directories

```
app/
├── api/                  # API routes (auth, webhooks, lead capture)
├── listings/             # Public property detail pages (3 properties)
├── manuals/              # Auth-protected house manuals (3 properties)
├── search/               # Hospitable search widget page
├── signin/               # Google OAuth sign-in page
├── dashboard/            # User profile page (minimal)
├── blog/                 # Blog with MDX support
components/               # Shared UI components
libs/                     # Service integrations (Stripe, Mailgun, Hospitable, SEO, API client, GPT)
types/                    # TypeScript type definitions
config.ts                 # Central app configuration
middleware.ts             # NextAuth route protection
```

## What's Actually Used vs. Boilerplate

### Actively Used
- Google OAuth + NextAuth (protects manuals)
- Hospitable booking widgets (search + per-property iframes)
- Google Maps (property pages)
- Property listing pages and house manual pages
- Landing page with property cards
- Mailgun (email forwarding)
- Vercel Analytics + Plausible
- SEO/structured data

### Boilerplate (Unused / Dead Code)
- **Stripe checkout + webhooks** — no payment processing active; placeholder price IDs
- **Supabase auth callback** (`/api/auth/callback`) — leftover from ShipFast; NextAuth handles auth
- **Supabase auth in LayoutClient** — CrispChat component calls `supabase.auth.getSession()`
- **GPT lib** (`libs/gpt.ts`) — OpenAI integration, never called
- **API client** (`libs/api.ts`) — Axios wrapper with Supabase-oriented error handling
- **Lead capture** (`/api/lead`) — stores emails in Supabase `leads` table; unclear if active
- **Pricing component** — SaaS pricing plans with boilerplate features
- **Blog content** — appears to be ShipFast sample content
- **Crisp chat** — configured but ID is empty string
- **AWS S3/CloudFront config** — placeholder values

## Cross-Cutting Concerns

### Authentication Flow
1. User clicks sign-in → `/signin` page → `signIn("google")` via NextAuth
2. Google OAuth consent → NextAuth callback at `/api/auth/[...nextauth]`
3. JWT stored in cookie, session available via `useSession()` (client) or `getServerSession()` (server)
4. Middleware blocks unauthenticated access to `/dashboard/*` and `/manuals/*`
5. Manual layouts perform a second server-side `getServerSession()` check and redirect

### Booking Flow
1. Landing page and property pages embed Hospitable widgets via iframe
2. Search page loads Hospitable JS SDK to render a search widget
3. Property pages read URL query params (checkin, checkout, guests) and inject them into the booking iframe URL
4. All booking/payment is handled by Hospitable — the site itself processes no payments

## Component-Level Documentation

See the following companion docs for detailed analysis of each subsystem:

- [Authentication & Authorization](./components/authentication.md)
- [Property Pages & Listings](./components/property-pages.md)
- [House Manuals](./components/house-manuals.md)
- [Search & Booking Integration](./components/search-booking.md)
- [API Routes](./components/api-routes.md)
- [Configuration & Boilerplate](./components/configuration.md)
- [Frontend Infrastructure](./components/frontend-infrastructure.md)

## Priority Improvements

These are ordered by impact and urgency. Detailed rationale is in the component docs.

### Immediate (Security)
1. Disable `debug: true` in NextAuth config
2. Remove hardcoded WiFi credentials from manual pages; move to env vars or CMS
3. Add webhook signature verification to Mailgun route
4. Remove dead Stripe/Supabase auth routes (reduce attack surface)

### High Priority (Code Health)
5. Enable `"strict": true` in tsconfig.json
6. Fix `useEffect` missing dependency arrays (PropertyPage, hospitable.ts)
7. Extract `useScrollDirection` hook out of Header component body
8. Clean up all ShipFast boilerplate that isn't being used
9. Fix the `buildSearchWidget` hook violation (called conditionally in Properties)

### Medium Priority (Quality)
10. Replace lorem ipsum House Rules in PropertyPage with real content
11. Update `images.domains` to `images.remotePatterns` (deprecated in Next.js 14)
12. Add security headers (CSP, X-Frame-Options, etc.) in next.config.js
13. Add input validation with Zod (already installed, unused)
14. Fix SEO metadata (Twitter creator still set to ShipFast author)

### Low Priority (Nice to Have)
15. Add tests (none exist currently)
16. Add rate limiting to public API endpoints
17. Consolidate type definitions (some inline, some in types/)
18. Add proper error boundaries per route segment
19. Remove unused dependencies (@types/mongoose, nodemailer if unused)
