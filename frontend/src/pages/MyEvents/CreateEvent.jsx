import React from "react";
import { useNavigate } from "react-router-dom";
const CreateEvent = () => {
  const navigate = useNavigate();
  const userid = localStorage.getItem("User");
  if (!userid) {
    navigate("/login");
  }
  return <div></div>;
};

export default CreateEvent;
