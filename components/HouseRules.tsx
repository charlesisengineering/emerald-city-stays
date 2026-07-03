import { getRuleContent } from "@/libs/mdx";
import { getPropertyRules } from "@/libs/propertyRules";

// Maps a property's kebab-case slug (used for content paths + manual slugs) to
// the camelCase key libs/reviews.ts PROPERTY_IDS uses for the Hospitable UUID.
const SLUG_TO_API_KEY: Record<string, string> = {
  "sound-breeze": "soundBreeze",
  songbird: "songbird",
  launchpad: "launchpad",
};

// Server component: renders a property's House Rules from two sources —
//   - structured check-in/out from the Hospitable API (authoritative, no drift)
//   - narrative rule prose from shared MDX partials (content/rules/<slug>/),
//     the SAME files the house manual renders, so edits stay in sync.
// `property` is the kebab-case slug (e.g. "sound-breeze"), matching the manual
// slug and the content/rules/ directory. Rendered in the listing page (a server
// component) and passed into the client PropertyPage as a prop slot.
const HouseRules = async ({ property }: { property: string }) => {
  const apiKey = SLUG_TO_API_KEY[property] ?? property;
  const [rules, quietHours, smoking] = await Promise.all([
    getPropertyRules(apiKey),
    getRuleContent(property, "quiet-hours"),
    getRuleContent(property, "smoking"),
  ]);

  return (
    <article className="prose lg:prose-l">
      <h3>House Rules</h3>

      {quietHours && (
        <>
          <h4>Quiet Hours</h4>
          {quietHours}
        </>
      )}

      {smoking && (
        <>
          <h4>Smoking</h4>
          {smoking}
        </>
      )}

      {rules?.checkin && rules?.checkout && (
        <>
          <h4>Check-In and Check-Out</h4>
          <p>
            Check-in begins at {rules.checkin} and check-out is at{" "}
            {rules.checkout}.
          </p>
        </>
      )}
    </article>
  );
};

export default HouseRules;
