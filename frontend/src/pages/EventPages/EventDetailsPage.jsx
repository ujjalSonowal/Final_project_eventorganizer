// src/pages/EventPages/EventDetailsPage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { EventDetails } from "../../components/Events/EventDetails";

const EventDetailsContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

export const EventDetailsPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    async function fetchEventDetails() {
      const response = await fetch(`http://localhost:5001/events/${id}`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const eventData = await response.json();
      setEvent(eventData);
    }

    fetchEventDetails();
  }, [id]);

  return (
    <EventDetailsContainer>
      {/* {event ? (
        <>
          <h1>{event.name.toUpperCase()}</h1>
          <p>Created On: {event.createOn}</p>
          <p>Type: {event.type}</p>
          <p>Status: {event.status}</p>
          <p>Description: {event.eventdesc}</p>
          <p>Total Booking: {event.totalbooking}</p>
          <p>Capacity: {event.capacity}</p>
          <p>Price: {event.price}</p>
         
        </>
      ) : (
        <p>Loading event details...</p>
      )} */}
      {event ? (
        <>
          <EventDetails event={event} />
        </>
      ) : (
        <p>Loading event details...</p>
      )}
    </EventDetailsContainer>
  );
};

// export default EventDetailsPage;
