import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Events } from "../../components/Events/Events";
import "./eventorganise.css";
import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";

export const EventsOrganise = () => {
  const { id: organiseId } = useParams();
  const [events, setevents] = useState("");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/organise"); // Adjust the path to match your admin home page route
  };

  useEffect(() => {
    async function getevents() {
      try {
        const response = await fetch(
          `http://localhost:5001/events/organise/events/${organiseId}`
        );
        if (!response.ok) {
          console.log("data not found");
        }
        const orgevents = await response.json();
        console.log(orgevents);
        setevents(orgevents);
      } catch (error) {
        console.log("somthings error");
      }
    }

    getevents();
    return;
  }, [organiseId]);

  if (!events) return <div> Loading...... </div>;
  if (events.length === 0) {
    return (
      <div>
        {" "}
        <BackButton onClick={handleBack}>
          <FaArrowLeft /> Back to Organizer Page
        </BackButton>
        There is nothing to show any events to user
      </div>
    );
  }
  return (
    <>
      <BackButton onClick={handleBack}>
        <FaArrowLeft /> Back to Organizer Page
      </BackButton>

      <div className="event-card-container-organise">
        <div className="cards-items-organise">
          {events &&
            events.map((event) => <Events key={event._id} event={event} />)}
        </div>
      </div>
    </>
  );
};
const BackButton = styled.button`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px 20px;
  margin-left: 10px;
  margin-top: 10px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #555;
  }

  svg {
    margin-right: 10px;
  }
`;
