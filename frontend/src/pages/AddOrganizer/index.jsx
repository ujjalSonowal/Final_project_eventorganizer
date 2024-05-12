import React, { useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";

// const FormContainer = styled.div`
//   max-width: 600px;
//   margin: 0 auto;
//   padding: 20px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   background-color: #f9f9f9;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   overflow-y: auto;
// `;
const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* overflow-y: auto; */
  /* height: 100vh; */
  overflow: auto; /* Enable scrolling if content overflows */
`;

const Form = styled.form`
  background-color: #f9f9f9;
  /* margin: 10px; */
  /* margin-bottom: 50px; */
  width: 40%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* height: 100%; Fill the available space */
`;

const ProfileImage = styled.img`
  margin-left: 40%;
  width: 80px;
  height: 80px;
  border: 1px solid black;
  border-radius: 50%; /* Circular shape */
  cursor: pointer;
`;
const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export const AddOrganizer = () => {
  const [organization, setOrganization] = useState({
    companyName: "",
    description: "",
    ownerName: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    feedback: "",
    rating: 0,
    image: null, // new field for image upload
  });
  const fileInputRef = useRef(null);
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setOrganization({ ...organization, image: e.target.files[0] });
    } else {
      const { name, value } = e.target;
      setOrganization({ ...organization, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("companyName", organization.companyName);
      formData.append("description", organization.description);
      formData.append("ownerName", organization.ownerName);
      formData.append("contactEmail", organization.contactEmail);
      formData.append("contactPhone", organization.contactPhone);
      formData.append("address", organization.address);
      // formData.append("feedback", organization.feedback);
      formData.append("rating", organization.rating);
      formData.append("image", organization.image);

      await axios.post("/api/organizations", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setOrganization({
        companyName: "",
        description: "",
        ownerName: "",
        contactEmail: "",
        contactPhone: "",
        address: "",
        rating: 0,
        image: null,
      });
      alert("Organization added successfully!");
    } catch (error) {
      console.error("Error adding organization:", error);
      alert("An error occurred while adding organization. Please try again.");
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <FormContainer>
      <Form>
        <ProfileImage
          src={
            organization.image
              ? URL.createObjectURL(organization.image)
              : "placeholder.jpg"
          }
          alt="Profile"
          onClick={handleImageClick}
        />
        <Input
          ref={fileInputRef}
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
        />

        <Input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={organization.companyName}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="description"
          placeholder="Description"
          value={organization.description}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="ownerName"
          placeholder="Owner Name"
          value={organization.ownerName}
          onChange={handleChange}
        />
        <Input
          type="email"
          name="contactEmail"
          placeholder="Contact Email"
          value={organization.contactEmail}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="contactPhone"
          placeholder="Contact Phone"
          value={organization.contactPhone}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="address"
          placeholder="Address"
          value={organization.address}
          onChange={handleChange}
        />
        {/* <Input
          type="text"
          name="feedback"
          placeholder="Feedback"
          value={organization.feedback}
          onChange={handleChange}
        /> */}
        <Button type="submit" onClick={handleSubmit}>
          Add Organization
        </Button>
      </Form>
    </FormContainer>
  );
};

// export default AddOrganizer;
