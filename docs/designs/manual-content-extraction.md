# Design: Extract Manual Content from JSX

## Problem

House manual content is currently hardcoded as JSX in three page components (`app/manuals/launchpad/page.tsx`, `app/manuals/songbird/page.tsx`, `app/manuals/sound-breeze/page.tsx`). This means:

- Any text change (WiFi password, house rule, neighborhood description) requires editing a React component and redeploying
- WiFi credentials are committed to git in plain text
- Shared content (checking in, checking out, many house rules) is duplicated across all three files with minor variations
- A non-developer cannot update manual content
- Adding a new property means copying ~150 lines of JSX and editing inline

## Current Content Structure

After comparing all three manuals, the sections break down as follows:

### Sections present in all three manuals
| Section | Shared or Per-Property |
|---------|----------------------|
| Getting Here | Per-property (address, directions, photos) |
| Checking In | Mostly shared (smart lock instructions), per-property photos |
| WiFi Info | Per-property (different networks/passwords) |
| Heating/Cooling | Per-property (different systems) |
| Safety | Mostly shared, minor per-property variation (fire blanket at Sound Breeze) |
| Smart TV | Shared |
| House Rules: Quiet Hours | Shared |
| House Rules: Sanitary Products | Per-property (Launchpad has septic system detail) |
| House Rules: Shower Hair Catcher | Shared |
| House Rules: Cooking | Per-property (vent location differs: "above the stove" vs "on the microwave") |
| House Rules: Shoes | Shared |
| House Rules: Door Locks | Shared |
| House Rules: Laundry | Per-property (different instructions) |
| House Rules: Waste Disposal | Mostly shared, per-property photo and bin location |
| House Rules: Smoking | Shared |
| House Rules: Check In/Out Times | Shared |
| Checking Out | Shared |

### Sections present in some manuals only
| Section | Properties |
|---------|-----------|
| Laundry (under Useful Info) | Launchpad, Songbird |
| Cell Phone Chargers | Sound Breeze only |
| Getting Around the Area | Sound Breeze only (commented out in others) |

## Proposed Approach: MDX + Frontmatter

Use MDX files with YAML frontmatter for structured data. MDX is the best fit because:
- The manuals are primarily long-form prose (natural for Markdown)
- Structured data (WiFi, address) fits cleanly in frontmatter
- `@mdx-js/loader` and `@next/mdx` are already installed
- MDX supports embedding React components (for images, maps, etc.)
- Content changes are just editing a `.md`-like file — no JSX knowledge needed

### Alternative Considered: JSON Data Files
Rejected because the manuals are 80% prose. Writing paragraphs of house rules in JSON strings would be painful to author and review in diffs. JSON works well for structured data (amenities lists, coordinates) but not for the bulk of manual content.

### Alternative Considered: Full CMS (Contentful, Sanity, etc.)
Overkill for three properties managed by one person. Adds external dependency, API latency, and cost. Could revisit if the business scales significantly.

## Proposed File Structure

```
content/
└── manuals/
    ├── _shared/
    │   ├── checking-in.mdx          # Smart lock instructions (shared)
    │   ├── checking-out.mdx         # Checkout instructions (shared)
    │   └── house-rules/
    │       ├── quiet-hours.mdx
    │       ├── shower-hair-catcher.mdx
    │       ├── shoes.mdx
    │       ├── door-locks.mdx
    │       ├── smoking.mdx
    │       └── check-in-out-times.mdx
    ├── launchpad.mdx
    ├── songbird.mdx
    └── sound-breeze.mdx
```

## MDX File Format

Each property manual file uses frontmatter for structured data and MDX body for prose:

