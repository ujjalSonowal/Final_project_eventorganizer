import React, { useState, useEffect } from "react";
import { Events } from "../../components/Events/Events";
import "./style.css";
import { colors } from "@mui/material";

export const Eventpage = () => {
  const [events, setEvents] = useState(null);
  const [organizers, setOrganizers] = useState({});

  useEffect(() => {
    async function getEventRecords() {
      try {
        const response = await fetch(`http://localhost:5001/events`);
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          console.error(message);
          return;
        }
        const allevents = await response.json();
        setEvents(allevents);

        const orgdetails = {};
        const organizerPromises = allevents.map(async (event) => {
          const organizerResponse = await fetch(
            `http://localhost:5001/organise/${event.organiseId}`
          );
          if (organizerResponse.ok) {
            const organizer = await organizerResponse.json();
            orgdetails[event.organiseId] = organizer;
          } else {
            console.error(
              `Failed to fetch organizer details for ID ${event.organiseId}`
            );
          }
        });

        await Promise.all(organizerPromises);
        setOrganizers(orgdetails);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getEventRecords();
    document.title = "EventCraft-Events";
    return () => {
      document.title = "Welcome-EventCraft";
    };
  }, []);

  return (
    <>
      <div className="container">
        <div className="container-items">
          <div className="evetns-items">
            <h2 id="h1">Events</h2>
            <div className="events">
              {events &&
                events.map((event) => (
                  <Events
                    key={event._id}
                    event={event}
                    organizer={organizers[event.organiseId]}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
