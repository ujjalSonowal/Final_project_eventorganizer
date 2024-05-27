import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const BookingContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const BookingCard = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 20px;
  margin-top: 20px;
  /* width: 100%; */
  /* width: calc(100% - 20px); */
  /* @media (min-width: 576px) {
    width: calc(50% - 20px);
  }
  @media (min-width: 768px) {
    width: calc(33.33% - 20px);
  } */
`;

const Title = styled.h2`
  color: #333;
  font-size: 24px;
  font-family: Arial, sans-serif;
  margin-bottom: 20px;
`;

const BookingDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;

  p {
    margin: 10px 20px 10px 0;
    font-size: 16px;
    color: #555;
  }
`;

const BtnSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  a {
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;

    &:hover {
      background-color: #0056b3;
    }
  }

  .cancel-btn {
    background-color: #dc3545;
    &:hover {
      background-color: #c82333;
    }
  }
`;

const FormUpdate = styled.div`
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 5px;
  }

  input {
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 15px;
    padding: 10px;
  }

  button {
    background-color: #28a745;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    padding: 10px;
    margin-top: 10px;

    &:hover {
      background-color: #218838;
    }

    &.cancelupdate {
      background-color: #ffc107;
      &:hover {
        background-color: #e0a800;
      }
    }
  }
`;

export const Mybook = ({ booking }) => {
  const [updateform, setupdateform] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("User");

  const [name, setname] = useState(booking.name);
  const [bookingDate, setbookingDate] = useState(booking.bookingDate);
  const [location, setlocation] = useState(booking.location);
  const [pin, setpin] = useState(booking.pin);
  const [email, setemail] = useState(booking.email);
  const [district, setdistrict] = useState(booking.district);
  const [contact, setcontact] = useState(booking.contact);
  const [eventtype, setEventType] = useState(booking.eventtype);

  const bookingId = booking._id;

  const toggleform = () => {
    setupdateform(!updateform);
  };

  const toggleoff = () => {
    setupdateform(false);
  };

  const handleupdate = async (e) => {
    e.preventDefault();
    const data = {
      name,
      bookingDate,
      location,
      pin,
      email,
      district,
      contact,
      eventtype,
    };
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
      navigate(`/mybooking/${userId}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <BookingContainer>
        <BookingCard>
          <Title>Booked Event : {booking.eventname}</Title>
          <BookingDetails>
            <p>
              <strong>Name:</strong> {booking.name}
            </p>
            <p>
              <strong>Event Date:</strong> {booking.bookingDate}
            </p>
            <p>
              <strong>Booking Date:</strong> {booking.createdAt}
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
            <p>
              <strong>Booking Status:</strong>{" "}
              {booking.bookingstatus ? "Confirmed" : "Pending"}
            </p>
            <p>
              <strong>Status:</strong> {booking.Status}
            </p>
            <p>
              <strong>Price:</strong>₹- {booking.price}
            </p>
            <p>
              <strong>Payment Status:</strong> {booking.paymentstatus}
            </p>
            <p>
              <strong>Event Type:</strong> {booking.eventtype}
            </p>
          </BookingDetails>
          <BtnSection>
            <Link className="cancel-btn" onClick={handleDelete}>
              Cancel Booking
            </Link>
            <Link className="update-btn" onClick={() => toggleform()}>
              Update Details
            </Link>
          </BtnSection>
          {updateform && (
            <FormUpdate>
              <Form onSubmit={handleupdate}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
                <label htmlFor="date">Event date</label>
                <input
                  type="date"
                  onChange={(e) => setbookingDate(e.target.value)}
                  value={bookingDate}
                />
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  onChange={(e) => setlocation(e.target.value)}
                  value={location}
                />
                <label htmlFor="pin">Pin</label>
                <input
                  type="number"
                  onChange={(e) => setpin(e.target.value)}
                  value={pin}
                />
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  onChange={(e) => setemail(e.target.value)}
                  value={email}
                />
                <label htmlFor="district">District</label>
                <input
                  type="text"
                  onChange={(e) => setdistrict(e.target.value)}
                  value={district}
                />
                <label htmlFor="eventtype">Event Type</label>
                <input
                  type="text"
                  onChange={(e) => setEventType(e.target.value)}
                  value={eventtype}
                />
                <label htmlFor="contact">Contact</label>
                <input
                  type="text"
                  onChange={(e) => setcontact(e.target.value)}
                  value={contact}
                />
                <button type="submit">Update</button>
                <button
                  type="button"
                  className="cancelupdate"
                  onClick={() => toggleoff()}
                >
                  Cancel
                </button>
              </Form>
            </FormUpdate>
          )}
        </BookingCard>
      </BookingContainer>
    </>
  );
};
