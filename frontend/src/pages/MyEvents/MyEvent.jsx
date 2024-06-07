import React from "react";
import { useEffect, useState } from "react";
import MyEvents from "../../components/Events/MyEvents";
import "./myevent.css";
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
          // body: JSON.stringify({ currentuser }),
        }
      );
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const myevn = await response.json();
      // setEvents(myevn);
      if (Array.isArray(myevn)) {
        setEvents(myevn);
      } else if (myevn && typeof myevn === "object") {
        // If the data is an object, convert it into an array with a single item
        setEvents([myevn]);
      } else {
        console.error("Fetched data is not an array or object:", myevn);
        setEvents([]);
      }
    }
    getEvent();
    return;
  }, [currentuser]);
  if (!events || events.length === 0) {
    return <div>Nothing to Show</div>;
  }
  // if (!events) return <div>Nothing to Show</div>;

  return (
    <div className="myevents-container">
      <h2>My Events</h2>
      <div className="component-section">
        {events &&
          events.map((myev) => <MyEvents key={myev?._id} myev={myev} />)}
      </div>
    </div>
  );
};

// export default MyEvent;
