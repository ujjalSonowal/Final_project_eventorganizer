import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [org, setOrg] = useState("");
  const currentuser = localStorage.getItem("User");
  const [organiseId, setOrganiseId] = useState("");
  const navigate = useNavigate();
  const { id: userId } = useParams();

  useEffect(() => {
    const getOrg = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/organise/myorg/${currentuser}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!response.ok) {
          console.error(`An error occurred: ${response.statusText}`);
          return;
        }
        const myOrg = await response.json();
        setOrg(myOrg);
        const orgId = myOrg._id;
        setOrganiseId(orgId);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    getOrg();
  }, [currentuser]);

  useEffect(() => {
    const getNotifications = async (orgId) => {
      try {
        const response = await fetch(
          `http://localhost:5001/notification/organise/${orgId}`
        );
        if (!response.ok) {
          console.error(`An error occurred: ${response.statusText}`);
          return;
        }
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    if (organiseId) {
      getNotifications(organiseId);
    }
  }, [organiseId]);

  const handleNotificationClick = (eventId) => {
    navigate(`/recent-book/${eventId}`);
  };

  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <div key={notification._id} className="notification-item">
          <p
            className="notification-message"
            onClick={() => handleNotificationClick(notification.eventId)}
          >
            {notification.message}
          </p>
        </div>
      ))}
    </div>
  );
};
