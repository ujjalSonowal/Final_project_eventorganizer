import React, { useState, useEffect } from "react";
import { Events } from "../../components/Events/Events";
import "./style.css";
import { colors } from "@mui/material";
import { Search } from "../../components/Search/Search";

export const Eventpage = () => {
  const [events, setEvents] = useState(null);
  const [organizers, setOrganizers] = useState({});
  const [ratingFilter, setRatingFilter] = useState(null);

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

  const handleRatingFilterChange = (event) => {
    setRatingFilter(event.target.value);
  };

  const filteredEvents = events
    ? events.filter((event) => {
        if (!ratingFilter) return true;
        return event.rating >= ratingFilter;
      })
    : [];

  return (
    <div className="container">
      <div className="events-items">
        <h2 id="h1">Events</h2>
        <div className="filter">
          <label htmlFor="ratingFilter">Filter by Rating:</label>
          <select id="ratingFilter" onChange={handleRatingFilterChange}>
            <option value="">All</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars & Up</option>
            <option value="3">3 Stars & Up</option>
            <option value="2">2 Stars & Up</option>
            <option value="1">1 Star & Up</option>
          </select>
        </div>
        <div className="events">
          {filteredEvents.map((event) => (
            <Events
              key={event._id}
              event={event}
              organizer={organizers[event.organiseId]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
