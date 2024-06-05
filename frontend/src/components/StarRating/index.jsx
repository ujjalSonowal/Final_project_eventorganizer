// StarRating.js
import React from "react";
import "./style.css";

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(
        <span key={i} className="star">
          &#9733;
        </span>
      );
    } else {
      stars.push(
        <span key={i} className="star">
          &#9734;
        </span>
      );
    }
  }
  return <div className="star-rating">{stars}</div>;
};

// import { useState } from "react";

// const StarRating = ({ onRate }) => {
//   const [rating, setRating] = useState(0);

//   const handleStarClick = (newRating) => {
//     setRating(newRating);
//     onRate(newRating);
//   };

//   return (
//     <div className="star-rating">
//       {[...Array(5)].map((_, index) => {
//         const starValue = index + 1;
//         return (
//           <span
//             key={index}
//             className={`star ${starValue <= rating ? "filled" : ""}`}
//             onClick={() => handleStarClick(starValue)}
//           >
//             &#9733;
//           </span>
//         );
//       })}
//     </div>
//   );
// };

export default StarRating;

// export default StarRating;
