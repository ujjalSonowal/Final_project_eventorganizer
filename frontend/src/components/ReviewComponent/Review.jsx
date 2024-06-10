import React, { useState, useEffect } from "react";
import StarRating from "../StarRating/index";
import styled from "styled-components";
import "./Review.css";

export const Review = ({ eventId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  //   const [successMessage, setSuccessMessage] = useState("");
  const userId = localStorage.getItem("User");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/review/event/${eventId}`
      );
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating < 1 || rating > 5 || comment.trim() === "") {
      setError("Please provide a valid rating (1-5) and comment.");
      return;
    }

    const data = { rating, comment, userId, eventId };

    try {
      const response = await fetch(`http://localhost:5001/review/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        throw new Error("Data not submitted");

        // const newReview = await response.json();
        // setReviews([newReview, ...reviews]);
        // setRating(0);
        // setComment("");
        // setError("");
        // setSuccessMessage("Review submitted successfully.");
      } else {
        // const { error } = await response.json();
        // setError(error);
        const myreview = await response.json();
        console.log(myreview);
        window.alert(`submitted`);
      }
    } catch (error) {
      console.error(error);
      //   setError("Failed to post review.");
    }
  };

  const handleLike = async (reviewId) => {};

  const handleDislike = async (reviewId) => {};

  //   useEffect(() => {
  //     if (successMessage) {
  //       const timer = setTimeout(() => {
  //         setSuccessMessage("");
  //         fetchReviews();
  //       }, 3000);
  //       return () => clearTimeout(timer);
  //     }
  //   }, [successMessage]);

  return (
    <div>
      <H2>Reviews</H2>
      <form onSubmit={handleSubmit} className="review-form">
        <div>
          <label>Rating:</label>
          <StarRating rating={rating} onRatingChange={setRating} />
        </div>
        <div>
          <label>Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>

        <button type="submit">Post Review</button>
        {/* {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>} */}
      </form>

      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="review-container">
            <h3>{review.userId.name}</h3>
            <p>
              <StarRating rating={review.rating} />
            </p>
            <p>Comment: {review.comment}</p>
            <div className="buttons">
              <button
                onClick={() => handleLike(review._id)}
                disabled={review.likes.includes(userId)}
              >
                Like ({review.likes.length})
              </button>
              <button
                onClick={() => handleDislike(review._id)}
                disabled={review.dislikes.includes(userId)}
              >
                Dislike ({review.dislikes.length})
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

const H2 = styled.h2`
  padding-top: 40px;
  padding-bottom: 10px;
  font-weight: bold;
  font-size: 20px;
`;
