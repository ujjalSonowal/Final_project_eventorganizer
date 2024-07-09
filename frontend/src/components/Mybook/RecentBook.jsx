import React from "react";
import styled from "styled-components";
import { useParams, useNavigate, Link } from "react-router-dom";

const Main = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const RecentBookCard = styled.div`
  background-color: #fff;
  width: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 16px;
  padding: 16px;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  p {
    margin: 8px 0;
    color: #333;
  }

  .event-name {
    font-size: 18px;
    font-weight: bold;
    color: #007bff;
  }

  .customer-name {
    font-size: 16px;
    font-weight: normal;
  }
`;
const Button = styled.button`
  padding: 2px;
  background-color: #2d6150;
  border-radius: 5px;
  color: white;
  width: 100%;
  height: 50px;
`;

export function RecentBook({ recentbooking }) {
  const { userId } = useParams();
  return (
    <Main>
      <RecentBookCard>
        <p className="event-name">Event Name: {recentbooking.eventname}</p>
        <p className="customer-name">Customer Name: {recentbooking.name}</p>
        <p className="customer-name">Event Type: {recentbooking.eventtype}</p>
        <p className="customer-name">Location: {recentbooking.location}</p>
        <p className="customer-name">Contact: {recentbooking.contact}</p>
        <p className="customer-name">Email: {recentbooking.email}</p>
        <p className="customer-name">District: {recentbooking.district}</p>
        <p className="customer-name">Pan No: {recentbooking.panno}</p>
        <Button>
          <Link to={`/allbooking/${userId}`}>Go to Booking Page</Link>
        </Button>
      </RecentBookCard>
    </Main>
  );
}

export default RecentBook;
