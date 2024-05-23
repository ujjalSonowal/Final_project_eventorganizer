import React, { useState } from "react";
import styled from "styled-components";
import StarRating from "../StarRating";

const OrganizerContainer = styled.div`
  .organizer-card {
    width: 400px;
    background-color: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
    &:hover {
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
  }

  .popup-overlay {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    display: none;
  }

  .popup-card {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    display: none;
    max-width: 600px;
    width: 90%;
    text-align: left;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
    &:hover {
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
  }

  .active {
    display: block;
  }

  .close-btn,
  .view-details-btn,
  .feedback-btn {
    background-color: #28a745;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
    font-size: 16px;
    font-weight: bold;
  }

  .close-btn {
    background-color: #dc3545;
  }

  .feedback-container {
    margin-top: 20px;
  }

  h2 {
    margin-top: 0;
    font-size: 24px;
    font-weight: bold;
    color: #28a745;
  }

  p {
    font-size: 18px;
    margin: 10px 0;
  }

  strong {
    font-weight: bold;
  }

  .service-container {
    margin-top: 20px;
  }

  .service-item {
    margin-bottom: 10px;
  }

  textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    font-size: 16px;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #ced4da;
    resize: vertical;
  }

  .rating-container {
    margin-top: 10px;
  }
`;

export function Organizer({ organise }) {
  const [showPopup, setShowPopup] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const submitFeedback = () => {
    // Here you can implement the logic to submit feedback
    console.log("Feedback:", feedback);
    console.log("Rating:", rating);
    // Reset feedback and rating after submission
    setFeedback("");
    setRating(0);
    // Close the popup
    setShowPopup(false);
  };

  return (
    <OrganizerContainer>
      <div className="organizer-container">
        <div className="organizer-card">
          <h2>{organise.companyName}</h2>
          <p>
            <strong>Owner:</strong> {organise.ownerName}
          </p>
          <p>{organise.description}</p>
          <StarRating rating={organise.rating} />

          <div
            className={`popup-overlay ${showPopup ? "active" : ""}`}
            onClick={togglePopup}
          ></div>
          <div className={`popup-card ${showPopup ? "active" : ""}`}>
            <button className="close-btn" onClick={togglePopup}>
              Close
            </button>
            <h2>{organise.companyName}</h2>
            <p>
              <strong>Owner:</strong> {organise.ownerName}
            </p>
            <p>{organise.description}</p>
            <p>
              <strong>Email:</strong> {organise.contactEmail}
            </p>
            <p>
              <strong>Phone:</strong> {organise.contactPhone}
            </p>
            <div className="service-container">
              <h3>Services</h3>
              {organise.services &&
                organise.services.map((service, index) => (
                  <div key={index} className="service-item">
                    <p>
                      <strong>Service Name:</strong> {service.serviceName}
                    </p>
                    <p>{service.description}</p>
                  </div>
                ))}
            </div>
            <div className="feedback-container">
              <h3>Feedback</h3>
              <textarea
                placeholder="Write your feedback here..."
                value={feedback}
                onChange={handleFeedbackChange}
              />
              <div className="rating-container">
                <StarRating
                  rating={rating}
                  onRatingChange={handleRatingChange}
                />
              </div>
              <button className="feedback-btn" onClick={submitFeedback}>
                Submit Feedback
              </button>
            </div>
          </div>

          <button className="view-details-btn" onClick={togglePopup}>
            {showPopup ? "Close Details" : "View Details"}
          </button>
        </div>
      </div>
    </OrganizerContainer>
  );
}

// export default Organizer;
