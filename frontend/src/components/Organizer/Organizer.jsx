import { React, useState } from "react";
import StarRating from "../StarRating";
import "./style.css";

export function Organizer({ organise }) {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  return (
    <div className="organizer-card">
      <p>company Name:{organise.companyName}</p>
      <p>Description: {organise.description}</p>
      <p>
        <strong> {organise.ownerName}</strong>
      </p>
      {/* <p>{organizer.rating}</p> */}
      <StarRating rating={organise.rating} />
      {/* {showDetails && (
        <div>
          <p>Contact Email: {organizer.contactEmail}</p>
          <p>Contact Phone: {organizer.contactPhone}</p>
          <p>Address: {organizer.address}</p>
        </div>
      )} */}

      {/* Popup Card */}
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
        <p>
          <strong>Description:</strong> {organise.description}
        </p>
        <p>
          <strong>Email:</strong> {organise.contactEmail}
        </p>
        <p>
          <strong>Phone:</strong> {organise.contactPhone}
        </p>
        <div className="service-cotainer">
          {organise.services &&
            organise.services.map((service, index) => (
              <div key={index}>
                <p className="p3">
                  <strong>Service Name: {service.serviceName} </strong>
                </p>
                <p className="p3">Service Description: {service.description}</p>
              </div>
            ))}
        </div>
      </div>

      <button className="view-details-btn" onClick={togglePopup}>
        {showPopup ? "Close Details" : "View Details"}
      </button>
    </div>
  );
}
