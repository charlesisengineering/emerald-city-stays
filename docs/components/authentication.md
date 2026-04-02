# Authentication & Authorization

## Overview

The site uses NextAuth.js with Google OAuth to protect house manual pages. Authentication was added on top of the ShipFast boilerplate, which originally used Supabase Auth. The result is two auth systems coexisting — only NextAuth is actively used.

## Architecture

```
User → /signin → signIn("google") → Google OAuth
                                         ↓
                              /api/auth/[...nextauth]
                                         ↓
                              JWT cookie set (NextAuth)
                                         ↓
                    ┌────────────────────┴────────────────────┐
                    │                                         │
              Middleware                              Server Layouts
         (edge, token check)                    (getServerSession check)
         /dashboard/*, /manuals/*               manuals/layout, dashboard/layout
```

## Files

| File | Purpose | Status |
|------|---------|--------|
| `app/api/auth/[...nextauth]/route.ts` | NextAuth config with Google provider | Active |
| `app/signin/page.tsx` | Sign-in UI (Google button + magic link stub) | Active |
| `app/providers.tsx` | SessionProvider wrapper | Active |
| `middleware.ts` | Edge middleware protecting routes | Active |
| `app/manuals/layout.tsx` | Server-side auth check for manuals | Active |
| `app/dashboard/layout.tsx` | Server-side auth check for dashboard | Active |
| `types/next-auth.d.ts` | Session type augmentation | Active |
| `app/api/auth/callback/route.ts` | Supabase auth callback | **Dead code** |
| `app/api/auth-test/route.ts` | Debug endpoint for env var checks | Debug tool |

## How It Works

### NextAuth Configuration
- Single provider: Google OAuth
- Scopes: `userinfo.email`, `userinfo.profile`
- JWT strategy (no database adapter)
- Custom pages: sign-in at `/signin`, errors redirect to `/signin`
- Callback URL after login: `/manuals` (configured in `config.ts`)

### Session Data
The JWT callback persists `accessToken` and user `id`. The session callback exposes:
- `session.user.id` (from `token.sub`)
- `session.user.email` (default from NextAuth)
- `session.user.name` (default from NextAuth)
- `session.accessToken` (Google OAuth token)

### Route Protection (Two Layers)
1. **Middleware** (`middleware.ts`): Runs at the edge, checks for a valid NextAuth token. Protects `/dashboard/*` and `/manuals/*`.
2. **Server layouts**: Both `manuals/layout.tsx` and `dashboard/layout.tsx` call `getServerSession()` and redirect to `/signin` if no session exists.

This double-layer is redundant but harmless — the middleware catches unauthenticated requests before they hit the layout.

## Issues

### Security
- **`debug: true` is enabled** in the NextAuth config. This logs sensitive token and session data. Must be disabled in production.
- **No NEXTAUTH_SECRET validation** — if the env var is missing, NextAuth will use an insecure default in development and fail silently in production.

### Dead Code
- **`/api/auth/callback/route.ts`** uses `createRouteHandlerClient` from Supabase to exchange an auth code for a Supabase session. This has nothing to do with the NextAuth flow and is never hit by the Google OAuth redirect. Should be removed.
- **`/api/auth-test/route.ts`** exposes whether env vars are set. Low risk (doesn't leak values), but shouldn't ship to production.

### Sign-In Page
- The magic link form is present in the UI but the handler just shows a toast saying "not implemented yet." This is confusing for users — either implement it or remove the form.
- Error handling catches errors but only logs to console; the toast for errors is generic.

### Redirect Callback
The redirect callback in NextAuth has a subtle issue: any relative URL (starting with `/`) always redirects to `config.auth.callbackUrl` (`/manuals`), ignoring the original destination. This means if a user tries to access `/dashboard` while logged out, they'll be redirected to sign in and then land on `/manuals` instead of `/dashboard`.

## Improvement Opportunities

1. Set `debug: false` (or `debug: process.env.NODE_ENV === 'development'`)
2. Delete `/api/auth/callback/route.ts`
3. Delete or gate `/api/auth-test/route.ts` behind a dev-only check
4. Remove the magic link form from the sign-in page (or implement it)
5. Fix the redirect callback to preserve the original destination URL
6. Add NEXTAUTH_SECRET validation at startup
