import { Star } from "lucide-react";
import React from "react";

const RatingStarButtons = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-x-2">
      {[...Array(5)].map((_, index) => (
        <Star key={index} className={index < rating ? "fill-primary" : ""} />
      ))}
    </div>
  );
};

export default RatingStarButtons;
