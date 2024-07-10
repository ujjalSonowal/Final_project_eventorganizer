import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [organiseId, setOrganiseId] = useState("");
  const currentuser = localStorage.getItem("User");
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
        setOrganiseId(myOrg._id);
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

  const timeSince = (date) => {
    const now = new Date();
    const seconds = Math.floor((now - new Date(date)) / 1000);
    let interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
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
          <p className="notification-time">
            {timeSince(notification.createdAt)}
          </p>
        </div>
      ))}
    </div>
  );
};
