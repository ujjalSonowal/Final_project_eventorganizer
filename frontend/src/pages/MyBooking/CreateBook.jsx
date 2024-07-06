import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  width: 90%;
  max-width: 800px;
  margin: auto;
`;

const FormField = styled.div`
  margin-bottom: 10px;
  label {
    display: block;
    margin-bottom: 5px;
  }
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;

const SubmitButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`;

export const CreateBook = () => {
  const { eventId } = useParams();
  const [name, setname] = useState("");
  const [bookingDate, setbookingDate] = useState("");
  const [noofday, setnoofday] = useState("");
  const [capacity, setCapacity] = useState("");
  const [location, setlocation] = useState("");
  const [pin, setpin] = useState("");
  const [district, setdistrict] = useState("");
  const [contact, setcontact] = useState("");
  const [email, setemail] = useState("");
  const [panno, setpanno] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("User");

  const Createbooking = async (e) => {
    e.preventDefault();
    const data = {
      name,
      userId,
      eventId,
      bookingDate,
      noofday,
      capacity,
      location,
      pin,
      district,
      contact,
      email,
      panno,
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
        throw new Error("Data not submitted ");
      }
      const mybooking = await response.json();
      console.log(mybooking);
      window.alert(`Booking Submitted`);
      navigate(`/mybooking/${userId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormContainer>
      <h2>Book Event</h2>
      <form onSubmit={Createbooking}>
        <FormField>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            required
            onChange={(e) => setname(e.target.value)}
            value={name}
          />
        </FormField>
        <FormField>
          <label htmlFor="date">Pick a date</label>
          <input
            type="date"
            required
            onChange={(e) => setbookingDate(e.target.value)}
            value={bookingDate}
          />
        </FormField>
        <FormField>
          <label htmlFor="duration">Number of Days</label>
          <input
            type="number"
            placeholder="No of days"
            required
            onChange={(e) => setnoofday(e.target.value)}
            value={noofday}
          />
        </FormField>
        <FormField>
          <label htmlFor="duration">
            Capacity(Add maximun number to be attend the function)
          </label>
          <input
            type="number"
            placeholder="Capacity"
            required
            onChange={(e) => setCapacity(e.target.value)}
            value={capacity}
          />
        </FormField>
        <FormField>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            placeholder="Event location"
            required
            onChange={(e) => setlocation(e.target.value)}
            value={location}
          />
        </FormField>
        <FormField>
          <label htmlFor="pin">Pin Number</label>
          <input
            type="number"
            placeholder="Pin number"
            required
            onChange={(e) => setpin(e.target.value)}
            value={pin}
          />
        </FormField>
        <FormField>
          <label htmlFor="district">District</label>
          <input
            type="text"
            placeholder="District"
            required
            onChange={(e) => setdistrict(e.target.value)}
            value={district}
          />
        </FormField>
        <FormField>
          <label htmlFor="contect no">Contact-No</label>
          <input
            type="tel"
            placeholder="Your Contact Number"
            required
            onChange={(e) => setcontact(e.target.value)}
            value={contact}
          />
        </FormField>
        <FormField>
          <label htmlFor="email">Email Id</label>
          <input
            type="email"
            placeholder="Email Id"
            required
            onChange={(e) => setemail(e.target.value)}
            value={email}
          />
        </FormField>
        <FormField>
          <label htmlFor="pan no">Pan Number</label>
          <input
            type="text"
            required
            placeholder="Pan card no"
            onChange={(e) => setpanno(e.target.value)}
            value={panno}
          />
        </FormField>
        <div className="btn-section-book">
          <SubmitButton type="submit">Book</SubmitButton>
          <button onClick={() => navigate(-1)}>Close</button>
        </div>
      </form>
    </FormContainer>
  );
};

// export default BookingForm;
