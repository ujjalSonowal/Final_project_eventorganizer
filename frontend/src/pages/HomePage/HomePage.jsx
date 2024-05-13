import React from "react";
import { useEffect, useState } from "react";
import { Events } from "../../components/Events/Events";
import { EventSlider } from "../../components/EventSlider/EventSlider";
import { Organizer } from "../../components/Organizer/Organizer";
// import "./home.css";
import "./style.css";
import img1 from "../../assets/images/img1.jpg";
import img2 from "../../assets/images/img2.jpg";
// import { Footer } from "../../components/Footer";
// import { Link } from "react-router-dom";

export const HomePage = () => {
  const slides = [
    {
      image: img1,
    },
    {
      image: img2,
    },
  ];
  const [events, setevents] = useState(null);
  const [organise, setorganise] = useState(null);
  // const [booking, setbooking] = useState(null);

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/events`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const events = await response.json();
      setevents(events);
    }

    getRecords();

    async function getorgranise() {
      const response = await fetch(`http://localhost:5000/organise`);
      if (!response.ok) {
        const erromsg = `an error occurred :${response.statusText}`;
        console.error(erromsg);
        return;
      }
      const organises = await response.json();

      setorganise(organises);
    }
    getorgranise();

    return;
  }, []);

  return (
    <div className="container">
      <div className="items">
        <div className="slider">
          <EventSlider slides={slides} />
        </div>
        <div className="evetns-items">
          <h2 className="e-h2">Events</h2>
          <div className="events">
            {events &&
              events.map((Event) => <Events key={Event._id} event={Event} />)}
          </div>

          <div className="organise">
            <h2 className="e-h2">Organizer</h2>
            <div className="organise-items">
              {organise &&
                organise.map((organise) => (
                  <Organizer key={organise._id} organise={organise} />
                ))}
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};
