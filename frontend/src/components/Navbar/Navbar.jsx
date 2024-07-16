import React, { useState, useEffect } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";

import logo from "../../assets/logo1.png";
import { Sidenav } from "../Sidenav/Sidenav";

export const Navbar = () => {
  const navigate = useNavigate();
  const [usertype, setUserType] = useState("");
  const [currentuser, setCurrentUser] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("profile")
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    setUserType(userType);
    const currentUser = localStorage.getItem("User");
    setCurrentUser(currentUser);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("profile");
    localStorage.removeItem("userType");
    localStorage.removeItem("User");
    navigate("/");
    window.location.reload();
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
            {isAuthenticated && (
              <form className="search-form" onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button type="submit" className="search-button">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </form>
            )}
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
      <div className="sidnav">{isAuthenticated && <Sidenav />}</div>
    </>
  );
};
