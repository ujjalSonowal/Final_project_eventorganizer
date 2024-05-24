import React, { useState, useEffect } from "react";
import { Events } from "../../components/Events/Events";
import "./style.css";

export const Eventpage = () => {
  const [events, setEvents] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function getEventRecords() {
      const response = await fetch(`http://localhost:5001/events`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const allevents = await response.json();
      setEvents(allevents);
    }

    getEventRecords();
  }, []);

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
    // You can add search functionality here
  };

  return (
    <>
      <h1 id="ev-h1">Events</h1>
      <div className="container">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="container-items">
          <div className="evetns-items" id="event-it">
            <div className="events">
              {events &&
                events.map((Event) => <Events key={Event._id} event={Event} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
