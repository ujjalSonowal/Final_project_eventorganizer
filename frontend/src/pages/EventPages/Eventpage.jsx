import React, { useState, useEffect } from "react";
import { Events } from "../../components/Events/Events";

export const Eventpage = () => {
  const [events, setEvents] = useState(null);

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

    return;
  }, []);

  return (
    <>
      <div className="container">
        <div className="container-items">
          <div className="evetns-items">
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