```mdx
---
title: "Sound Breeze House Manual"
property: "sound-breeze"
address: "6725 36th Ave SW, Seattle"
wifi:
  network: "${SOUND_BREEZE_WIFI_NETWORK}"
  password: "${SOUND_BREEZE_WIFI_PASSWORD}"
checkIn: "3 PM"
checkOut: "10 AM"
images:
  parking:
    src: "rear.jpg"
    alt: "View of Sound Breeze from alley"
  entry:
    src: "entry_door.jpg"
    alt: "Entry Door"
  lock:
    src: "lock.jpg"
    alt: "Sound Breeze smart lock"
  trash:
    src: "trash.jpeg"
    alt: "Trash cans at Sound Breeze"
---

## Getting Here

Your vacation rental is located on the South side of {frontmatter.address}. Access to
the rental is via the paved alley between 36th Ave SW and 37th Ave SW...

<ManualImage name="parking" />

Head around the right side of the house to the orange door...

<ManualImage name="entry" />

## Checking In

<SharedContent file="checking-in" />

<ManualImage name="lock" />

## Useful Info

### WiFi Info

<WiFiInfo />

### Heating

The living, dining, and kitchen area is heated by a pair of electric wall heaters...

### Safety

The home is equipped with smoke and CO detectors. Under the kitchen sink you'll find
a fire extinguisher and a Prepared Hero fire blanket...

### Smart TV and Accounts

A smart TV in the living room is available to guests...

### Cell Phone Chargers

The lamps on the bedside tables in the master bedroom have USB ports...

## House Rules

<SharedContent file="house-rules/quiet-hours" />

### Sanitary Products

Please do not flush sanitary items or baby wipes in the toilet...

<SharedContent file="house-rules/shower-hair-catcher" />

### Cooking

When cooking please always use the vent on the microwave...

<SharedContent file="house-rules/shoes" />
<SharedContent file="house-rules/door-locks" />

### Laundry

Detergent pods will be left out in a small wooden bowl...

### Waste Disposal

The kitchen trash can has separate bins for trash and recycling...

<ManualImage name="trash" />

<SharedContent file="house-rules/smoking" />
<SharedContent file="house-rules/check-in-out-times" />

## Getting Around the Area

The Gatewood neighborhood provides some fantastic businesses...

## Checking Out

<SharedContent file="checking-out" />
```

## Custom MDX Components

The MDX files use a small set of custom React components:

### `<ManualImage name="parking" />`
Renders a Next.js `<Image>` using the image metadata from frontmatter. Handles responsive sizing, alt text, and lazy loading automatically.

### `<SharedContent file="checking-in" />`
Includes content from a shared MDX file in `content/manuals/_shared/`. Enables reuse of identical sections across properties.

### `<WiFiInfo />`
Renders WiFi credentials from frontmatter. The actual values come from environment variables, not the MDX file. The frontmatter contains template references like `${SOUND_BREEZE_WIFI_NETWORK}` that get resolved at render time.

## WiFi Credential Handling

WiFi credentials move from hardcoded JSX to environment variables:

```
# .env.local / Vercel env vars
LAUNCHPAD_WIFI_NETWORK=<network-name>
LAUNCHPAD_WIFI_PASSWORD=<password>
SONGBIRD_WIFI_NETWORK=<network-name>
SONGBIRD_WIFI_PASSWORD=<password>
SOUND_BREEZE_WIFI_NETWORK=<network-name>
SOUND_BREEZE_WIFI_PASSWORD=<password>
```

The `<WiFiInfo />` component reads these at render time (server-side only). The credentials never appear in the client bundle or git history.

## Page Component (After)

The page components become thin wrappers that load and render MDX:

```tsx
// app/manuals/sound-breeze/page.tsx
import ManualLayout from '@/components/ManualLayout';
import Content from '@/content/manuals/sound-breeze.mdx';
import { manualComponents } from '@/components/mdx/manual-components';

export default function SoundBreezeManual() {
  return (
    <ManualLayout>
      <Content components={manualComponents} />
    </ManualLayout>
  );
}
```

Down from ~150 lines of JSX to ~10 lines.

## Migration Plan

### Phase 1: Infrastructure
1. Create `content/manuals/` directory structure
2. Build the custom MDX components (`ManualImage`, `SharedContent`, `WiFiInfo`)
3. Build the `ManualLayout` wrapper component
4. Configure Next.js MDX loading for the `content/` directory

### Phase 2: Content Migration (one property at a time)
5. Migrate Sound Breeze manual (most complete — has all sections including "Getting Around")
6. Verify rendering matches the current JSX output
7. Migrate Songbird Suite
8. Migrate Seattle Launchpad

### Phase 3: Cleanup
9. Move WiFi credentials to environment variables
10. Delete the old JSX manual pages
11. Extract shared content into `_shared/` files
12. Update documentation

## What Changes for Content Updates

Before: Edit a `.tsx` file, deal with JSX syntax, `&apos;` entities, React imports. Redeploy.

After: Edit a `.mdx` file using normal Markdown. WiFi changes are env var updates in Vercel (no deploy needed for credential rotation). Redeploy for text changes.

## Risks and Considerations

- **Build-time vs runtime**: MDX is compiled at build time by default. Content changes still require a redeploy. This is acceptable for a three-property site where content changes are infrequent.
- **Image handling**: Static imports (`import image from '...'`) won't work in MDX the same way. The `ManualImage` component will need to use dynamic imports or a mapping from image names to paths.
- **Shared content complexity**: The `<SharedContent>` component adds a layer of indirection. If shared sections start diverging significantly across properties, it may be simpler to just duplicate the content in each MDX file.
- **MDX learning curve**: Minor — MDX is just Markdown with optional JSX. The custom components have simple, self-explanatory APIs.
