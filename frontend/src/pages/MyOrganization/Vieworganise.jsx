import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const OrganiseContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
`;

const OrganiseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin: 0;
  color: #333;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => (props.delete ? "#ff4d4d" : "#4CAF50")};
  color: white;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.delete ? "#ff1a1a" : "#45a049")};
  }
`;

const OrgTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: right;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
`;

const FormPopupEvent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: #fff;
  border: 2px solid #ddd;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const FormContainerEvent = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Items = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;
const EditPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: #fff;
  border: 2px solid #ddd;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

export const Vieworganise = () => {
  const [organise, setOrganise] = useState({});
  const userId = localStorage.getItem("User");
  const navigate = useNavigate();
  const [updateForm, setUpdateForm] = useState(false);
  const [ownerName, setOwnerName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  const toggleOrganiseForm = () => {
    setUpdateForm(!updateForm);
    setOwnerName(organise.ownerName);
    setContactEmail(organise.contactEmail);
    setContactPhone(organise.contactPhone);
    setAddress(organise.address);
    setDescription(organise.description);
  };

  const toggleOff = () => {
    setUpdateForm(false);
  };

  const handleOrganiseUpdate = async (e) => {
    e.preventDefault();
    const data = {
      ownerName,
      contactEmail,
      contactPhone,
      address,
      description,
    };
    try {
      const response = await fetch(
        `http://localhost:5001/organise/update/${organise._id}`,
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
      navigate(`/myorg/${userId}`);
      setUpdateForm(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/events/delete/${organise._id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete");
      }
      navigate(`/myorg/${userId}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getOrg() {
      try {
        const response = await fetch(
          `http://localhost:5001/organise/myorg/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch organizer details");
        }
        const myorg = await response.json();
        setOrganise(myorg);
      } catch (error) {
        console.error(error);
      }
    }
    getOrg();
  }, [userId]);

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { userId, name, type, capacity, price };
    try {
      const response = await fetch(`http://localhost:5000/events/post`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error);
      }
      setIsFormOpen(false);
      navigate("/");
    } catch (error) {
      console.log("could not submit the form data");
    }
  };

  return (
    <OrganiseContainer>
      <OrganiseHeader>
        <Title>Organizer Details</Title>
        <ButtonGroup>
          <Button delete onClick={handleDelete}>
            Delete
          </Button>
          <Button onClick={toggleOrganiseForm}>Update</Button>
        </ButtonGroup>
      </OrganiseHeader>
      <OrgTable>
        <tbody>
          <tr>
            <Th>Owner Name:</Th>
            <Td>{organise.ownerName}</Td>
          </tr>
          <tr>
            <Th>Contact Email:</Th>
            <Td>{organise.contactEmail}</Td>
          </tr>
          <tr>
            <Th>Contact Phone:</Th>
            <Td>{organise.contactPhone}</Td>
          </tr>
          <tr>
            <Th>Address:</Th>
            <Td>{organise.address}</Td>
          </tr>
          <tr>
            <Th>Description:</Th>
            <Td>{organise.description}</Td>
          </tr>
        </tbody>
      </OrgTable>

      {updateForm && (
        <EditPopup>
          <h2>Edit Organization</h2>
          <Form onSubmit={handleOrganiseUpdate}>
            <Label htmlFor="name">Owner Name:</Label>
            <Input
              type="text"
              id="ownerName"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
            />
            <Label htmlFor="email">Contact Email:</Label>
            <Input
              type="email"
              id="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
            <Label htmlFor="phone">Contact Phone:</Label>
            <Input
              type="number"
              id="phone"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
            />
            <Label htmlFor="address">Address:</Label>
            <Input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Label htmlFor="description">Description:</Label>
            <Input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button type="submit">Update</Button>
            <Button type="button" onClick={toggleOff}>
              Cancel
            </Button>
          </Form>
        </EditPopup>
      )}
      {isFormOpen && (
        <FormPopupEvent>
          <FormContainerEvent>
            <Form onSubmit={handleSubmit}>
              <h2>Add Event details</h2>
              <Label>
                Event name:
                <Input
                  id="etn"
                  type="text"
                  placeholder="Event Name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </Label>
              <Label>
                Event Type:
                <Input
                  id="etn"
                  type="text"
                  placeholder="Type"
                  onChange={(e) => setType(e.target.value)}
                  value={type}
                />
              </Label>
              <Label>
                Person Capacity:
                <Input
                  id="etn"
                  type="number"
                  placeholder="Capacity"
                  onChange={(e) => setCapacity(e.target.value)}
                  value={capacity}
                />
              </Label>
              <Label>
                Price:
                <Input
                  id="etn"
                  type="number"
                  placeholder="price"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
              </Label>
              <Button type="submit">Save</Button>
              <Button type="button" onClick={toggleForm}>
                Cancel
              </Button>
            </Form>
          </FormContainerEvent>
        </FormPopupEvent>
      )}
      <Items>
        <Button onClick={toggleForm}>Add Event</Button>
        <Link to={`/myevent/${userId}`}>
          <Button>View Events</Button>
        </Link>
      </Items>
    </OrganiseContainer>
  );
};
