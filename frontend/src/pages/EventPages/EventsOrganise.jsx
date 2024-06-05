import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const EventsOrganise = () => {
  const { id: organiseId } = useParams();
  const [events, setevents] = useState("");

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
  return (
    <>
      {/* {events && events.map((event)=>{

    })} */}
    </>
  );
};
