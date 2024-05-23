import React, { useState } from "react";
import styled from "styled-components";

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

const ServiceContainer = styled.div`
  margin-bottom: 20px;
`;

const ServiceTitle = styled.h3`
  font-size: 20px;
  color: #be0b0b;
`;

const Service = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const RemoveButton = styled.button`
  width: 22%;
  height: 45px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #ff4d4d;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #ff1a1a;
  }
`;

export const Myorganization = () => {
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [address, setAddress] = useState("");
  const [services, setServices] = useState([
    { serviceName: "", description: "" },
  ]);

  const userId = localStorage.getItem("User");

  const handleServiceChange = (index, event) => {
    const updatedServices = [...services];
    updatedServices[index][event.target.name] = event.target.value;
    setServices(updatedServices);
  };

  const addService = () => {
    setServices([...services, { serviceName: "", description: "" }]);
  };

  const removeService = (index) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const data = {
      companyName,
      description,
      ownerName,
      contactEmail,
      contactPhone,
      userId,
      services,
    };
    try {
      const response = await fetch(`http://localhost:5001/organise/post`, {
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
    } catch (error) {
      console.error(error);
      alert("Error submitting data: " + error.message);
    }
  };

  return (
    <FormContainer>
      <Title>Create Organization</Title>
      <Form onSubmit={handlesubmit}>
        <Label htmlFor="companyName">Organize Name:</Label>
        <Input
          type="text"
          name="companyName"
          onChange={(e) => setCompanyName(e.target.value)}
          value={companyName}
        />

        <Label htmlFor="contactEmail">Organize Email:</Label>
        <Input
          type="email"
          name="contactEmail"
          onChange={(e) => setContactEmail(e.target.value)}
          value={contactEmail}
        />

        <Label htmlFor="ownerName">Organize Owner:</Label>
        <Input
          type="text"
          name="ownerName"
          onChange={(e) => setOwnerName(e.target.value)}
          value={ownerName}
        />

        <Label htmlFor="contactPhone">Phone number:</Label>
        <Input
          type="tel"
          name="contactPhone"
          onChange={(e) => setContactPhone(e.target.value)}
          value={contactPhone}
        />

        <Label htmlFor="address">Office Address:</Label>
        <Input
          type="text"
          name="address"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        />

        <Label htmlFor="description">Description:</Label>
        <Input
          type="text"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />

        <ServiceContainer>
          <ServiceTitle>Services:</ServiceTitle>
          {services.map((service, index) => (
            <Service key={index}>
              <Label htmlFor={`serviceName-${index}`}>Service Name:</Label>
              <Input
                type="text"
                name="serviceName"
                value={service.serviceName}
                onChange={(e) => handleServiceChange(index, e)}
              />
              <Label htmlFor={`serviceDescription-${index}`}>
                Description:
              </Label>
              <Input
                type="text"
                name="description"
                value={service.description}
                onChange={(e) => handleServiceChange(index, e)}
              />
              <RemoveButton type="button" onClick={() => removeService(index)}>
                Remove
              </RemoveButton>
            </Service>
          ))}
          <Button type="button" onClick={addService}>
            Add Service
          </Button>
        </ServiceContainer>

        <Button type="submit">Submit</Button>
      </Form>
    </FormContainer>
  );
};

// export default Myorganization;
