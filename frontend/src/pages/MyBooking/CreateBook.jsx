import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FormContainer = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
`;

const Title = styled.h1`
  text-align: center;
  color: #0c7890;
  margin-bottom: 20px;
  font-size: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Select = styled.select`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

export const CreateBook = () => {
  const [name, setName] = useState("");
  //   const [userId, setUserId] = useState(localStorage.getItem("User") || "");
  //   const [eventId, setEventId] = useState("");
  //   const [organiseId, setOrganiseId] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [noOfDay, setNoOfDay] = useState("");
  const [location, setLocation] = useState("");
  const [pin, setPin] = useState("");
  const [district, setDistrict] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [panno, setPanno] = useState("");
  const [price, setPrice] = useState("");
  //   const [status, setStatus] = useState("Pending");
  //   const [paymentStatus, setPaymentStatus] = useState("Pending");
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");

  const userId = localStorage.getItem("User");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      userId,
      //   eventId: event._id,
      //   organiseId: organiseId._id,
      bookingDate,
      noOfDay,
      location,
      pin,
      district,
      contact,
      email,
      panno,
      //   bookingstatus: false,
      //   Status: status,
      price,
      //   paymentstatus: paymentStatus,
      eventname: eventName,
      eventtype: eventType,
    };
    try {
      const response = await fetch(`http://localhost:5001/booking/addbooking`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Data not submitted");
      }
      const result = await response.json();
      console.log(result);
      alert("Data submitted successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Error submitting data: " + error.message);
    }
  };

  return (
    <FormContainer>
      <Title>Create Booking</Title>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="name">Name:</Label>
        <Input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        {/* <Label htmlFor="eventId">Event ID:</Label>
        <Input
          type="text"
          name="eventId"
          onChange={(e) => setEventId(e.target.value)}
          value={eventId}
        /> */}

        {/* <Label htmlFor="organiseId">Organiser ID:</Label>
        <Input
          type="text"
          name="organiseId"
          onChange={(e) => setOrganiseId(e.target.value)}
          value={organiseId}
        /> */}

        <Label htmlFor="bookingDate">Event Date:</Label>
        <Input
          type="date"
          name="bookingDate"
          onChange={(e) => setBookingDate(e.target.value)}
          value={bookingDate}
        />

        <Label htmlFor="noOfDay">Number of Days:</Label>
        <Input
          type="number"
          name="noOfDay"
          onChange={(e) => setNoOfDay(e.target.value)}
          value={noOfDay}
        />

        <Label htmlFor="location">Location:</Label>
        <Input
          type="text"
          name="location"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
        />

        <Label htmlFor="pin">Pin Code:</Label>
        <Input
          type="number"
          name="pin"
          onChange={(e) => setPin(e.target.value)}
          value={pin}
        />

        <Label htmlFor="district">District:</Label>
        <Input
          type="text"
          name="district"
          onChange={(e) => setDistrict(e.target.value)}
          value={district}
        />

        <Label htmlFor="contact">Contact Number:</Label>
        <Input
          type="tel"
          name="contact"
          onChange={(e) => setContact(e.target.value)}
          value={contact}
        />

        <Label htmlFor="email">Email:</Label>
        <Input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <Label htmlFor="panno">PAN Number:</Label>
        <Input
          type="text"
          name="panno"
          onChange={(e) => setPanno(e.target.value)}
          value={panno}
        />

        <Label htmlFor="price">Price:</Label>
        <Input
          type="number"
          name="price"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />

        {/* <Label htmlFor="status">Status:</Label>
        <Select
          name="status"
          onChange={(e) => setStatus(e.target.value)}
          value={status}
        >
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </Select> */}

        {/* <Label htmlFor="paymentStatus">Payment Status:</Label>
        <Select
          name="paymentStatus"
          onChange={(e) => setPaymentStatus(e.target.value)}
          value={paymentStatus}
        >
          <option value="Pending">Pending</option>
          <option value="Unpaid">Unpaid</option>
          <option value="Paid">Paid</option>
        </Select> */}

        <Label htmlFor="eventName">Event Name:</Label>
        <Input
          type="text"
          name="eventName"
          onChange={(e) => setEventName(e.target.value)}
          value={eventName}
        />

        <Label htmlFor="eventType">Event Type:</Label>
        <Input
          type="text"
          name="eventType"
          onChange={(e) => setEventType(e.target.value)}
          value={eventType}
        />

        <Button type="submit">Submit</Button>
      </Form>
    </FormContainer>
  );
};
