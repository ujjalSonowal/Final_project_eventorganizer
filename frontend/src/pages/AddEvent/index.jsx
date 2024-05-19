import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { Link, useNavigate } from "react-router-dom";

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: auto; /* Enable scrolling if content overflows */
`;

const FormWrapper = styled.div`
  margin-top: 200px;
  width: 800px;
  margin-bottom: 100px;
  max-width: 800px;
  /* max-height: 100vh; */
`;

const Form = styled.form`
  background-color: #f9f9f9;
  /* margin: 50px; */
  /* margin-bottom: 40px; */
  width: 80%;
  padding-left: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const FormGroup = styled.div`
  /* display: flex; */
  /* justify-content: center; */
  align-items: center;
  /* padding: 0; */
  width: 80%;
  margin-bottom: 5px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 60%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  width: 90%;

  padding: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 50%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export const AddEvent = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [capacity, setCapacity] = useState("");
  const [status, setStatus] = useState("false");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  // const [image, setImage] = useState(null);
  // const [video, setVideo] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [images, setImage] = useState(null);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setImage(selectedFile);
  };

  // const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // formData.append("name", name);
    // formData.append("type", type);
    // formData.append("capacity", capacity);
    // formData.append("status", status);
    // formData.append("price", price);
    // formData.append("description", description);
    formData.append("images", images);

    const event = { name, type, capacity, status, price, description };

    try {
      const response = await fetch(`http://localhost:5000/events/create`, {
        method: "POST",
        body: JSON.stringify(event),
        headers: {
          "Content-type": "application/json",
        },
      });

      axios
        .post("http://localhost:5000/images/upload", formData)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error);
      }
      console.log("Event created successfully");
      // Optionally, handle success (e.g., show a success message)
      setSuccessMessage("Event created successfully");
      setName("");
      setType("");
      setStatus(false);
      setPrice("");
      setCapacity("");
      setDescription("");
      setImage(null);
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      // navigate("/myevent");
      // window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to create event");
    }
  };

  return (
    <FormContainer>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Event Name:</Label>
            <Input
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </FormGroup>
          <FormGroup>
            <Label>Event Type:</Label>
            <Input
              type="text"
              name="type"
              onChange={(e) => setType(e.target.value)}
              value={type}
            />
          </FormGroup>
          {/* <FormGroup>
            <Label>Created Date:</Label>
            <DatePicker
              selected={formData.createdDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
            />
          </FormGroup> */}
          <FormGroup>
            <Label>Status:</Label>
            <select
              // type="checkbox"
              id="status"
              name="status"
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            >
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>
          </FormGroup>
          <FormGroup>
            <Label>Capacity:</Label>
            <Input
              type="text"
              name="capacity"
              onChange={(e) => setCapacity(e.target.value)}
              value={capacity}
            />
          </FormGroup>
          {/* <FormGroup>
          <Label>Total Booking:</Label>
          <Input
            type="number"
            name="TotalBooking"
            value={formData.TotalBooking}
            onChange={handleChange}
            required
          />
        </FormGroup> */}
          <FormGroup>
            <Label>Price:</Label>
            <Input
              type="number"
              name="price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </FormGroup>
          {/* <FormGroup>
            <Label>Number of Comments:</Label>
            <Input
              type="number"
              name="noofcomment"
              value={formData.noofcomment}
              onChange={handleChange}
              required
            />
          </FormGroup> */}
          <FormGroup>
            <Label>Description:</Label>
            <TextArea
              type="text"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </FormGroup>
          <FormGroup enctype="multipart/form-data">
            <Label>Image:</Label>
            <Input
              type="file"
              name="images"
              accept="image/*"
              onChange={handleImageChange}
            />
          </FormGroup>

          {/* <FormGroup>
            <Label>Video:</Label>
            <Input
              type="file"
              name="video"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
            />
          </FormGroup> */}
          <Button type="submit">Create Event</Button>
        </Form>
      </FormWrapper>
    </FormContainer>
  );
};

// export default AddEvent;
