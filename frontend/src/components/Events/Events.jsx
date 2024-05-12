import React from "react";
import { useState } from "react";
import StarRating from "../StarRating";
import { Link } from "react-router-dom";
import "./events.css";

export const Events = ({ event }) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  return (
    <div className="event-container">
      <div className="events-card">
        <p>
          Event Name: <strong> {event.name.toUpperCase()} </strong>
        </p>
        <p>Event Created: {event.createOn}</p>
        <div className="edetails">
          <p>Event type: {event.type}</p>
          <p>Status: {event.status}</p>
        </div>

        <StarRating rating={event.rating} />

        {/* Popup Card */}
        <div
          className={`popup-overlay ${showPopup ? "active" : ""}`}
          onClick={togglePopup}
        ></div>
        <button className="view-details-btn" onClick={togglePopup}>
          {showPopup ? "Close Details" : "View Details"}
        </button>
      </div>
      <div className="event-popup">
        <div
          aria-colspan={2}
          className={`popup-card ${showPopup ? "active" : ""}`}
        >
          <button className="close-btn" onClick={togglePopup}>
            Close
          </button>
          <div className="event-images box ">
            <img alt="Event Images" />
          </div>

          <h2>{event.name.toUpperCase()}</h2>

          <div className="event-info box">
            <p>
              <strong>Created date:</strong> {event.createOn}
            </p>
            <p>
              <strong>Total Booking:</strong> {event.totalbooking}
            </p>
          </div>
          <div className="event-info box">
            <p className="list">
              <strong>Capacity:</strong>
              {event.capacity &&
                event.capacity.map((capacity, index) => (
                  <div key={index}>
                    <div className="itemlist">{capacity}</div>
                  </div>
                ))}
            </p>
            <p className="list">
              <strong>Price:</strong>{" "}
              {event.price &&
                event.price.map((price, index) => (
                  <div key={index}>
                    <div className="itemlist">{price}</div>
                  </div>
                ))}
            </p>
          </div>
          <Link to={`/booking/${event._id}`}>
            <button className="book-btn">Book Now</button>
          </Link>
          <div className="comment-cotainer box">
            {event.comment &&
              event.comment.map((comment, index) => (
                <div key={index}>
                  <p className="p3">
                    <strong>Comment Body: {comment.commentBody} </strong>
                  </p>
                  <p className="p3"> Comment On: {comment.commentDate}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// export default Events;
