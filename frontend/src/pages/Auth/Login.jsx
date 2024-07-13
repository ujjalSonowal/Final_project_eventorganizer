import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled components
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #abacba 0%, #edece6 74%);
`;

const LoginBox = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 20px;
  text-transform: uppercase;
`;

const InputLabel = styled.label`
  display: block;
  text-align: left;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
`;

const InputField = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #6b73ff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #000dff;
  }
`;

const SignupLink = styled(Link)`
  display: block;
  margin-top: 1rem;
  color: #6b73ff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

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

      const validateForm = () => {
        const emailRegex =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (!emailRegex.test(email)) {
          window.alert("Please enter a valid email address.");
          return false;
        }

        return true;
      };

      if (!validateForm()) {
        return;
      }
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
    <LoginContainer>
      <LoginBox>
        <Title>Login</Title>
        <form onSubmit={handleSubmit}>
          <InputLabel htmlFor="login-email">Email </InputLabel>
          <InputField
            id="login-email"
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <br />

          <InputLabel htmlFor="login-password">Password</InputLabel>
          <InputField
            id="login-password"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <br />

          <SubmitButton id="login-button" type="submit">
            Login
          </SubmitButton>
        </form>
        <SignupLink to="/signup">Create an account</SignupLink>
      </LoginBox>
    </LoginContainer>
  );
};
