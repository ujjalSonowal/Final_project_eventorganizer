import React from "react";
import { useState } from "react";

import "./myevent.css";
import StarRating from "../StarRating";
import { Link, useNavigate, useParams } from "react-router-dom";
const MyEvents = ({ myev }) => {
  const [showform, setshowform] = useState(false);
  const userId = localStorage.getItem("User");
  const navigate = useNavigate();

  const [name, setEventName] = useState(myev.name);
  const [type, setType] = useState(myev.type);
  const [price, setPrice] = useState(myev.price);
  const [capacity, setCapacity] = useState(myev.capacity);

  const eventId = myev?._id;

  const toggleform = () => {
    setshowform(!showform);
  };
  const toggleoff = () => {
    setshowform(false);
  };

  const handleupdate = async (e) => {
    e.preventDefault();
    const data = { name, type, price, capacity };
    try {
      const response = await fetch(
        `http://localhost:5001/events/update/${eventId}`,
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
      navigate(`/myevent/${userId}`);
      setshowform(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card">
      <img src="" alt="Event Image" />
      <div className="card-content">
        <h2>Event Name: {myev.name}</h2>

        <p>Type: {myev.type}</p>
        <p className="price">Price: {myev.price}</p>
        <p className="capacity">Capacity: {myev.capacity}</p>
        <p className="rating">
          Rating: <StarRating rating={myev.rating} />
        </p>
        <p className="status">Status: {myev.status}</p>
        <p className="create-on">Created On: {myev.createOn}</p>
        <p className="total-booking">Total Bookings: {myev.totalbooking}</p>
        <p className="no-of-comments">Number of Comments: {myev.noofcomment}</p>
        {/* <Link to={`/viewbooking/${myev._id}`}>View Booking</Link> */}
        <button onClick={() => toggleform()}>Update</button>
        <div className="comments">
          <h3>Comments:</h3>
          <div className="comment">
            {myev.comment &&
              myev.comment.map((comment, index) => (
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
      <>
        {showform && (
          <div className="form-popup">
            <form onSubmit={handleupdate}>
              <label htmlFor="name">Event Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setEventName(e.target.value)}
              />
              <label htmlFor="type">Event Type</label>
              <input
                type="text"
                onChange={(e) => setType(e.target.value)}
                value={type}
              />
              <label htmlFor="price">Price</label>
              <input
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
              <label htmlFor="capacity">Capacity</label>
              <input
                type="number"
                onChange={(e) => setCapacity(e.target.value)}
                value={capacity}
              />
              <button type="submit">submit</button>
              <button className="cancelupdate" onClick={() => toggleoff()}>
                Cancel Updation
              </button>
            </form>
          </div>
        )}
      </>
    </div>
  );
};

export default MyEvents;
