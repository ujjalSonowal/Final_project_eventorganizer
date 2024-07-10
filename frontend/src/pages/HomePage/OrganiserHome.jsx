import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Events } from "../../components/Events/Events";
import { BsTrash } from "react-icons/bs"; // Import delete/trash icon from react-icons library

export const OrganiserHome = () => {
  const [events, setEvents] = useState([]);
  const [username, setUsername] = useState("");
  const [organise, setOrganise] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [organiseId, setOrganiseId] = useState("");
  const navigate = useNavigate();
  const userid = localStorage.getItem("User");

  useEffect(() => {
    const currentuser = localStorage.getItem("User");

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
        setOrganise(myOrg);
        setOrganiseId(myOrg._id);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    getOrg();
  }, []);

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

  const handleClearAllNotifications = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/notification/deleteAll/${organiseId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        console.error(`Failed to clear notifications: ${response.statusText}`);
        return;
      }
      setNotifications([]); // Clear notifications locally on success
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      const response = await fetch(
        `http://localhost:5001/notification/delete/${notificationId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        console.error(`Failed to delete notification: ${response.statusText}`);
        return;
      }
      // Remove the deleted notification from the local state
      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification._id !== notificationId
        )
      );
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(
        `http://localhost:5001/events/my/event/${userid}`
      );
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const events = await response.json();
      setEvents(events);
    }

    async function getUsername() {
      try {
        const userid = localStorage.getItem("User");
        const response = await fetch(`http://localhost:5001/user/${userid}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch username: ${response.statusText}`);
        }
        const userData = await response.json();
        setUsername(userData.name);
      } catch (error) {
        console.error(error);
      }
    }

    async function getOrganise() {
      const response = await fetch(
        `http://localhost:5001/organise/myorg/${userid}`
      );
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const org = await response.json();
      setOrganise(org);
    }

    getOrganise();

    getRecords();
    getUsername();
  }, []);
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
    <Container>
      <Header>
        <Username>{username}</Username>
        <p>Manage your events efficiently and effortlessly.</p>
      </Header>

      <Dashboard>
        <Section>
          <h2>Overview</h2>
          <CardContainer>
            <Card>
              <h3>Total No. Events</h3>
              <p>{events.length}</p>
            </Card>
            {/* <Card>
              <h3>Number of Users</h3>
              <p>{events.filter((event) => new Date(event.date) <= new Date()).length}</p>
            </Card> */}
            <Card>
              <h3>Total No. of Bookings</h3>
              <p>{/* Display total number of bookings */}</p>
            </Card>
          </CardContainer>
        </Section>

        <Section>
          <h2>Notifications</h2>
          <ClearButton onClick={handleClearAllNotifications}>
            Clear All
          </ClearButton>
          <List>
            {notifications.map((notification) => (
              <NotificationItem key={notification._id}>
                <NotificationMessage
                  onClick={() => handleNotificationClick(notification.eventId)}
                >
                  {notification.message}
                  <p
                    className="notification-time"
                    style={{ fontSize: "13px", color: "red" }}
                  >
                    {timeSince(notification.createdAt)}
                  </p>
                </NotificationMessage>
                <DeleteIcon
                  onClick={() => handleDeleteNotification(notification._id)}
                >
                  <BsTrash />
                </DeleteIcon>
              </NotificationItem>
            ))}
          </List>
        </Section>

        <Section>
          <OrgTitle>Organization</OrgTitle>
          <List>
            <p>
              <strong>Organization Name: </strong>
              {organise.name}
            </p>
            <p>
              <strong>Owner Name: </strong>
              {organise.owner}
            </p>
            <p>
              <strong>Owner Email: </strong>
              {organise.email}
            </p>
            <p>
              <strong>Contact: </strong>
              {organise.phone}
            </p>
            <Link to={`/myorg/${localStorage.getItem("User")}`}>
              <ViewButton>View Details</ViewButton>
            </Link>
          </List>
        </Section>
      </Dashboard>

      <Actions>
        <ButtonPrimary to={`/myorg/${localStorage.getItem("User")}`}>
          Create New Event
        </ButtonPrimary>
        <ButtonSecondary to={`/myevent/${localStorage.getItem("User")}`}>
          Manage Events
        </ButtonSecondary>
      </Actions>

      <Section>
        <Title>My Events</Title>
        <TopEvent>
          {events.map((event) => (
            <Link key={event._id} to="">
              <Events event={event} />
            </Link>
          ))}
        </TopEvent>
      </Section>
    </Container>
  );
};

// Styled Components

const Username = styled.div`
  font-size: 40px;
  text-transform: uppercase;
`;

const Container = styled.div`
  font-family: Arial, sans-serif;
  color: #333;
  background-color: #f9f9f9;
  padding: 20px;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.2rem;
    color: #666;
  }
`;

const Dashboard = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
`;

const Section = styled.div`
  flex: 1;
  min-width: 300px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CardContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const Card = styled.div`
  flex: 1;
  background: #007bff;
  color: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;

  h3 {
    margin-bottom: 10px;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  height: 200px;
  overflow-y: auto;
`;

const NotificationItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f1f1f1;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
`;

const NotificationMessage = styled.div`
  flex: 1;
  cursor: pointer;
`;

const DeleteIcon = styled.div`
  color: red;
  cursor: pointer;
`;

const Actions = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const ButtonPrimary = styled(Link)`
  padding: 10px 20px;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  background-color: #28a745;
  margin: 0 10px;
  display: inline-block;
`;

const ButtonSecondary = styled(Link)`
  padding: 10px 20px;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  background-color: #007bff;
  margin: 0 10px;
  display: inline-block;
`;

const ClearButton = styled.button`
  margin-bottom: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #dc3545;
  color: #fff;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 30px;
  display: flex;
  justify-content: center;
  color: #0d4271;
`;

const OrgTitle = styled.h1`
  font-size: 25px;
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
`;

const TopEvent = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 50px;
`;
const ViewButton = styled.button`
  cursor: pointer;
  border-radius: 5px;
  background-color: #172305;
  padding: 5px 10px;
  color: aliceblue;
`;
