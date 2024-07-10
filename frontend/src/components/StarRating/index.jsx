import React from "react";
import styled from "styled-components";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const StarRating = ({ rating, onRatingChange }) => {
  // Round rating to one decimal place
  const roundedRating = Math.round(rating * 10) / 10;

  // Calculate full stars and half stars
  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 !== 0;

  // Array to hold star elements
  const stars = [];

  // Push full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <StarIcon key={i} onClick={() => onRatingChange(i + 1)}>
        <FaStar />
      </StarIcon>
    );
  }

  // Push half star if applicable
  if (hasHalfStar) {
    stars.push(
      <StarIcon key={fullStars} onClick={() => onRatingChange(fullStars + 0.5)}>
        <FaStarHalfAlt />
      </StarIcon>
    );
  }

  // Fill remaining stars with empty stars to make total 5 stars
  const totalStars = 5;
  for (let i = stars.length; i < totalStars; i++) {
    stars.push(
      <StarIcon key={i} onClick={() => onRatingChange(i + 1)}>
        <FaStar style={{ color: "#ccc" }} />
      </StarIcon>
    );
  }

  return (
    <RatingContainer>
      {stars}
      <RatingNumber>({roundedRating})</RatingNumber>
    </RatingContainer>
  );
};

// Styled components for the rating display
const RatingContainer = styled.div`
  display: inline-flex;
  align-items: center;
  color: #f39c12; /* Star color */
`;

const StarIcon = styled.span`
  font-size: 1.2em;
  cursor: pointer;
  margin-right: 5px;

  &:hover {
    color: #f39c12; /* Change star color on hover */
  }
`;

const RatingNumber = styled.span`
  margin-left: 5px;
  font-size: 1em;
`;

export default StarRating;
