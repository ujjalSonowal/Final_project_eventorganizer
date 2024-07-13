import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import StarRating from "../StarRating";
import { ImageSlider } from "../ImageSlider/ImageSlider";
import { Review } from "../ReviewComponent/Review";
import { ImageEvent } from "../ImageSlider/ImageEvent";
import { RatingDisplay } from "../StarRating/RatingDisplay";

const EventContainer = styled.div`
  max-width: 100%;
`;

const EventsCard = styled.div`
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
  background-color: #cfe2e7;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin: 1rem;
  width: 400px;
  max-width: 100%;
  transition: box-shadow 0.3s ease;
  margin-bottom: 20px;
  overflow: hidden;
  padding: 20px;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  p {
    /* margin: 0.5rem 0;
    color: #333333;
    font-family: "Arial", sans-serif;
    font-size: 16px; */
  }

  .edetails {
    /* margin-top: 1rem; */
  }
`;

const OrganiserDetails = styled.div`
  p {
    /* padding: 8px;
    border-radius: 4px; */
  }
`;

const ViewDetailsBtn = styled.button`
  background-color: #000000;
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
  overflow-x: hidden;
  padding: 1rem;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  z-index: 1000;
  display: ${({ show }) => (show ? "block" : "none")};
  padding-left: 20px;
`;

const CloseBtn = styled.button`
  background-color: transparent;
  border: none;
  color: #333;
  cursor: pointer;
  font-size: 1.1rem;
`;

const EventInfoOne = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const EventInfo = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;

  p {
    color: #333;
  }
  padding-bottom: 20px;
`;
const SecOne = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 60px;
  padding-bottom: 20px;
`;
const SecTwo = styled.div`
  justify-content: space-evenly;
  display: flex;
  flex-direction: column;
`;

const P1 = styled.div`
  background-color: #2389b1;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px;
  border-radius: 4px;
  width: 80px;
`;

const BookBtn = styled.button`
  background-color: #050705;
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

const BtnSectionBook = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  gap: 20px;

  .submit-btn {
    background-color: #000000;
    width: 20%;
    padding: 10px;
    color: white;
    border-radius: 5px;
  }

  button {
    cursor: pointer;
    border: none;
    background-color: black;
    font-size: 19px;
    width: 20%;
    color: white;
    border-radius: 5px;
  }
`;

const H2 = styled.h2`
  font-weight: bold;
`;

