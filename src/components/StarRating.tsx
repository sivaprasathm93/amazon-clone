import { Star } from "lucide-react";

interface StarRatingProps {
  /** Average rating, 0-5. */
  rate: number;
  /** Number of ratings, shown alongside the stars. */
  count?: number;
}

/**
 * Renders a 0-5 star rating.
 *
 * Stars are filled against the rating rounded to the nearest half, so a 4.1
 * reads as four stars rather than five. The visual stars are hidden from
 * assistive tech in favour of a single spoken summary.
 */
export function StarRating({ rate, count }: StarRatingProps) {
  const clamped = Math.min(5, Math.max(0, rate));
  const rounded = Math.round(clamped * 2) / 2;

  return (
    <div className="flex items-center mt-2">
      <span className="flex items-center" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((index) => {
          const fill = Math.min(1, Math.max(0, rounded - index));
          return (
            <span key={index} className="relative h-5 w-5">
              <Star className="absolute inset-0 h-5 w-5 text-gray-300" />
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <Star
                  className="h-5 w-5 text-blue-500"
                  fill="currentColor"
                />
              </span>
            </span>
          );
        })}
      </span>
      <span className="text-gray-600 ml-2">
        <span className="sr-only">
          Rated {rounded} out of 5
          {count === undefined ? "" : ` from ${count} ratings`}
        </span>
        <span aria-hidden="true">
          {rounded.toFixed(1)}
          {count === undefined ? "" : ` (${count.toLocaleString("en-IN")})`}
        </span>
      </span>
    </div>
  );
}
