import React from "react";
import styled from "styled-components";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const StarRating = ({ rating }) => {
  // Round rating to one decimal place
  const roundedRating = Math.round(rating * 10) / 10;

  // Calculate full stars and half stars
  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 !== 0;

  // Array to hold star elements
  const stars = [];

  // Push full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} />);
  }

  // Push half star if applicable
  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key={stars.length} />);
  }

  return (
    <RatingContainer>
      {stars.map((star, index) => (
        <StarIcon key={index}>{star}</StarIcon>
      ))}
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
`;

const RatingNumber = styled.span`
  margin-left: 5px;
  font-size: 1em;
`;

export default StarRating;
