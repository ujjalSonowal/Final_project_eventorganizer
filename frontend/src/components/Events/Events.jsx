import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import StarRating from "../StarRating";

const EventContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const EventsCard = styled.div`
  background-color: #e7f4ff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  margin: 1rem;
  padding: 1rem;
  width: 300px;
  /* height: 250px; */

  p {
    margin: 0.5rem 0;
    color: black;
  }
`;

const OrganiserDetails = styled.div`
  /* display: flex; */
  p {
    background-color: #1ed3ca;
    padding: 8px;
    border-radius: 4px;
  }

  /* justify-content: space-around; */
`;

const ViewDetailsBtn = styled.button`
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3e8e41;
  }
`;

const PopupOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999;
  display: ${({ show }) => (show ? "block" : "none")};
`;

const PopupCard = styled.div`
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  left: 50%;
  max-height: 80vh;
  overflow-y: auto;
  padding: 1rem;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  z-index: 1000;
  display: ${({ show }) => (show ? "block" : "none")};
`;

const CloseBtn = styled.button`
  background-color: transparent;
  border: none;
  color: #333;
  cursor: pointer;
  font-size: 1.1rem;
  position: absolute;
  right: 1rem;
  top: 1rem;
`;

const EventImages = styled.div`
  margin-bottom: 1rem;

  img {
    border-radius: 5px;
    height: 200px;
    object-fit: cover;
    width: 100%;
  }
`;

const EventInfo = styled.div`
  display: flex;
  justify-content: space-around;

  p {
    color: #333;
  }
`;

const P1 = styled.div`
  background-color: #2389b1;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px;
  /* padding-left: 19px; */
  border-radius: 4px;
`;

const BookBtn = styled.button`
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3e8e41;
  }
`;

const CommentContainer = styled.div`
  border-top: 1px solid #ddd;
  margin-top: 1rem;
  padding-top: 1rem;
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  textarea {
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 5px;
    border: 1px solid #ddd;
    resize: none;
  }

  button {
    align-self: flex-end;
    background-color: #4caf50;
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    font-size: 1rem;
    padding: 0.5rem;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #3e8e41;
    }
  }
`;

const CommentList = styled.div`
  /* max-height: 200px;
  overflow-y: auto; */

  .comment-item {
    border-bottom: 1px solid #ddd;
    margin-bottom: 0.5rem;
    padding-bottom: 0.5rem;

    p {
      margin: 0.5rem 0;
      color: #333;
    }
  }
`;

const BtnSectionBook = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  .submit-btn {
    background-color: #695e69;
    width: 50%;
    padding: 10px;
  }

  button {
    cursor: pointer;
    border: none;
    background-color: transparent;
    font-size: 19px;
  }
`;

const H2 = styled.h2`
  position: absolute;
  left: 40%;
  top: 20px;
`;

const ContainerCreateBooking = styled.div`
  p {
    color: blueviolet;
  }

  form {
    display: flex;
    flex-direction: column;

    label {
      margin-top: 10px;
    }

    input {
      margin-bottom: 10px;
      width: 100%;
    }
    input[type="number"] {
      margin-bottom: 10px;
      width: 100%;
      border: 1px solid black;
      padding: 7px;
      border-radius: 4px;
    }
  }
`;

