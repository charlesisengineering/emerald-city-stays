# Configuration & Boilerplate

## Overview

The app's central configuration lives in `config.ts`, which was inherited from ShipFast and partially customized. Many values are still boilerplate defaults. TypeScript and ESLint configurations are permissive, reducing the safety benefits of the tooling.

## Files

| File | Purpose |
|------|---------|
| `config.ts` | Central app configuration |
| `types/config.ts` | ConfigProps type definition |
| `tsconfig.json` | TypeScript compiler options |
| `.eslintrc.json` | ESLint rules |
| `next.config.js` | Next.js configuration |
| `package.json` | Dependencies and scripts |

## config.ts — What's Customized vs. Boilerplate

### Customized (your values)
- `appName`: "Emerald City Stays"
- `appDescription`: Seattle short term rentals description
- `domainName`: "emeraldcitystays.com"
- `mailgun.fromAdmin`: Your email
- `mailgun.supportEmail`: Your email
- `mailgun.forwardRepliesTo`: Your email
- `colors.main`: "#016411"
- `auth.callbackUrl`: "/manuals"

### Still Boilerplate
- `mailgun.fromNoReply`: `ShipFast <noreply@mg.shipfa.st>` — still points to ShipFast's domain
- `stripe.plans`: Two plans with boilerplate feature names ("NextJS boilerplate", "User oauth", "Database", "Emails")
- `stripe.plans[*].priceId` (production): Both set to `"price_456"` — placeholder
- `aws.bucket`: "bucket-name" — placeholder
- `aws.bucketUrl`: placeholder S3 URL
- `aws.cdn`: placeholder CloudFront URL
- `crisp.id`: empty string (Crisp is effectively disabled)

## TypeScript Configuration

`tsconfig.json` has `"strict": false` which disables:
- `strictNullChecks` — won't catch null/undefined access
- `strictFunctionTypes` — won't catch function signature mismatches
- `strictBindCallApply` — won't validate bind/call/apply
- `strictPropertyInitialization` — won't catch uninitialized class properties
- `noImplicitThis` — won't catch ambiguous `this`
- `alwaysStrict` — won't enforce strict mode in emitted JS

`noImplicitAny: true` is enabled, which is good — it catches untyped variables.

**Recommendation:** Enable `"strict": true`. This will surface real bugs. Expect some initial type errors to fix, but it's worth it.

## ESLint Configuration

```json
{
  "rules": {
    "no-unused-vars": "warn",
    "no-undef": "off"
  }
}
```

`"no-undef": "off"` disables checks for undefined variables. Combined with `strict: false` in TypeScript, this means typos in variable names may not be caught by either tool.

**Recommendation:** Re-enable `"no-undef"` or rely on TypeScript's own checks with strict mode enabled.

## next.config.js

Minimal configuration:
- `reactStrictMode: true` — good
- `images.domains` — uses the deprecated `domains` array instead of `remotePatterns`
- No security headers configured
- No redirects or rewrites
- No webpack customization

### Missing Security Headers
The following should be added via `headers()` in next.config.js:
- `Content-Security-Policy` — prevents XSS
- `X-Frame-Options` — prevents clickjacking
- `X-Content-Type-Options` — prevents MIME sniffing
- `Referrer-Policy` — controls referrer information
- `Permissions-Policy` — restricts browser features

## package.json — Dependency Audit

### Unused Dependencies
| Package | Reason |
|---------|--------|
| `@types/mongoose` | No MongoDB/Mongoose usage (Supabase is the DB) |
| `nodemailer` | Mailgun.js is used for email, not Nodemailer |
| `stripe` | No active payment processing |
| `crisp-sdk-web` | Crisp ID is empty; chat is disabled |
| `react-syntax-highlighter` | No code highlighting visible in the app |

### Outdated Patterns
- `eslint-config-next` version `13.4.19` with Next.js `^14.1.4` — version mismatch
- Stripe API version hardcoded to `"2023-08-16"` in multiple files

### Missing Dependencies
- No testing framework (no jest, vitest, or testing-library)
- No rate limiting library
- No input validation in use (Zod is installed but unused)

## SEO Configuration (libs/seo.tsx)

- Twitter creator is set to `@marc_louvion` (ShipFast author, not the site owner)
- Structured data schema type is `"Local Business"` but also has `applicationCategory: "EducationalApplication"` — contradictory
- `datePublished` is hardcoded to `"2024-08-24"`
- OpenGraph and Twitter card descriptions fall back to generic app description

## Improvement Opportunities

1. Enable `"strict": true` in tsconfig.json
2. Clean up boilerplate values in config.ts (fromNoReply, Stripe plans, AWS placeholders)
3. Add security headers in next.config.js
4. Migrate `images.domains` to `images.remotePatterns`
5. Remove unused dependencies
6. Fix SEO metadata (Twitter creator, structured data schema)
7. Add Zod validation to API routes
8. Re-enable `"no-undef"` in ESLint
