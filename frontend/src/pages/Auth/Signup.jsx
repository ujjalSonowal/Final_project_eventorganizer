import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import "./style.css";

export const Signup = () => {
  const options = [
    { value: "User", label: "User" },
    { value: "Organiser", label: "Organiser" },
  ];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [usertype, setUsertype] = useState(options[0].value);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usertype) {
      setError("Please select a type");
      return;
    }

    const auth = { name, email, password, usertype };

    const response = await fetch(`http://localhost:5001/user/signup`, {
      method: "POST",
      body: JSON.stringify(auth),
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setName("");
      setEmail("");
      setUsertype("");
      setPassword("");
      navigate("/login");
      const authToken = json.token;
      localStorage.setItem("profile", authToken);
      setToken(authToken);
    }
  };

  return (
    <div>
      <div className="signup">
        <form onSubmit={handleSubmit}>
          {error && <p>{error}</p>}
          <label htmlFor="signup-name">Name</label>
          <input
            id="signup-name"
            type="text"
            required
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <label htmlFor="signup-email">Email Address</label>
          <input
            id="signup-email"
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <br />
          <label htmlFor="signup-type">Select Your Type</label>
          <Select
            id="signup-type"
            options={options}
            value={options.find((option) => option.value === usertype)}
            onChange={(e) => setUsertype(e.value)}
          />
          <label htmlFor="signup-password">Password</label>
          <input
            id="signup-password"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <br />
          <button id="signup-button" type="submit">
            Sign Up
          </button>
        </form>
        <span>
          Already have an account? <Link to="/login">Log in</Link>
        </span>
      </div>
    </div>
  );
};
