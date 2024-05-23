import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import styled from "styled-components";

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #abacba 0%, #edece6 74%);
`;

const FormContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 20px;
  text-transform: uppercase;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const StyledSelect = styled(Select)`
  margin-bottom: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const Error = styled.p`
  color: red;
  font-weight: bold;
  text-align: center;
`;

const SignupLink = styled.span`
  display: block;
  text-align: center;
  margin-top: 1rem;
  color: #007bff;
  & > a {
    color: #007bff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

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
    <SignupContainer>
      <FormContainer>
        <Title>Sign Up</Title>
        <form onSubmit={handleSubmit}>
          {error && <Error>{error}</Error>}
          <Label htmlFor="signup-name">Name</Label>
          <Input
            id="signup-name"
            type="text"
            required
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <Label htmlFor="signup-email">Email Address</Label>
          <Input
            id="signup-email"
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Label htmlFor="signup-type">Select Your Type</Label>
          <StyledSelect
            id="signup-type"
            options={options}
            value={options.find((option) => option.value === usertype)}
            onChange={(e) => setUsertype(e.value)}
          />
          <Label htmlFor="signup-password">Password</Label>
          <Input
            id="signup-password"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Button id="signup-button" type="submit">
            Sign Up
          </Button>
        </form>
        <SignupLink>
          Already have an account? <Link to="/login">Log in</Link>
        </SignupLink>
      </FormContainer>
    </SignupContainer>
  );
};
