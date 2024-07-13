// StarRatingDisplay component
import React from "react";
import StarRating from "../StarRating/index";

export const RatingDisplay = ({ rating }) => {
  return (
    <div>
      <StarRating rating={rating} />
    </div>
  );
};