export const Events = ({ event, organizer }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showbookingform, setshowbookingform] = useState(false);
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("User");

  const [name, setname] = useState("");
  const [bookingDate, setbookingDate] = useState("");
  const [noofday, setnoofday] = useState("");
  const [location, setlocation] = useState("");
  const [pin, setpin] = useState("");
  const [district, setdistrict] = useState("");
  const [contact, setcontact] = useState("");
  const [email, setemail] = useState("");
  const [panno, setpanno] = useState("");

  const organiseId = event.organiseId;
  const eventId = event._id;
  const eventname = event.name;
  const eventtype = event.type;

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const togglebooking = () => {
    setshowbookingform(!showbookingform);
  };

  const toggleOff = () => {
    setshowbookingform(false);
  };

  const Createbooking = async (e) => {
    e.preventDefault();
    const data = {
      name,
      userId,
      organiseId,
      eventId,
      bookingDate,
      noofday,
      location,
      pin,
      district,
      contact,
      email,
      panno,
      eventname,
      eventtype,
    };
    try {
      const response = await fetch(`http://localhost:5001/booking/addbooking`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Data not submitted");
      }
      const mybooking = await response.json();
      console.log(mybooking);
      window.alert(`Booking Created`);
      navigate(`/mybooking/${userId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    // Here you would add the logic to post the new comment to your backend
    // For now, let's just log it to the console
    console.log("New comment:", newComment);
    setNewComment("");
  };

  return (
    <EventContainer>
      <EventsCard>
        <p>
          Event Name: <strong>{event.name.toUpperCase()}</strong>
        </p>
        {organizer ? (
          <OrganiserDetails>
            <p>
              <strong>Organizer Name:</strong>
              {organizer.name}
            </p>
            <p>
              <strong>Email:</strong>
              {organizer.email}
            </p>
          </OrganiserDetails>
        ) : (
          <p>Loading organizer details...</p>
        )}
        <p>Event Created: {event.createOn}</p>
        <div className="edetails">
          <p>Event type: {event.type}</p>
          <p>Status: {event.status}</p>
          <StarRating rating={event.rating} />
        </div>

        {/* Popup Card */}
        <PopupOverlay show={showPopup} onClick={togglePopup}></PopupOverlay>
        <ViewDetailsBtn onClick={togglePopup}>
          {showPopup ? "Close Details" : "View Details"}
        </ViewDetailsBtn>
      </EventsCard>
      <PopupCard show={showPopup}>
        <CloseBtn onClick={togglePopup}>Close</CloseBtn>
        <EventImages>
          <img alt="Event Images" />
        </EventImages>

        <H2>{event.name.toUpperCase()}</H2>

        <EventInfo>
          <p>
            <strong>Created date:</strong> {event.createOn}
          </p>
          <p>
            <strong>Total Booking:</strong> {event.totalbooking}
          </p>
        </EventInfo>
        <EventInfo>
          <p className="list">
            <strong>Capacity:</strong>
            {event.capacity &&
              event.capacity.map((capacity, index) => (
                <div key={index}>
                  <P1 className="itemlist">{capacity}</P1>
                </div>
              ))}
          </p>
          <p className="list">
            <strong>Price:</strong>
            {event.price &&
              event.price.map((price, index) => (
                <div key={index}>
                  <P1 className="itemlist">{price}</P1>
                </div>
              ))}
          </p>
        </EventInfo>

        <BookBtn onClick={() => togglebooking()}>Book Now</BookBtn>

        {showbookingform && (
          <ContainerCreateBooking>
            <p>
              Notes: Payment Status/Booking Status will be updated by Event
              manager later. Sometimes prices will increase depending on the
              number of days...
            </p>
            <form onSubmit={Createbooking}>
              <div>
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  required
                  onChange={(e) => setname(e.target.value)}
                  value={name}
                />
                <label htmlFor="date">Pick a date</label>
                <input
                  type="date"
                  required
                  onChange={(e) => setbookingDate(e.target.value)}
                  value={bookingDate}
                />
                <label htmlFor="duration">Number of Days</label>
                <input
                  type="number"
                  placeholder="No of days"
                  required
                  onChange={(e) => setnoofday(e.target.value)}
                  value={noofday}
                />
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  placeholder="Event location"
                  required
                  onChange={(e) => setlocation(e.target.value)}
                  value={location}
                />
                <label htmlFor="pin">Pin Number</label>
                <input
                  type="number"
                  placeholder="Pin number"
                  required
                  onChange={(e) => setpin(e.target.value)}
                  value={pin}
                />
                <label htmlFor="district">District</label>
                <input
                  type="text"
                  placeholder="District"
                  required
                  onChange={(e) => setdistrict(e.target.value)}
                  value={district}
                />
                <label htmlFor="contact">Contact-No</label>
                <input
                  type="tel"
                  placeholder="Your Contact Number"
                  required
                  onChange={(e) => setcontact(e.target.value)}
                  value={contact}
                />
                <label htmlFor="email">Email Id</label>
                <input
                  type="email"
                  placeholder="Email Id"
                  required
                  onChange={(e) => setemail(e.target.value)}
                  value={email}
                />
                <label htmlFor="panno">Pan Number</label>
                <input
                  type="text"
                  required
                  placeholder="Pan card no"
                  onChange={(e) => setpanno(e.target.value)}
                  value={panno}
                />
              </div>
              <BtnSectionBook>
                <button className="submit-btn" type="submit">
                  Booked
                </button>
                <button onClick={() => toggleOff()}>Close</button>
              </BtnSectionBook>
            </form>
          </ContainerCreateBooking>
        )}

        {!showbookingform && (
          <CommentContainer>
            <CommentForm onSubmit={handleAddComment}>
              <textarea
                placeholder="Add a comment..."
                rows="4"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
              <button type="submit">Add Comment</button>
            </CommentForm>
            <CommentList>
              {event.comment &&
                event.comment.map((comment, index) => (
                  <div key={index} className="comment-item">
                    <p>
                      <strong>{comment.userName}</strong> -{" "}
                      {comment.commentBody}
                    </p>
                    <p>Comment On: {comment.commentDate}</p>
                  </div>
                ))}
            </CommentList>
          </CommentContainer>
        )}
      </PopupCard>
    </EventContainer>
  );
};
