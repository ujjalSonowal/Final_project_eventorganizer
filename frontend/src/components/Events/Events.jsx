import React, { useState } from "react";
import styled from "styled-components";
import StarRating from "../StarRating";
import { Link } from "react-router-dom";

const EventCard = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  /* padding-left: 100px; */
  width: 400px;
  text-align: center;
  margin-bottom: 20px;
  /* Allow event cards to grow to fill the container */
  margin-right: 2rem; /* Add margin-right for gap between event cards */
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const EventTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const EventInfo = styled.div`
  margin-top: 10px;
`;

const Button = styled.button`
  background-color: #22ae1b;
  padding: 10px;
  box-shadow: 10px lightcoral;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  border: none;
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(145, 131, 131, 0.5);
  display: ${(props) => (props.showPopup ? "block" : "none")};
`;

const PopupCard = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  width: 400px;
  z-index: 1;
  display: ${(props) => (props.showPopup ? "block" : "none")};
`;
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const EventImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 20px;
`;

const CommentContainer = styled.div`
  margin-top: 20px;
`;

const CommentTextArea = styled.textarea`
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

export const Events = ({ event }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the submission of comment and rating, for example, by calling an API
    console.log("Comment:", comment);
    console.log("Rating:", rating);
    // Clear the comment and rating fields after submission
    setComment("");
    setRating(0);
  };

  return (
    <div>
      <EventCard>
        <EventTitle>
          Event Name: <strong>{event.name.toUpperCase()}</strong>
        </EventTitle>
        <p>Event Created: {event.createOn}</p>
        <EventInfo>
          <p>Event type: {event.type}</p>
          <p>Status: {event.status}</p>
        </EventInfo>
        <StarRating rating={event.rating} />
        <Button className="view-details-btn" onClick={togglePopup}>
          {showPopup ? "Close Details" : "View Details"}
        </Button>

        <PopupOverlay showPopup={showPopup} onClick={togglePopup} />
        <PopupCard showPopup={showPopup}>
          <CloseButton onClick={togglePopup}>Close</CloseButton>
          <h2>{event.name.toUpperCase()}</h2>
          <EventImage src={event.image} alt="Event" />
          <div>
            <p>
              <strong>Created date:</strong> {event.createOn}
            </p>
            <p>
              <strong>Total Booking:</strong> {event.totalbooking}
            </p>
          </div>
          <div>
            <p>
              <strong>Capacity:</strong>{" "}
              {event.capacity &&
                event.capacity.map((capacity, index) => (
                  <span key={index}>{capacity}</span>
                ))}
            </p>
            <p>
              <strong>Price:</strong>{" "}
              {event.price &&
                event.price.map((price, index) => (
                  <span key={index}>{price}</span>
                ))}
            </p>
          </div>
          <Link to="/createbook">
            <Button className="book-btn">Book Now</Button>
          </Link>
          <CommentContainer>
            <form onSubmit={handleSubmit}>
              <CommentTextArea
                value={comment}
                onChange={handleCommentChange}
                placeholder="Write your comment..."
              ></CommentTextArea>
              <StarRating rating={rating} onRatingChange={handleRatingChange} />
              <SubmitButton type="submit">Submit</SubmitButton>
            </form>
          </CommentContainer>
          <div>
            {event.comment &&
              event.comment.map((comment, index) => (
                <div key={index}>
                  <p>
                    <strong>Comment Body: {comment.commentBody}</strong>
                  </p>
                  <p>Comment On: {comment.commentDate}</p>
                </div>
              ))}
          </div>
        </PopupCard>
      </EventCard>
    </div>
  );
};
