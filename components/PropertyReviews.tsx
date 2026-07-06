import { getReviewsForProperty, reviewFilters } from "@/libs/reviews";
import { PROPERTIES, PropertySlug } from "@/libs/properties";
import ReviewCard from "./ReviewCard";

// Visible per-property reviews for a listing page (issue #74).
//
// Shows a visible aggregate header ("★ 4.8 · 66 reviews") computed from ALL
// reviews, then a grid of individual 5-star cards. The header makes the
// AggregateRating structured data (PropertySchema, #72) legitimately
// page-backed, and the cards are curated to 5-star for presentation.
//
// Server component — passed into the client PropertyPage via a prop slot,
// like HouseRules.
const StarRow = ({ rating }: { rating: number }) => (
  <div
    className="flex flex-row gap-0.5"
    aria-label={`${rating} out of 5 stars`}
  >
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className={`w-5 h-5 ${
          i < Math.round(rating) ? "text-yellow-500" : "text-base-content/20"
        }`}
      >
        <path
          fillRule="evenodd"
          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
          clipRule="evenodd"
        />
      </svg>
    ))}
  </div>
);

const PropertyReviews = async ({
  property,
  limit = 6,
  truncateAt = 240,
}: {
  property: PropertySlug;
  limit?: number;
  truncateAt?: number;
}) => {
  // Fetch the UNFILTERED set once; derive both the aggregate and the 5-star
  // cards from it (avoids a second cache lookup).
  const all = await getReviewsForProperty(PROPERTIES[property].uuid, []);

  const rated = all.filter((r) => r.rating > 0);
  if (rated.length === 0) return null;

  const average = rated.reduce((sum, r) => sum + r.rating, 0) / rated.length;

  // Curated display: 5-star reviews with text, newest first, capped.
  const cards = all
    .filter(reviewFilters.exactRating(5))
    .filter(reviewFilters.hasText())
    .sort((a, b) => (a.reviewedAt < b.reviewedAt ? 1 : -1))
    .slice(0, limit);

  return (
    <section className="bg-base-200" id="reviews">
      <div className="max-w-7xl mx-auto px-8 py-16 md:py-24">
        <div className="flex flex-col items-center gap-2 mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center">
            What our guests say
          </h2>
          {/* Visible aggregate — computed from ALL reviews, matches the schema */}
          <div className="flex items-center gap-2 text-lg">
            <StarRow rating={average} />
            <span className="font-bold">{average.toFixed(1)}</span>
            <span className="text-base-content/60">
              · {rated.length} reviews
            </span>
          </div>
        </div>

        {cards.length > 0 && (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                truncateAt={truncateAt}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default PropertyReviews;
