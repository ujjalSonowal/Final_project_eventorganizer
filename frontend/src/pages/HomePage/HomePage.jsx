import React from "react";
import { useEffect, useState } from "react";
// import { Home } from "../../componenets/home/home";
// import { Booking } from "../../componenets/bookingcomp";
import "./home.css";
// import "./style.css";
import { Link } from "react-router-dom";
import image from "../../assets/homeimgae.png";
import noticeimag from "../../assets/Biirthday.png";
import { Events } from "../../components/Events/Events";
import { Organizer } from "../../components/Organizer/Organizer";
import { OrganiserHome } from "./OrganiserHome";

export const HomePage = () => {
  const [events, setEvents] = useState(null);
  const [latestevent, setLatestEvent] = useState(null);
  const [toporg, setTopOrg] = useState(null);
  const [usertype, setUserType] = useState("");
  // const [currentuser, setCurrentUser] = useState("");

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    setUserType(userType);
    // const currentUser = localStorage.getItem("User");
    // setCurrentUser(currentUser);
  }, []);

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5001/events/home/event`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const events = await response.json();
      setEvents(events);
    }
    async function Getlatestevents() {
      const response = await fetch(`http://localhost:5001/events/latest/event`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const latestevent = await response.json();
      setLatestEvent(latestevent);
    }
    async function gettoporg() {
      const response = await fetch(`http://localhost:5001/organise/rating`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const toporg = await response.json();
      setTopOrg(toporg);
    }
    getRecords();
    Getlatestevents();
    gettoporg();
    return;
  }, []);

  if (usertype === "Organiser") {
    return (
      <div>
        <OrganiserHome />
      </div>
    );
  }

  return (
    <>
      {/* {usertype ===
        "User"( */}
      <div>
        <div className="home">
          <div className="left">
            <p className="heading"> All in One Event Managment Software</p>
            <h1>Booked Your Events Today</h1>
            <p className="para">'We provide you high quality products'</p>
            <Link to="/signup" className="create-account">
              Create Account
            </Link>
          </div>

          <div className="right">
            <img alt="img" src={image}></img>
          </div>
        </div>
        <div className="notice">
          <div className="image-area">
            <img src={noticeimag} alt="" />
          </div>
          <div className="text-area">
            <h2>
              Event planning software that handles everything all in one place
            </h2>
            <p>
              No matter what stage of the event process you’re in, we offer a
              complete set of tools that’s flexible enough to work with your
              event program. From small meetings, large conferences or internal
              meetings, we’ve got you covered.
            </p>
          </div>
        </div>

        <div className="item-section">
          <div className="top-events">
            <h2>Top Events</h2>
            <div className="event-card-container">
              {events &&
                events.map((Event) => (
                  <Link to="" className="linkcard">
                    <Events key={Event._id} event={Event} />
                  </Link>
                ))}
              {/* <div className="linkcard">
              {events &&
                events.map((Event) => <Events key={Event._id} event={Event} />)}
            </div> */}
            </div>
          </div>
          <div className="recent-events">
            <h2>Latest Events</h2>
            <div className="recent-card-container">
              {latestevent &&
                latestevent.map((Event) => (
                  <Link to="" className="linkcard">
                    <Events key={Event._id} event={Event} />
                  </Link>
                ))}
              {/* <div className="linkcard">
              {latestevent &&
                latestevent.map((Event) => (
                  <Events key={Event._id} event={Event} />
                ))}
            </div> */}
            </div>
          </div>
        </div>
        <div className="our-patner">
          <h2>Our Patner</h2>
          <p className="collab">We Collaborate With Several Organisation</p>
          <div className="organisation-section">
            <div className="organisation-container">
              {toporg &&
                toporg.map((organise) => (
                  <Link to="" className="linkcardorganise">
                    {" "}
                    <Organizer key={organise._id} organise={organise} />
                  </Link>
                ))}
              {/* <div className="linkcardorganise">
              {toporg &&
                toporg.map((organise) => (
                  <Organizer key={organise._id} organise={organise} />
                ))}
            </div> */}
            </div>
          </div>
        </div>

        <div className="contact-us">
          <div className="contact-flex-box">
            <div className="contact-us-container">
              <form className="contact-form">
                <label htmlFor="name">Name</label>
                <input type="text" placeholder="Your Name" id="cnt" required />
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="Your Email"
                  id="cnt"
                  required
                />
                <label htmlFor="massage">Massage</label>
                <textarea row="5" id="cnt" required>
                  {" "}
                </textarea>
                <button id="bnt" type="submit">
                  Send Message
                </button>
              </form>
            </div>
            <div className="text-contact">
              <h1>Contact-us</h1>
              <p>Any Quaries!! You Can Freely Ask</p>
              <p>24*7</p>
              <div className="contact-details-quary">
                <p>Phone: 8133820226/9101233239 </p>
                <p>Gmail: nitulsonowal8133@gmail.com </p>
              </div>
            </div>
          </div>
        </div>

        <footer>
          {" "}
          <p>&copy; 2024 Event Organizer. All Rights Reserved.</p>
        </footer>
      </div>
      {/* )} */}
      {/* {usertype === "Organiser" && (
        <div>
          <h1>Organiser home page</h1>
        </div>
      )} */}
    </>
  );
};
