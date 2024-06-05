import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export const RecentBooking = () => {
  const { id: eventId } = useParams();
  const currentuser = localStorage.getItem("User");
  const [recentbooking, setrecentbooking] = useState("");
  useEffect(() => {
    async function RecentBooking() {
      const response = await fetch(
        `http://localhost:5001/booking/event/recent/booking/${eventId}`
      );
      if (!response.ok) {
        console.log("an error occurred");
        return;
      }
      const recentall = await response.json();
      setrecentbooking(recentall);
      console.log(recentall);
    }
    RecentBooking();
    return;
  }, [eventId]);

  return (
    <div>
      <h1>Recent Booking</h1>
    </div>
  );
};
