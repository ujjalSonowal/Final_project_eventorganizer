import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import "./mybook.css";
export const Mybook = ({ booking, organizer }) => {
  const [updateform, setupdateform] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("User");
  const [toggleD, settoggleD] = useState(false);

  const [name, setname] = useState(booking.name);
  const [bookingDate, setbookingDate] = useState(booking.bookingDate);
  const [location, setlocation] = useState(booking.location);
  const [pin, setpin] = useState(booking.pin);
  const [email, setemail] = useState(booking.email);
  const [district, setdistrict] = useState(booking.district);
  const [contact, setcontact] = useState(booking.contact);

  const bookingId = booking._id;

  const toggleform = () => {
    setupdateform(!updateform);
  };

  const toggleoff = () => {
    setupdateform(false);
  };
  const toggleDetails = () => {
    settoggleD(!toggleD);
  };
  const toggleDOff = () => {
    settoggleD(false);
  };

  const handleupdate = async (e) => {
    e.preventDefault();
    const data = { name, bookingDate, location, pin, email, district, contact };
    try {
      const response = await fetch(
        `http://localhost:5001/booking/update/${bookingId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (!response) {
        console.log("error");
      }
      const updated = await response.json();
      console.log(updated);
      navigate(`/mybooking/${userId}`);
      setupdateform(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/booking/delete/${bookingId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete");
      }
      // Redirect to another page or perform any other actions after deletion
      navigate(`/mybooking/${userId}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="booking-card">
        <h2>Booked Event : {booking.eventname}</h2>
        <div className="organiser-details-card">
          {organizer ? (
            <div className="organizer-details">
              <h4>Organizer Name: {organizer.name}</h4>
              <div className="organise-details-view">
                <p>Contact: {organizer.phone}</p>
                <p>Email: {organizer.email}</p>
                {/* Add more organizer details as needed */}
              </div>
              <div className="viewmorebtn">
                <button onClick={() => toggleDetails()}>More Details</button>
              </div>
              <>
                {toggleD && (
                  <div className="all-details-view">
                    <div className="popup-content">
                      <button
                        className="close-btn"
                        onClick={() => toggleDOff()}
                      >
                        Close
                      </button>
                      <p>Owner: {organizer.owner}</p>
                      <p>Address: {organizer.address}</p>
                      <p>Pin: {organizer.pin}</p>
                      <p>State: {organizer.state}</p>
                      <p>Office Location: {organizer.location}</p>
                      <p>Post Office Address: {organizer.postoffice}</p>
                    </div>
                  </div>
                )}
              </>
            </div>
          ) : (
            <p>Loading organizer details...</p>
          )}
        </div>
        <hr />
        <h2>Your Details</h2>
        <div className="booking-details">
          <p>
            <strong>Name:</strong> {booking.name}
          </p>
          {/* <p><strong>User ID:</strong> {booking.userId}</p>
                <p><strong>Event ID:</strong> {booking.eventId}</p>
                <p><strong>Organise ID:</strong> {booking.organiseId}</p> */}
          <p>
            <strong>Event Date:</strong> {booking.bookingDate}
          </p>
          <p>
            <strong>Booking Date:</strong>{" "}
            {new Date(booking.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Number of Days:</strong> {booking.noofday}
          </p>
          <p>
            <strong>Location:</strong> {booking.location}
          </p>
          <p>
            <strong>Pin:</strong> {booking.pin}
          </p>
          <p>
            <strong>District:</strong> {booking.district}
          </p>
          <p>
            <strong>Contact:</strong> {booking.contact}
          </p>
          <p>
            <strong>Email:</strong> {booking.email}
          </p>
          <p>
            <strong>PAN No:</strong> {booking.panno}
          </p>
          {/* <p>
            <strong>Booking Status:</strong>{" "}
            {booking.bookingstatus ? "Confirmed" : "Pending"}
          </p> */}
          <p>
            <strong>Booking Status:</strong>
            {booking.Status}
          </p>
          <p>
            <strong>Capacity: </strong> {booking.capacity}
          </p>
          <p>
            <strong>Price:</strong>{" "}
            {/* {event?.price &&
              event?.price.map((price, index) => (
                <div key={index}>
                  <div className="itemlist">{price}</div>
                </div>
              ))} */}
            {booking.price}
          </p>

          <p>
            <strong>Payment Status:</strong> {booking.paymentstatus}
          </p>
          <p>
            <strong>Event Type:</strong> {booking.eventtype}
          </p>
        </div>
        <div className="btn-section">
          <Link className="cancel-btn" onClick={() => handleDelete()}>
            {" "}
            Cancel Booking
          </Link>
          <Link className="update-btn" onClick={() => toggleform()}>
            Update Details
          </Link>
        </div>
        <>
          {updateform && (
            <div className="formupdate">
              <div className="frompop">
                <form onSubmit={handleupdate}>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                  />
                  <label htmlFor="date">Event date</label>
                  <input
                    style={{ paddingTop: "8px", paddingBottom: "7px" }}
                    type="date"
                    onChange={(e) => setbookingDate(e.target.value)}
                    value={bookingDate}
                  />
                  <br />
                  <label htmlFor="location">location</label>
                  <input
                    type="text"
                    onChange={(e) => setlocation(e.target.value)}
                    value={location}
                  />
                  <label htmlFor="pin">pin</label>
                  <input
                    style={{ paddingTop: "8px", paddingBottom: "7px" }}
                    type="number"
                    onChange={(e) => setpin(e.target.value)}
                    value={pin}
                  />
                  <br />
                  <label htmlFor="district">District</label>
                  <input
                    type="text"
                    onChange={(e) => setdistrict(e.target.value)}
                    value={district}
                  />
                  <label htmlFor="contact">Contact</label>
                  <input
                    type="tel"
                    onChange={(e) => setcontact(e.target.value)}
                    value={contact}
                  />
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    onChange={(e) => setemail(e.target.value)}
                    value={email}
                  />
                  <div className="btn-update-section">
                    <button className="update-btn" type="submit">
                      submit
                    </button>
                    <button
                      className="cancelupdate"
                      onClick={() => toggleoff()}
                    >
                      Cancel Updation
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      </div>
    </>
  );
};
