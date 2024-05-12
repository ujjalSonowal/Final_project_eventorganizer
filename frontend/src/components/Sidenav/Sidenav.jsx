import React from "react";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

import "./sidenav.css";

export const Sidenav = () => {
  const navigate = useNavigate();
  const [usertype, setUserType] = useState("");
  const [currentuser, setCurrentUser] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef(null);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    const userType = localStorage.getItem("userType");
    setUserType(userType);
    const currentUser = localStorage.getItem("User");
    setCurrentUser(currentUser);
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

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
        {/* <li>{usertype === "Organiser" && <Link to="">My States</Link>}</li> */}
        <li>
          {usertype === "Organiser" && (
            <Link to="/myorganise">My Organization</Link>
          )}
        </li>
        <li>
          {usertype === "Organiser" && <Link to="/myevent">My Events</Link>}
        </li>
        <li>
          {usertype === "Organiser" && (
            <Link to="/allbooking">All Bookings</Link>
          )}
        </li>

        <li>{usertype === "User" && <Link to="">My Profile</Link>}</li>
        <li>{usertype === "User" && <Link to="">My Bookings</Link>}</li>

        <li>
          <Link onClick={handleLogout}> Log Out</Link>
        </li>
      </ul>
    </div>
  );
};
