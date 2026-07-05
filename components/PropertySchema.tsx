import { PROPERTIES, PropertySlug } from "@/libs/properties";
import { getReviewsForProperty } from "@/libs/reviews";
import { getPropertyRules } from "@/libs/propertyRules";
import config from "@/config";

// Per-property VacationRental JSON-LD for rich results (issue #63).
// Server component: pulls check-in/out from the API and reviews for
// Review/AggregateRating. Rendered on each listing page.
//
// COMPLIANCE: the AggregateRating and review list are built from the
// UNFILTERED review set (filters: []), NOT the site's 5-star display filter.
// Emitting an aggregate of only-5-star reviews as the overall rating is
// misleading and violates Google's review-snippet guidelines.

const PropertySchema = async ({ property }: { property: PropertySlug }) => {
  const meta = PROPERTIES[property];
  const [rules, reviews] = await Promise.all([
    getPropertyRules(property),
    getReviewsForProperty(meta.uuid, []), // [] = ALL reviews (see COMPLIANCE note)
  ]);

  const url = `https://${config.domainName}/listings/${property}`;

  const withText = reviews.filter((r) => r.text && r.rating > 0);
  const ratingCount = reviews.filter((r) => r.rating > 0).length;
  const avg =
    ratingCount > 0
      ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / ratingCount
      : 0;

  const schema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    name: meta.name,
    url,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Seattle",
      addressRegion: "WA",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: meta.coords.latitude,
      longitude: meta.coords.longitude,
    },
    ...(rules?.checkin && { checkinTime: rules.checkin }),
    ...(rules?.checkout && { checkoutTime: rules.checkout }),
  };

  // AggregateRating + a sample of reviews, from the unfiltered set.
  if (ratingCount > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: Number(avg.toFixed(1)),
      reviewCount: ratingCount,
      bestRating: 5,
      worstRating: 1,
    };
  }
  if (withText.length > 0) {
    schema.review = withText.slice(0, 10).map((r) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      ...(r.guestName && {
        author: { "@type": "Person", name: r.guestName },
      }),
      ...(r.reviewedAt && { datePublished: r.reviewedAt.slice(0, 10) }),
      reviewBody: r.text,
    }));
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default PropertySchema;
