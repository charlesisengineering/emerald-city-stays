import { NextResponse } from "next/server";
import { getAllReviews } from "@/libs/reviews";

// TEMPORARY test endpoint for validating the reviews scaffold (#35) on a
// preview deploy. Returns the normalized, PUBLIC-only reviews from
// getAllReviews(). Remove before merging reviews work to main — this exposes
// review data on an unauthenticated public route.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const reviews = await getAllReviews();
    return NextResponse.json({
      count: reviews.length,
      // Surface the keys so we can eyeball that no `private` data leaked through.
      sampleKeys: reviews[0] ? Object.keys(reviews[0]) : [],
      reviews,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "failed to load reviews" },
      { status: 500 }
    );
  }
}
