import React from "react";
import { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [usertype, setUserType] = useState(false);
  const [userId, setUserId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email && !password) {
      alert("Enter email and password");
    }

    const auth = { email, password };

    try {
      const response = await fetch(`http://localhost:5001/user/login`, {
        method: "POST",
        body: JSON.stringify(auth),
        headers: {
          "Content-type": "application/json",
        },
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error);
      }
      // Navigate to the dashboard/profile/home page after successful login
      const authToken = json.token;
      localStorage.setItem("profile", authToken);
      const userType = json.usertype;
      localStorage.setItem("userType", userType);
      const userId = json.id;
      localStorage.setItem("User", userId);

      navigate("/");
      window.location.reload();
      if (userType === "User") {
        setUserType("User");
      } else if (userType === "Organiser") {
        setUserType("Organiser");
      } else {
        throw new Error("Invalid user type");
      }
      setToken(authToken);
      setUserId(userId);
    } catch (err) {
      console.error(err);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        <form onSubmit={handleSubmit}>
          <label htmlFor="login-email">Email </label>
          <input
            id="login-email"
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <br />

          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <br />

          <button id="login-button" type="submit">
            Login
          </button>
        </form>
        <Link to="/signup">Create an account</Link>
      </div>
    </div>
  );
};
