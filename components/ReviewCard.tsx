"use client";

import { useState } from "react";
import { Review } from "@/types/userTypes";

// Client component: renders one review with configurable truncation and an
// expand/collapse toggle. The server passes the FULL text; truncation is purely
// presentational here, controlled by `truncateAt` (character count).
const StarRow = ({ rating }: { rating: number }) => (
  <div className="flex flex-row gap-0" aria-label={`${rating} out of 5 stars`}>
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className={`w-4 h-4 ${i < rating ? "text-yellow-500" : "text-base-content/20"}`}
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

const ReviewCard = ({
  review,
  truncateAt = 240,
}: {
  review: Review;
  truncateAt?: number;
}) => {
  const [expanded, setExpanded] = useState(false);

  const needsTruncation = review.text.length > truncateAt;
  const shown =
    needsTruncation && !expanded
      ? review.text.slice(0, truncateAt).trimEnd() + "…"
      : review.text;

  const date = review.reviewedAt
    ? new Date(review.reviewedAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <li className="flex flex-col gap-3 rounded-box bg-base-100 p-6 shadow-sm">
      <StarRow rating={review.rating} />

      <p className="text-base-content/90 leading-relaxed whitespace-pre-line">
        {shown}
        {needsTruncation && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="ml-1 link link-primary text-sm font-medium"
            aria-expanded={expanded}
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </p>

      <div className="mt-auto flex items-center gap-2 text-sm text-base-content/60">
        {review.guestName && (
          <span className="font-semibold text-base-content/80">
            {review.guestName}
          </span>
        )}
        {review.guestName && date && <span>·</span>}
        {date && <span>{date}</span>}
      </div>
    </li>
  );
};

export default ReviewCard;
