import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const TableContainer = styled.div`
  width: 80%;
  max-width: 100%;
  margin: 20px 0;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Thead = styled.thead`
  background-color: #f4f4f4;
`;

const Th = styled.th`
  padding: 10px;
  border: 1px solid #ddd;
`;

const Tbody = styled.tbody``;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;
// const Tr = styled.tr`
//   background-color: #f9f9f9;
// `;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
`;

const Button = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.delete ? "#ff4d4d" : "#4CAF50")};
  color: #fff;
  &:hover {
    background-color: ${(props) => (props.delete ? "#ff1a1a" : "#45a049")};
  }
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

export const Events = ({ event }) => {
  const [updateForm, setUpdateForm] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("User");

  const [name, setName] = useState(event.name);
  const [type, setType] = useState(event.type);
  const [price, setPrice] = useState(event.price);
  const [capacity, setCapacity] = useState(event.capacity);

  const eventId = event._id;

  const toggleForm = () => {
    setUpdateForm(!updateForm);
  };

  const toggleOff = () => {
    setUpdateForm(false);
  };

  const handleUpdate = async (e) => {
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
      setUpdateForm(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/events/delete/${eventId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete");
      }
      navigate(`/myevent/${userId}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <TableContainer>
        <Title>My Events</Title>
        <Table>
          <Thead>
            <Tr>
              <Th>Event Name</Th>
              <Th>Event Type</Th>
              <Th>Capacity</Th>
              <Th>Price</Th>
              <Th>Status</Th>
              <Th>Created Date</Th>
              <Th>Total Booking</Th>
              <Th>Rating</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{event.name}</Td>
              <Td>{event.type}</Td>
              <Td>{event.capacity}</Td>
              <Td>{event.price}</Td>
              <Td>{event.status ? "Active" : "Inactive"}</Td>
              <Td>{event.createOn}</Td>
              <Td>{event.totalbooking}</Td>
              <Td>{event.rating}</Td>
              <Td>
                <Button onClick={toggleForm}>Edit</Button>
                <Button delete onClick={handleDelete}>
                  Delete
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>

      {updateForm && (
        <EditPopup>
          <h2>Edit Event</h2>
          <Form onSubmit={handleUpdate}>
            <Label htmlFor="eventName">Event Name:</Label>
            <Input
              type="text"
              id="eventName"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Label htmlFor="eventType">Event Type:</Label>
            <Input
              type="text"
              id="eventType"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
            <Label htmlFor="capacity">Capacity:</Label>
            <Input
              type="number"
              id="capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
            <Label htmlFor="price">Price:</Label>
            <Input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Button type="submit">Update</Button>
            <Button type="button" onClick={toggleOff}>
              Cancel
            </Button>
          </Form>
        </EditPopup>
      )}
    </Container>
  );
};
