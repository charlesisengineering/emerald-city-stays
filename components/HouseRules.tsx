import { getRuleContent } from "@/libs/mdx";
import { getPropertyRules, formatTime } from "@/libs/propertyRules";
import { PropertySlug } from "@/libs/properties";

// Server component: renders a property's House Rules from two sources —
//   - structured check-in/out from the Hospitable API (authoritative, no drift)
//   - narrative rule prose from shared MDX partials (content/rules/<slug>/),
//     the SAME files the house manual renders, so edits stay in sync.
// `property` is the property slug (e.g. "sound-breeze") — the single identifier
// used for content paths, the API lookup, and everything else. Rendered in the
// listing page (a server component) and passed into the client PropertyPage.
const HouseRules = async ({ property }: { property: PropertySlug }) => {
  const [rules, quietHours, smoking] = await Promise.all([
    getPropertyRules(property),
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
            Check-in begins at {formatTime(rules.checkin)} and check-out is at{" "}
            {formatTime(rules.checkout)}.
          </p>
        </>
      )}
    </article>
  );
};

export default HouseRules;
