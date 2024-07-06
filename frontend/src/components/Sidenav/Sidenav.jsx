import React from "react";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faCalendarAlt,
  faClipboardList,
  faSignOutAlt,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {faUser} from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from "react-router-dom";
import "./sidenav.css";
// import "./side.css";

export const Sidenav = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [currentuser, setcurrentuser] = useState("");
  const [user, setuser] = useState("");

  const ref = useRef(null);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const userId = localStorage.getItem("User");

  useEffect(() => {
    setuser(userId);
    const currentuser = localStorage.getItem("userType");
    setcurrentuser(currentuser);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem("profile");
    localStorage.removeItem("userType");
    localStorage.removeItem("User");
    navigate("/");
    window.location.reload();
  };

  return (
    <div ref={ref} className={`snavbar ${isOpen ? "open" : ""}`}>
      <button className="toggle-button" onClick={toggleNavbar}>
        ☰
      </button>
      <ul className="snavbar-links">
        {currentuser === "Organiser" && (
          <li>
            <FontAwesomeIcon icon={faHome} className="snav-icon" />
            <Link to="/createorganization">Create Organization</Link>
          </li>
        )}
        {currentuser === "Organiser" && (
          <li>
            <FontAwesomeIcon icon={faUser} className="snav-icon" />
            <Link to={`/myorg/${user}`}>Manage Organization</Link>
          </li>
        )}

        {currentuser === "Organiser" && (
          <li>
            <FontAwesomeIcon icon={faCalendarAlt} className="snav-icon" />
            <Link to={`/myevent/${user}`}>My Events</Link>
          </li>
        )}

        {currentuser === "Organiser" && (
          <li>
            <FontAwesomeIcon icon={faClipboardList} className="snav-icon" />
            <a href={`/allbooking/${user}`}>All Booking</a>
          </li>
        )}
        {currentuser === "User" && (
          <li>
            <FontAwesomeIcon icon={faUserCircle} className="snav-icon" />
            <Link to={`/profile/${userId}`}>Manage Profile</Link>
          </li>
        )}

        {currentuser === "User" && (
          <li>
            <FontAwesomeIcon icon={faCalendarAlt} className="snav-icon" />
            <Link to={`/mybooking/${userId}`}>My Bookings</Link>
          </li>
        )}
        <li>
          <FontAwesomeIcon icon={faSignOutAlt} className="snav-icon" />
          <Link onClick={handleLogout}> Logout</Link>
        </li>
      </ul>
    </div>
  );
};
