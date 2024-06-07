import React, { useEffect, useState, useParams } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Events } from "../../components/Events/Events";

export const OrganiserHome = () => {
  const [events, setEvents] = useState([]);
  // const [latestevent, setLatestEvent] = useState(null);
  //   const [organiser, setOrganiser] = useState([]);
  //   const [user, setUser] = useState([]);
  //   const [notifications, setNotifications] = useState([]);
  //   const [tasks, setTasks] = useState([]);
  //   const { id } = useParams();
  //   const current = id;

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5001/events`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const events = await response.json();
      setEvents(events);
    }

    getRecords();

    //   const userResponse = await fetch("http://localhost:5001/user/:_id");
    //   const userData = await userResponse.json();
    //   setUser(userData);

    // async function fetchOrganisers() {
    //   const response = await fetch("http://localhost:5001/organise");
    //   const data = await response.json();
    //   setOrganiser(data);
    // }

    // async function getuser() {
    //   const response = await fetch(`http://localhost:5001/user/${current}`);
    //   if (!response.ok) {
    //     const message = `An error has occured: ${response.statusText}`;
    //     window.alert(message);
    //     return;
    //   }
    //   const user = await response.json();
    //   setUser(user);
    // }
    // getuser();

    // async function fetchNotifications() {
    //   const response = await fetch("http://localhost:5001/organizer/notifications");
    //   const data = await response.json();
    //   setNotifications(data);
    // }

    // async function fetchTasks() {
    //   const response = await fetch("http://localhost:5001/organizer/tasks");
    //   const data = await response.json();
    //   setTasks(data);
    // }

    // Getlatestevents()
    // fetchOrganisers();
    // fetchNotifications();
    // fetchTasks();
  }, []);

  return (
    <Container>
      <Header>
        <h1>Welcome Back, Ujjwal</h1>
        <p>Manage your events efficiently and effortlessly.</p>
      </Header>

      <Dashboard>
        <Section>
          <h2>Overview</h2>
          <CardContainer>
            <Card>
              <h3>Total No. Events</h3>
              <p>
                {/* {
                  latestevent.filter((event) => new Date(event.date) > new Date())
                    .length
                } */}
              </p>
            </Card>
            <Card>
              <h3>Number of Users</h3>
              <p>
                {/* {
                  latestevent.filter((event) => new Date(event.date) <= new Date())
                    .length
                } */}
              </p>
            </Card>
            <Card>
              <h3>Total No. of Bookings</h3>
            </Card>
          </CardContainer>
        </Section>

        <Section>
          <h2>Notifications</h2>
          <List>
            {/* {notifications.map(notification => (
              <li key={notification.id}>{notification.message}</li>
            ))} */}
          </List>
        </Section>

        <Section>
          <h2>Organization</h2>
          <List>
            {/* {tasks.map(task => (
              <li key={task.id}>
                <input type="checkbox" checked={task.completed} onChange={() => {}} />
                {task.description}
              </li>
            ))} */}
          </List>
        </Section>
      </Dashboard>

      <Actions>
        <ButtonPrimary to="/create-event">Create New Event</ButtonPrimary>
        <ButtonSecondary to="/manage-events">Manage Events</ButtonSecondary>
      </Actions>
      <Section>
        <Title>Top Events</Title>
        <TopEvent>
          {events &&
            events.map((Event) => (
              <Link to="" className="linkcard">
                <Events key={Event._id} event={Event} />
              </Link>
            ))}
        </TopEvent>
      </Section>
    </Container>
  );
};

// Styled Components

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
  /* display: flex; */
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

  li {
    background: #f1f1f1;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
  }
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

const Footer = styled.footer`
  text-align: center;
  padding: 20px 0;
  background-color: #007bff;
  color: #fff;
  border-radius: 10px;
  /* position: absolute; */
  bottom: 0;
  width: 100%;
  margin: 0 10px;
`;

const TopEvent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 50px;

  .linkcard {
    flex: 1 1 calc(25% - 20px); /* 4 items per row, minus the gap */
    max-width: calc(25% - 20px);
    box-sizing: border-box;
  }
`;

const Title = styled.h2`
  font-size: 30px;
  display: flex;
  justify-content: center;
  color: #0d4271;
`;
