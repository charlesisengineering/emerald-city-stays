# API Routes

## Overview

The app has several API routes, most inherited from the ShipFast boilerplate. Only the auth routes are actively used by the rental site. The Stripe, lead capture, and Mailgun routes are either dead code or minimally used.

## Route Inventory

| Route | Method | Auth | Status |
|-------|--------|------|--------|
| `/api/auth/[...nextauth]` | GET, POST | Public | **Active** — NextAuth handler |
| `/api/auth/callback` | GET | Public | **Dead code** — Supabase auth callback |
| `/api/auth-test` | GET | Public | **Debug** — env var checker |
| `/api/lead` | POST | Public | **Unclear** — lead capture to Supabase |
| `/api/webhook/stripe` | POST | Webhook sig | **Dead code** — no payments active |
| `/api/webhook/mailgun` | POST | **None** | **Unclear** — email forwarding |
| `/api/stripe/create-checkout` | POST | Supabase auth | **Dead code** — checkout creation |
| `/api/stripe/create-portal` | POST | Supabase auth | **Dead code** — customer portal |

## Active Routes

### `/api/auth/[...nextauth]`
The NextAuth catch-all handler. Configures Google OAuth, JWT callbacks, session enrichment, and redirect logic. This is the core of the auth system.

See [Authentication](./authentication.md) for detailed analysis.

## Dead Code Routes

### `/api/auth/callback`
A Supabase auth callback that exchanges an authorization code for a Supabase session. This is never hit by the NextAuth/Google OAuth flow. The NextAuth handler manages its own callbacks internally.

**Recommendation:** Delete this file.

### `/api/stripe/create-checkout`
Creates a Stripe Checkout session. Uses Supabase auth (`createRouteHandlerClient`) to verify the user is logged in — but the site uses NextAuth, not Supabase auth. The session check would always fail for real users.

Also:
- Doesn't validate that `priceId` matches an allowed plan from config
- The `successUrl` and `cancelUrl` are passed from the client without validation (open redirect risk)
- Production price IDs in config are all `"price_456"` (placeholder)

**Recommendation:** Delete this file and the associated `libs/stripe.ts`.

### `/api/stripe/create-portal`
Creates a Stripe Customer Portal session. Same Supabase auth issue as checkout.

**Recommendation:** Delete this file.

### `/api/webhook/stripe`
Handles Stripe webhook events (checkout completed, subscription changes, invoice payments). Initializes both a Stripe client and a Supabase admin client using `SUPABASE_SERVICE_ROLE_KEY`.

Issues:
- The `SUPABASE_SERVICE_ROLE_KEY` bypasses Supabase RLS — this is the most privileged key
- No idempotency handling (same webhook event could be processed twice)
- Error handling catches but doesn't re-throw, so Stripe won't retry failed events

**Recommendation:** Delete this file. If payments are added later, rebuild against NextAuth.

## Questionable Routes

### `/api/lead`
Accepts a POST with an email address and inserts it into a Supabase `leads` table. Uses `createRouteHandlerClient` (Supabase auth helpers) but doesn't actually check authentication — it's a public endpoint.

Issues:
- No rate limiting — vulnerable to spam/abuse
- No email format validation (only checks `!body.email`)
- No duplicate checking
- No CAPTCHA or bot protection
- Zod is installed but not used for validation

**Recommendation:** If lead capture is needed, add rate limiting, email validation, and bot protection. If not needed, delete it.

### `/api/webhook/mailgun`
Receives inbound emails from Mailgun and forwards them to the admin email.

Issues:
- **No webhook signature verification** — anyone can POST to this endpoint and trigger emails to the admin. Mailgun provides HMAC signature verification that should be implemented.
- No rate limiting
- The forwarded email HTML is inserted directly into the outbound email without sanitization (XSS risk if the admin email client renders HTML)

**Recommendation:** Add Mailgun signature verification. If email forwarding isn't being used, delete it.

### `/api/auth-test`
Returns a JSON object indicating whether key env vars are set (without revealing their values). Low risk but shouldn't be accessible in production.

**Recommendation:** Gate behind `process.env.NODE_ENV === 'development'` or delete.

## Shared Libraries Used by Routes

| Library | Used By | Status |
|---------|---------|--------|
| `libs/stripe.ts` | Stripe routes | Dead code |
| `libs/mailgun.ts` | Mailgun webhook | Possibly active |
| `libs/api.ts` | Frontend API client | Boilerplate (Supabase-oriented error handling) |
| `libs/gpt.ts` | Nothing | Dead code |

## Improvement Opportunities

1. Delete all Stripe-related routes and `libs/stripe.ts`
2. Delete `/api/auth/callback` (Supabase auth callback)
3. Delete `libs/gpt.ts`
4. Add Mailgun webhook signature verification (or delete the route)
5. Add rate limiting and validation to `/api/lead` (or delete it)
6. Gate `/api/auth-test` to development only
