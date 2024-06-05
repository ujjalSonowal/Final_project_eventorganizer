import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import image from "../../assets/homeimgae.png";
import noticeimag from "../../assets/Biirthday.png";
import { Events } from "../../components/Events/Events";
import { Organizer } from "../../components/Organizer/Organizer";
import { OrganiserHome } from "./OrganiserHome";

export const HomePage = () => {
  // State variables
  const [events, setEvents] = useState(null);
  const [latestEvent, setLatestEvent] = useState(null);
  const [topOrg, setTopOrg] = useState(null);
  const [userType, setUserType] = useState("");
  const [organizers, setOrganizers] = useState({});
  const [isLogin, setIsLogin] = useState(false);

  // Fetching data from API
  useEffect(() => {
    // Fetching user type from local storage
    const userType = localStorage.getItem("userType");
    setUserType(userType);

    // Fetching events and organizers data
    async function fetchData() {
      try {
        const eventsResponse = await fetch("http://localhost:5001/events");
        if (!eventsResponse.ok) {
          throw new Error(`An error occurred: ${eventsResponse.statusText}`);
        }
        const eventsData = await eventsResponse.json();
        setEvents(eventsData);

        const orgDetails = {};
        for (const event of eventsData) {
          const organizerResponse = await fetch(
            `http://localhost:5001/organise/${event.organiseId}`
          );
          if (organizerResponse.ok) {
            const organizer = await organizerResponse.json();
            orgDetails[event.organiseId] = organizer;
          } else {
            console.error(
              `Failed to fetch organizer details for ID ${event.organiseId}`
            );
          }
        }
        setOrganizers(orgDetails);

        // Fetching latest events
        const latestEventsResponse = await fetch(
          "http://localhost:5001/events/latest/event"
        );
        if (!latestEventsResponse.ok) {
          throw new Error(
            `An error occurred: ${latestEventsResponse.statusText}`
          );
        }
        const latestEventData = await latestEventsResponse.json();
        setLatestEvent(latestEventData);

        // Fetching top organizers
        const topOrgResponse = await fetch(
          "http://localhost:5001/organise/rating"
        );
        if (!topOrgResponse.ok) {
          throw new Error(`An error occurred: ${topOrgResponse.statusText}`);
        }
        const topOrgData = await topOrgResponse.json();
        setTopOrg(topOrgData);

        // Checking if user is logged in
        const user = localStorage.getItem("User");
        if (user) {
          setIsLogin(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  // Rendering OrganiserHome if user type is "Organiser"
  if (userType === "Organiser") {
    return (
      <div>
        <OrganiserHome />
      </div>
    );
  }

  return (
    <>
      <HomeWrapper>
        <Home className="home">
          <Left className="left">
            <Heading>All in One Event Management Software</Heading>
            <Title>Book Your Events Today</Title>
            <Para>'We provide you high quality products'</Para>
            {!isLogin ? (
              <LinkStyled to="/signup">Create Account</LinkStyled>
            ) : (
              <LinkStyled to="/events">Explore</LinkStyled>
            )}
          </Left>

          <Right className="right">
            <img alt="img" src={image} />
          </Right>
        </Home>

        <NoticeSection>
          <NoticeRight className="image-area">
            <img src={noticeimag} alt="" />
          </NoticeRight>
          <NoticeLeft className="text-area">
            <NoticeHeading>
              Event planning software that handles everything all in one place
            </NoticeHeading>
            <NoticePara>
              No matter what stage of the event process you’re in, we offer a
              complete set of tools that’s flexible enough to work with your
              event program. From small meetings, large conferences or internal
              meetings, we’ve got you covered.
            </NoticePara>
          </NoticeLeft>
        </NoticeSection>

        <ItemSection>
          <TopEvents>
            <SectionHeading>Top Events</SectionHeading>
            <EventCardContainer>
              {events &&
                events.map((event) => (
                  <EventLink to="" className="linkcard" key={event._id}>
                    <Events
                      event={event}
                      organizer={organizers[event.organiseId]}
                    />
                  </EventLink>
                ))}
            </EventCardContainer>
          </TopEvents>

          <RecentEvents>
            <SectionHeading>Latest Events</SectionHeading>
            <EventCardContainer>
              {latestEvent &&
                latestEvent.map((event) => (
                  <EventLink to="" className="linkcard" key={event._id}>
                    <Events
                      event={event}
                      organizer={organizers[event.organiseId]}
                    />
                  </EventLink>
                ))}
            </EventCardContainer>
          </RecentEvents>
        </ItemSection>

        <OurPartnar className="our-patner">
          <PartnerHeading>Our Patner</PartnerHeading>
          <CollabPara className="collab">
            We Collaborate With Several Organization
          </CollabPara>
          <OrganiseContainer className="organisation-section">
            <OrgSec className="organisation-container">
              {topOrg &&
                topOrg.map((organise) => (
                  <LinkOrg
                    to={`/oranise-view/${organise._id}`}
                    className="linkcardorganise"
                  >
                    <OrgView>
                      {" "}
                      <Organizer key={organise._id} organise={organise} />
                    </OrgView>
                  </LinkOrg>
                ))}
            </OrgSec>
          </OrganiseContainer>
        </OurPartnar>

        <ContactSection>
          <ContactFlexBox>
            <ContactUsContainer>
              <ContactForm>
                <Label htmlFor="name">Name</Label>
                <Input type="text" placeholder="Your Name" id="name" required />
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  placeholder="Your Email"
                  id="email"
                  required
                />
                <Label htmlFor="message">Message</Label>
                <Textarea rows="5" id="message" required />
                <SubmitButton type="submit">Send Message</SubmitButton>
              </ContactForm>
            </ContactUsContainer>
            <TextContact>
              <h1>Contact Us</h1>
              <ContactPara>Any Queries? You Can Freely Ask</ContactPara>
              <ContactPara>24/7</ContactPara>
              <ContactDetails>
                <ContactInfo>Phone: 8133820226/9101233239</ContactInfo>
                <ContactInfo>Gmail: nitulsonowal8133@gmail.com</ContactInfo>
              </ContactDetails>
            </TextContact>
          </ContactFlexBox>
        </ContactSection>

        <Footer>
          <p>&copy; 2024 Event Organizer. All Rights Reserved.</p>
        </Footer>
      </HomeWrapper>
    </>
  );
};

// Styled Components

const Home = styled.div`
  display: flex;
  height: 650px;
  padding: 20px;
  /* margin: 100px; */
  max-width: 100%;
`;

const Right = styled.div`
  position: relative;
  top: 100px;
  right: -400px;
  max-width: 500px;
`;

const Left = styled.div`
  padding: 10px;
  padding-top: 100px;
`;

const HomeWrapper = styled.div`
  /* padding: 20px; */
`;

const Heading = styled.p`
  font-size: 1.5rem;
  margin-bottom: 10px;
  width: 500px;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin: 10px 0;
`;

const Para = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const LinkStyled = styled(Link)`
  display: inline-block;
  text-decoration: none;
  margin-top: 20px;
  padding: 10px 20px;
  border: 1px solid #994e59;
  background-color: #ffb6c1;
  color: rgb(0, 0, 0);
  border-radius: 5px;
  transition: 1s;
  /* width: 400px; */
  /* width: 700px; */

  &:hover {
    border-color: rgb(0, 213, 255);
    text-decoration: none;
  }
`;

const NoticeSection = styled.div`
  z-index: -1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #dac0ac;

  img {
    max-width: 80%;
    height: auto;
    left: 0;
    top: 20px;
    animation: infinite-rotate 10s linear infinite;
  }

  @keyframes infinite-rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const OrgView = styled.div`
  /* display: flex; */
  /* width: 400px; */
`;

const NoticeRight = styled.div`
  z-index: 1;
  flex: 1 1 50%;
  padding: 20px;
  box-sizing: border-box;
`;
const NoticeLeft = styled.div`
  flex: 1 1 50%;
  padding: 20px;
  box-sizing: border-box;
`;
const NoticeHeading = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const NoticePara = styled.p`
  font-size: 1.1rem;
  color: #555;
`;

const ItemSection = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

const SectionHeading = styled.h2`
  font-size: 2em;
  align-items: center;
  text-align: center;
  border-bottom: 1px solid blue;
  padding-bottom: 9px;
`;

const TopEvents = styled.div`
  margin-top: 30px;
  /* height: 400px; */
`;

const RecentEvents = styled.div`
  margin-top: 30px;
  /* height: 400px; */
`;

const EventCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  margin: 20px;
`;

const EventLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const OurPartnar = styled.div`
  background: linear-gradient(to right, #1a5cb3cb, #ac886c);
  padding: 20px;
  text-align: center;
`;

const PartnerHeading = styled.h2`
  color: white;
  font-family: "Times New Roman", Times, serif;
  font-size: 30px;
`;

const CollabPara = styled.p`
  color: white;
  font-family: "Times New Roman", Times, serif;
  font-size: 30px;
  transition: 0.5s;
`;

const OrganiseContainer = styled.div`
  /* display: grid; */
  /* display: flex;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px; */
  /* width: 900px; */
`;

const OrgSec = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  /* width: 400px; */
`;

const LinkOrg = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const ContactSection = styled.div`
  padding: 50px;
  background-color: #a4a7c1;
  color: #000000;
`;

const ContactFlexBox = styled.div`
  display: flex;
  gap: 30px;
  justify-content: space-between;
  align-items: center;
`;

const ContactUsContainer = styled.div`
  box-shadow: 3px solid black;
  flex: 1;
  margin-right: 20px;
  background-color: #186f6f;
  color: white;
`;

const ContactForm = styled.form`
  display: block;
  padding: 10px;
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px 5px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
`;

const Textarea = styled.textarea`
  padding: 10px 5px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #ffb6c1;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff69b4;
  }
`;

const TextContact = styled.div`
  flex: 1;
  margin-left: 20px;
`;

const ContactPara = styled.p`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const ContactDetails = styled.div`
  margin-top: 20px;
`;

const ContactInfo = styled.p`
  font-size: 1.1rem;
  margin-bottom: 5px;
`;

const Footer = styled.footer`
  padding: 20px;
  background-color: #333;
  color: #fff;
  text-align: center;
`;

// export default HomePage;
