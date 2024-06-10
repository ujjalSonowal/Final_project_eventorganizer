import React from "react";
import "./style.css";

const StarRating = ({ rating, onRatingChange }) => {
  const handleClick = (value) => {
    if (onRatingChange) {
      onRatingChange(value);
    }
  };

  const roundRating = (rating) => {
    return Math.round(rating * 2) / 2;
  };

  const roundedRating = roundRating(rating);

  const renderStar = (index) => {
    if (roundedRating >= index + 1) {
      return (
        <span
          key={index}
          className="star full"
          onClick={() => handleClick(index + 1)}
        >
          &#9733;
        </span>
      );
    } else if (roundedRating >= index + 0.5) {
      return (
        <span
          key={index}
          className="star half"
          onClick={() => handleClick(index + 1)}
        >
          &#9733;
        </span>
      );
    } else {
      return (
        <span
          key={index}
          className="star empty"
          onClick={() => handleClick(index + 1)}
        >
          &#9733;
        </span>
      );
    }
  };

  return (
    <div className="star-rating-container">
      {[0, 1, 2, 3, 4].map(renderStar)}
      <span className="rating-number">({roundedRating.toFixed(1)})</span>
    </div>
  );
};

export default StarRating;