const P = styled.p`
  background: #f9f9f9;
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
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedCapacity, setSelectedCapacity] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("profile")
  );
  const [isManualCapacity, setIsManualCapacity] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const navigate = useNavigate();
  const userId = localStorage.getItem("User");

  const [name, setName] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [noOfDays, setNoOfDays] = useState("");
  const [location, setLocation] = useState("");
  const [pin, setPin] = useState("");
  const [district, setDistrict] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [panno, setPanNo] = useState("");
  const [capacity, setCapacity] = useState("");

  const organiseId = event.organiseId;
  const eventId = event._id;
  const eventname = event.name;
  const eventtype = event.type;
  const price = event.price;
  const eventcapacity = event.capacity;

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const toggleBooking = async () => {
    // Check for existing booking before showing form
    const response = await fetch(
      `http://localhost:5001/booking/check/${eventId}/${userId}`
    );
    const data = await response.json();
    setIsBooked(data.isBooked); // Update booking status

    if (!isBooked) {
      setShowBookingForm(!showBookingForm);
    } else {
      window.alert("You have already booked this event.");
    }
  };

  const toggleOff = () => {
    setShowBookingForm(false);
  };

  const validateForm = () => {
    const phoneRegex = /^[0-9]{10}$/;
    // const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    if (!phoneRegex.test(contact)) {
      window.alert("Please enter a valid 10-digit phone number.");
      return false;
    }

    // if (!panRegex.test(panno)) {
    //   window.alert('Please enter a valid PAN number (e.g., ABCDE1234F).');
    //   return false;
    // }

    return true;
  };

  useEffect(() => {
    if (selectedCapacity && event.capacity) {
      const index = event.capacity.indexOf(selectedCapacity);
      setSelectedPrice(event.price[index]);
    }
  }, [selectedCapacity, event.capacity, event.price]);

  const handleCapacityChange = (e) => {
    setSelectedCapacity(e.target.value);
    setSelectedPrice("");
  };

  const clearSelectedCapacityAndPrice = () => {
    setSelectedCapacity("");
    setSelectedPrice("");
  };

  const handleInputMethodChange = (e) => {
    const method = e.target.value;
    setIsManualCapacity(method === "manual");
    clearSelectedCapacityAndPrice();
  };

  const CreateBooking = async (e) => {
    e.preventDefault();

    // Get the current date
    const currentDate = new Date();

    // Parse the selected booking date from the input
    const selectedDate = new Date(bookingDate);

    // Compare selected date with current date
    if (selectedDate < currentDate) {
      window.alert("Please select a date that is not before the present date.");
      return;
    }

    // Additional form validation
    if (!validateForm()) {
      return;
    }
    const data = {
      name,
      userId,
      organiseId,
      eventId,
      bookingDate,
      noOfDays,
      location,
      pin,
      district,
      contact,
      email,
      panno,
      eventname,
      eventtype,
      // capacity,
      capacity: isManualCapacity ? capacity : selectedCapacity,
      price: selectedPrice,
      eventcapacity,
    };
    try {
      const response = await fetch(`http://localhost:5001/booking/post`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Data not submitted");
      }
      const myBooking = await response.json();
      console.log(myBooking);
      window.alert(`Booking Created`);
      navigate(`/mybooking/${userId}`);
    } catch (error) {
      console.error(error);
    }
  };

  if (!event.status) {
    // If event status is inactive, do not render the event
    return null;
  }

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (month < 10) {
      month = `0${month}`; // Pad month with zero if single digit
    }
    if (day < 10) {
      day = `0${day}`; // Pad day with zero if single digit
    }

    return `${year}-${month}-${day}`;
  };

  return (
    <EventContainer>
      <div>
        <EventsCard style={{ height: "auto" }}>
          <ImageEvent eventId={event._id} />
          <p style={{ display: "flex", justifyContent: "center" }}>
            <strong>{event.name.toUpperCase()}</strong>
          </p>
          {organizer ? (
            <OrganiserDetails>
              <P>
                <strong>Organizer Name:</strong> {organizer.name}
              </P>
              <P>
                <strong>Email:</strong> {organizer.email}
              </P>
            </OrganiserDetails>
          ) : (
            <p>Loading organizer details...</p>
          )}
          <div className="edetails" style={{ padding: "4px" }}>
            {/* <p>
              Event Created: {new Date(event.createdAt).toLocaleDateString()}
            </p> */}
            <p>Event type: {event.type}</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <p>Status: {event.status === true ? "Active" : "Inactive"}</p>
              <StarRating rating={event.averageRating} />
            </div>
          </div>

          <PopupOverlay show={showPopup} onClick={togglePopup}></PopupOverlay>
          <ViewDetailsBtn onClick={togglePopup}>
            {showPopup ? "Close Details" : "View Details"}
          </ViewDetailsBtn>
        </EventsCard>
      </div>
      <PopupCard show={showPopup}>
        <CloseBtn onClick={() => togglePopup()}>Close</CloseBtn>

        <ImageSlider eventId={event._id} />

        <EventInfo>
          <SecOne>
            <H2>{event.name.toUpperCase()}</H2>
            {/* <p>{event.eventdesc}</p> */}
          </SecOne>
          <SecTwo>
            <p>
              <strong>Created date:</strong>{" "}
              {new Date(event.createdAt).toLocaleDateString()}
            </p>
            {/* <p>
              <strong>Total Booking:</strong> {event.totalbooking}
            </p> */}
            <p>
              <strong>Description:</strong> {event.eventdesc}
            </p>
          </SecTwo>
        </EventInfo>
        <EventInfoOne>
          <EventInfo>
            <p className="list">
              <strong>Capacity:</strong>
              <select value={selectedCapacity} onChange={handleCapacityChange}>
                <option value="">Select Capacity</option>
                {event.capacity &&
                  event.capacity.map((capacity, index) => (
                    <option key={index} value={capacity}>
                      {capacity}
                    </option>
                  ))}
              </select>
            </p>
            <p className="list">
              <strong>Price:</strong>
              <select value={selectedPrice} readOnly>
                <option value="">
                  {selectedPrice || "Select Capacity First"}
                </option>
              </select>
            </p>
          </EventInfo>
          <EventInfo>
            <p>Event Type: {event.type}</p>
            <RatingDisplay rating={event.averageRating} />
          </EventInfo>
        </EventInfoOne>

        {/* 
        {isAuthenticated ? (
          <BookBtn onClick={() => toggleBooking()}>Book Now</BookBtn>
        ) : ( */}
        <>
          {/* <p style={{ color: "red" }}>
              For Booking Please Create a Account Or loggin First
            </p> */}
        </>
        {/* )} */}

        {isAuthenticated ? (
          !isBooked && (
            <BookBtn onClick={() => toggleBooking()}>Book Now</BookBtn>
          )
        ) : (
          <>
            <p style={{ color: "red" }}>
              For Booking Please Create a Account Or loggin First
            </p>
          </>
        )}
        {/* {isBooked && (
          <p style={{ color: "red" }}>You have already booked this event.</p>
        )} */}

        {showBookingForm && !isBooked && (
          <ContainerCreateBooking>
            <p>
              Notes: Payment Status/Booking Status will be updated by Event
              manager later. Sometimes prices will increase depending on the
              number of days...
            </p>
            <form onSubmit={CreateBooking}>
              <div>
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  required
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <label htmlFor="date">Pick a date</label>
                <input
                  type="date"
                  style={{
                    border: "1px solid #EAEAEA",
                    width: "50%",
                    padding: "7px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  required
                  min={getCurrentDate()}
                  onChange={(e) => setBookingDate(e.target.value)}
                  value={bookingDate}
                />

                <br></br>
                <label htmlFor="duration">Number of Days</label>
                <input
                  type="number"
                  placeholder="No of days"
                  required
                  onChange={(e) => setNoOfDays(e.target.value)}
                  value={noOfDays}
                />
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  placeholder="Event location"
                  required
                  onChange={(e) => setLocation(e.target.value)}
                  value={location}
                />
                {/* <label htmlFor="duration">
                  Capacity(Add maximun number to be attend the function)
                </label> */}
                {/* <input
                  type="text"
                  placeholder="Capacity"
                  onChange={(e) => setCapacity(e.target.value)}
                  value={capacity}
                />
                <label>
                  Capacity:
                  <select
                    value={selectedCapacity}
                    onChange={handleCapacityChange}
                    required
                  >
                    <option value="">Select Capacity</option>
                    {event.capacity.map((cap, index) => (
                      <option key={index} value={cap}>
                        {cap}
                      </option>
                    ))}
                  </select>
                </label>
                <p
                  style={{
                    padding: "8px",
                    margin: "20px",
                    background: "#CCD1D1",
                    width: " 200px",
                    borderRadius: "4px",
                    color: "red",
                  }}
                >
                  Price: {selectedPrice}
                </p> */}
                <label>
                  Choose capacity input method:
                  <select
                    value={isManualCapacity ? "manual" : "dropdown"}
                    // onChange={(e) =>
                    //   setIsManualCapacity(e.target.value === "manual")
                    // }
                    onChange={handleInputMethodChange}
                  >
                    <option value="dropdown">Select from dropdown</option>
                    <option value="manual">Enter manually</option>
                  </select>
                </label>
                {isManualCapacity ? (
                  <>
                    <label>Capacity:</label>
                    <input
                      type="text"
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                      required
                    />
                  </>
                ) : (
                  <>
                    <label>Select Capacity:</label>
                    <select
                      value={selectedCapacity}
                      onChange={handleCapacityChange}
                      required
                    >
                      <option value="">--Select Capacity--</option>
                      {event.capacity.map((cap, index) => (
                        <option key={index} value={cap}>
                          {cap}
                        </option>
                      ))}
                    </select>
                    <p
                      style={{
                        padding: "8px",
                        margin: "20px",
                        background: "#CCD1D1",
                        width: " 200px",
                        borderRadius: "4px",
                        color: "red",
                      }}
                    >
                      Selected Price: {selectedPrice}
                    </p>
                  </>
                )}
                <label htmlFor="pin">Pin Number</label>
                <input
                  type="number"
                  placeholder="Pin number"
                  required
                  onChange={(e) => setPin(e.target.value)}
                  value={pin}
                />
                <label htmlFor="district">District</label>
                <input
                  type="text"
                  placeholder="District"
                  required
                  onChange={(e) => setDistrict(e.target.value)}
                  value={district}
                />
                <label htmlFor="contact">Contact-No</label>
                <input
                  type="tel"
                  placeholder="Your Contact Number"
                  required
                  onChange={(e) => setContact(e.target.value)}
                  value={contact}
                />
                <label htmlFor="email">Email Id</label>
                <input
                  type="email"
                  placeholder="Email Id"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <label htmlFor="panno">Pan Number</label>
                <input
                  type="text"
                  required
                  placeholder="Pan card no"
                  onChange={(e) => setPanNo(e.target.value)}
                  value={panno}
                />
              </div>
              <BtnSectionBook>
                <BookButton className="submit-btn" type="submit">
                  Book
                </BookButton>
                <button onClick={() => toggleOff()}>Close</button>
              </BtnSectionBook>
            </form>
          </ContainerCreateBooking>
        )}
        {isBooked && (
          <p style={{ color: "red" }}>You have already booked this event.</p>
        )}
        {!showBookingForm && (
          <div>
            <Review eventId={event._id} />
          </div>
        )}
      </PopupCard>
    </EventContainer>
  );
};

const BookButton = styled.button``;
