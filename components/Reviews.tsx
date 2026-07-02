import { getAllReviews } from "@/libs/reviews";
import { ReviewFilter } from "@/types/userTypes";
import ReviewCard from "./ReviewCard";

// Server component: fetches (cached, server-side) and renders guest reviews.
// Defaults to the site-wide review policy (5-star only) but accepts a custom
// filter list and display caps so the same component works on the hero (#37)
// and, later, property pages (#36).
const Reviews = async ({
  filters,
  limit = 6,
  truncateAt = 240,
  title = "What our guests say",
}: {
  filters?: ReviewFilter[];
  limit?: number;
  truncateAt?: number;
  title?: string;
}) => {
  const reviews = (await getAllReviews(filters)).slice(0, limit);

  if (reviews.length === 0) return null;

  return (
    <section className="bg-base-200" id="reviews">
      <div className="max-w-7xl mx-auto px-8 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
          {title}
        </h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              truncateAt={truncateAt}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Reviews;
