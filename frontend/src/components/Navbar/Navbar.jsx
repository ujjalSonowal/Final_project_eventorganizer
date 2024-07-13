import React, { useState, useEffect } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell, faSearch } from "@fortawesome/free-solid-svg-icons";

import logo from "../../assets/logo1.png";
import { Sidenav } from "../Sidenav/Sidenav";

export const Navbar = () => {
  const navigate = useNavigate();
  const [usertype, setUserType] = useState("");
  const [currentuser, setCurrentUser] = useState("");

  const [notifications, setNotifications] = useState([]);
  const [org, setOrg] = useState("");
  const currentuserid = localStorage.getItem("User");
  const [organiseId, setOrganiseId] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("profile")
  );

  const [searchQuery, setSearchQuery] = useState("");
  // const history = useHistory();
  const [searchVisible, setSearchVisible] = useState(false);

  useEffect(() => {
    const getOrg = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/organise/myorg/${currentuserid}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!response.ok) {
          console.error(`An error occurred: ${response.statusText}`);
          return;
        }
        const myOrg = await response.json();
        setOrg(myOrg);
        const orgId = myOrg._id;
        setOrganiseId(orgId);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    getOrg();
  }, [currentuserid]);

  useEffect(() => {
    const getNotifications = async (orgId) => {
      try {
        const response = await fetch(
          `http://localhost:5001/notification/organise/${orgId}`
        );
        if (!response.ok) {
          console.error(`An error occurred: ${response.statusText}`);
          return;
        }
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    if (organiseId) {
      getNotifications(organiseId);
    }
  }, [organiseId]);

  const handleIconClick = () => {
    setShowPopup(!showPopup);
  };

  const handleNotificationClick = (eventId) => {
    navigate(`/recent-book/${eventId}`);
  };

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    setUserType(userType);
    const currentUser = localStorage.getItem("User");
    setCurrentUser(currentUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("profile");
    localStorage.removeItem("userType");
    localStorage.removeItem("User");
    navigate("/");
    window.location.reload();
  };

  const handleSearch = async () => {
    if (searchQuery.trim() !== "") {
      // history.push(`/search?query=${searchQuery}`);
    }
  };

  const executeSearch = () => {
    navigate(`/search?query=${searchQuery}`);
  };

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <>
      <div className="navbar-container">
        <nav className="navbar">
          <div className="logo">
            <img src={logo} alt="logo here" />
            <h1 className="logo-h1">EventTora</h1>
          </div>
          <ul className="navbar-nav">
            <li className="nav-item" id="nav-li">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item" id="nav-li">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            <li className="nav-item" id="nav-li">
              {usertype === "User" && (
                <Link to="/events" className="nav-link">
                  Events
                </Link>
              )}
            </li>
            <li className="nav-item" id="nav-li">
              {usertype === "User" && (
                <Link to="/organise" className="nav-link">
                  Organizers
                </Link>
              )}
            </li>
            <li className="nav-item" id="nav-li">
              {usertype === "Organiser" && (
                <Link to={`/createorganization`} className="nav-link">
                  Create Organization
                </Link>
              )}
            </li>
          </ul>
          <div className="nav-actions">
            {isAuthenticated ? (
              <div className="profile">
                <Link to={`/profile/${currentuser}`}>
                  <FontAwesomeIcon icon={faUser} className="icon" />
                </Link>
              </div>
            ) : (
              <ul className="auth">
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </div>
      {showPopup && (
        <div className="notification-popup">
          {notifications.map((notification) => (
            <div key={notification._id} className="notification-items">
              <p
                className="notification-messages"
                onClick={() => handleNotificationClick(notification.eventId)}
              >
                {notification.message}
              </p>
            </div>
          ))}
        </div>
      )}
      {isAuthenticated && <Sidenav />}
    </>
  );
};
