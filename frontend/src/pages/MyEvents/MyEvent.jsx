import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Events } from "../../components/Myevents/Events";

const EventsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const EventsItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

export const MyEvent = () => {
  const [events, setEvents] = useState([]);
  const currentuser = localStorage.getItem("User");

  useEffect(() => {
    async function getEvent() {
      const response = await fetch(
        `http://localhost:5001/events/my/event/${currentuser}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const myevn = await response.json();
      setEvents(myevn);
    }
    getEvent();
  }, [currentuser]);

  return (
    <EventsContainer>
      <Title>My Events</Title>
      <EventsItems>
        {events &&
          events.map((event) => <Events key={event._id} event={event} />)}
      </EventsItems>
    </EventsContainer>
  );
};
