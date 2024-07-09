import React from "react";
import styled from "styled-components";

const RecentBookCard = styled.div`
  background-color: #fff;
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

export function RecentBook({ recentbooking }) {
  return (
    <RecentBookCard>
      <p className="event-name">Event Name: {recentbooking.eventname}</p>
      <p className="customer-name">Customer Name: {recentbooking.name}</p>
      <p className="customer-name">Event Type: {recentbooking.eventtype}</p>
    </RecentBookCard>
  );
}

export default RecentBook;
