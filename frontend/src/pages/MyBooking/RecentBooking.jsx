import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import styled from "styled-components";
import { RecentBook } from "../../components/Mybook/RecentBook";
import { Container } from "@mui/material";

export const RecentBooking = () => {
  const navigate = useNavigate();
  const { eventId, userId } = useParams();
  // const [bookingDetails, setBookingDetails] = useState(null);
  // const currentuser = localStorage.getItem("User");
  const [recentbooking, setRecentBooking] = useState(null); // Initialize as null or an empty object

  useEffect(() => {
    async function fetchRecentBooking() {
      try {
        const response = await fetch(
          `http://localhost:5001/booking/event/booking/${eventId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const recentBooking = await response.json();
        setRecentBooking(recentBooking); // Set recentbooking to the fetched booking object
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }

    fetchRecentBooking();
  }, [eventId]);

  const handleBack = () => {
    navigate(`/`); // Adjust the path to match your admin home page route
  };

  if (!recentbooking) {
    return <p>Loading booking details...</p>;
  }

  return (
    <Main>
      <MainBtn>
        <BackButton onClick={handleBack}>
          <FaArrowLeft /> Home
        </BackButton>
        <Button>
          <Link to={`/allbooking/${userId}`}>Go to Booking Page</Link>
        </Button>
      </MainBtn>
      <MainContainer>
        {recentbooking &&
          recentbooking.map((recentbooking) => (
            <RecentBook key={recentbooking._id} recentbooking={recentbooking} />
          ))}
      </MainContainer>
    </Main>
  );
};
const MainBtn = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 20px;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px 20px;
  margin-left: 10px;
  margin-top: 10px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 8%;

  &:hover {
    background-color: #555;
  }

  svg {
    margin-right: 10px;
  }
`;

const Button = styled.button`
  padding: 2px;
  background-color: #2d6150;
  border-radius: 5px;
  color: white;
  width: 15%;
`;
