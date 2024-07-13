import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import image from "../../assets/homeimgae.png";
import noticeimag from "../../assets/Biirthday.png";
import { Events } from "../../components/Events/Events";
import { Organizer } from "../../components/Organizer/Organizer";
import { OrganiserHome } from "./OrganiserHome";

export const HomePage = () => {
  const [events, setEvents] = useState(null);
  const [latestEvent, setLatestEvent] = useState(null);
  const [topOrg, setTopOrg] = useState(null);
  const [userType, setUserType] = useState("");
  const [organizers, setOrganizers] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [sixevent, setSixEvent] = useState(null);

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    setUserType(userType);

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

        const topevent = await fetch("http://localhost:5001/events/event/six");
        if (!topevent.ok) {
          throw new Error(`An error occurred: ${topevent.statusText}`);
        }
        const topeventData = await topevent.json();
        setSixEvent(topeventData);

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

        const topOrgResponse = await fetch(
          "http://localhost:5001/organise/rating"
        );
        if (!topOrgResponse.ok) {
          throw new Error(`An error occurred: ${topOrgResponse.statusText}`);
        }
        const topOrgData = await topOrgResponse.json();
        setTopOrg(topOrgData);

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

  if (userType === "Organiser") {
    return (
      <div>
        <OrganiserHome />
      </div>
    );
  }

  return (
    <>
      <Home className="home">
        <Left className="left">
          {!isLogin ? (
            <div>
              <Title1>Join Our Community of Event Enthusiasts!</Title1>
              <Heading1>
                Choose Your Role to Get Started: <Strong>Organizer </Strong>or{" "}
                <Strong>Customer</Strong>
              </Heading1>
              <LinkStyled to="/signup">Create Account</LinkStyled>
            </div>
          ) : (
            <div>
              <Heading>All in One Event Management Software</Heading>
              <Title>Book Your Events Today</Title>
              <Para>'We provide you high quality Services'</Para>
              <LinkStyled to="/events">Explore</LinkStyled>
            </div>
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
            complete set of tools that’s flexible enough to work with your event
            program. From small meetings, large conferences or internal
            meetings, we’ve got you covered.
          </NoticePara>
        </NoticeLeft>
      </NoticeSection>

      <div className="item-section">
        <div className="top-event">
          <SectionHeading>Top Events</SectionHeading>
          <TopEvents>
            {sixevent &&
              sixevent.map((event) => (
                <Link to="" className="linkcard" key={event._id}>
                  <Events
                    event={event}
                    organizer={organizers[event.organiseId]}
                  />
                </Link>
              ))}
          </TopEvents>
        </div>

        <div className="latest-event">
          <SectionHeading>Latest Events</SectionHeading>
          <LatestEvent>
            {latestEvent &&
              latestEvent.map((event) => (
                <Link to="" className="linkcard" key={event._id}>
                  <Events
                    event={event}
                    organizer={organizers[event.organiseId]}
                  />
                </Link>
              ))}
          </LatestEvent>
        </div>
      </div>

      <OurPartnar className="our-patner">
        <PartnerHeading>Our Patner</PartnerHeading>
        <CollabPara className="collab">
          We Collaborate With Several Organization
        </CollabPara>
        <div className="organisation-section">
          <OrgSec className="organisation-container">
            {topOrg &&
              topOrg.map((organise) => (
                <LinkOrg to="" className="linkcardorganise" key={organise._id}>
                  <OrgView>
                    <Organizer organise={organise} />
                  </OrgView>
                </LinkOrg>
              ))}
          </OrgSec>
        </div>
      </OurPartnar>

      {/* <ContactSection>
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
              <ContactInfo>Gmail: ujjalsonowal8133@gmail.com</ContactInfo>
            </ContactDetails>
          </TextContact>
        </ContactFlexBox>
      </ContactSection> */}
      <Footer>
        <p>&copy; 2024 Event Organizer. All Rights Reserved.</p>
      </Footer>
    </>
  );
};

// Styled Components
const moveAnimation = keyframes`
   0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-100% ));
  }
`;

const TopEvents = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 30px;
  /* overflow: hidden; */
  /* animation: ${moveAnimation} 10s linear infinite; */
  /* background-color: aliceblue; */
  justify-content: center;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    animation: none;
    margin-left: -40px;
    /* justify-content: center;
    align-items: center; */
  }
`;
const slideShowHorizontal = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
    from {
    transform: translateX(100%);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
`;

const LatestEvent = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  /* align-items: center; */
  gap: 20px;
  padding: 30px;
  overflow: hidden;
  /* overflow-x: auto; */
  height: auto;
  /* animation: ${slideShowHorizontal} 10s linear infinite; */
  @media (max-width: 768px) {
    /* width: 100%; */
    margin-left: -40px;
    margin-right: -60px;
    overflow: hidden;
  }
`;

const Home = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 100%;
  overflow: hidden;
  @media (min-width: 768px) {
    flex-direction: row;
    gap: 80px;
    overflow: hidden;
    height: 650px;
  }
`;

const Right = styled.div`
  position: relative;
  max-width: 500px;
  margin-top: 20px;
  @media (min-width: 768px) {
    margin-top: 0;
  }
  img {
    width: 100%;
    height: auto;
  }
`;

const Left = styled.div`
  max-width: 100%;
  text-align: center;
  @media (min-width: 768px) {
    text-align: left;
  }
  p {
    font-size: 30px;
    font-weight: 700;
    color: gray;
  }
`;

const Heading = styled.h1`
  font-size: 22px;
  font-weight: bold;
  color: #00e6e6;
  @media (min-width: 768px) {
    font-size: 35px;
  }
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  @media (min-width: 768px) {
    font-size: 26px;
  }
`;

const Para = styled.p`
  font-size: 15px;
  color: #5e5c5c;
  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: white;
  background-color: #00e6e6;
  border-radius: 10px;
  padding: 10px 20px;
  display: inline-block;
  margin-top: 20px;
  @media (min-width: 768px) {
    padding: 15px 30px;
    font-size: 20px;
  }
`;

const Title1 = styled.h2`
  font-size: 20px;
  font-weight: bold;
  @media (min-width: 768px) {
    font-size: 30px;
  }
`;

const Heading1 = styled.h1`
  font-size: 22px;
  font-weight: bold;
  color: #00e6e6;
  @media (min-width: 768px) {
    font-size: 32px;
  }
`;

const Strong = styled.strong`
  font-size: 22px;
  @media (min-width: 768px) {
    font-size: 35px;
  }
`;

const NoticeSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 20px;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const NoticeRight = styled.div`
  max-width: 500px;
  img {
    width: 100%;
    height: auto;
  }
`;

const NoticeLeft = styled.div`
  max-width: 100%;
  text-align: center;
  margin-top: 20px;
  @media (min-width: 768px) {
    text-align: left;
    margin-top: 0;
    margin-left: 20px;
  }
`;

const NoticeHeading = styled.h2`
  font-size: 18px;
  font-weight: bold;
  @media (min-width: 768px) {
    font-size: 26px;
  }
`;

const NoticePara = styled.p`
  font-size: 15px;
  color: #5e5c5c;
  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

const SectionHeading = styled.h2`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  color: #00e6e6;
  @media (min-width: 768px) {
    font-size: 30px;
  }
`;

const OurPartnar = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f8f8;
`;

const PartnerHeading = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  color: #00e6e6;
  @media (min-width: 768px) {
    font-size: 30px;
  }
`;

const CollabPara = styled.p`
  font-size: 15px;
  color: #5e5c5c;
  margin-top: 10px;
  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

const OrgSec = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 30px;
`;

const LinkOrg = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const OrgView = styled.div`
  width: 100%;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 20px;
  background-color: #f8f8f8;
  p {
    font-size: 14px;
    color: #5e5c5c;
  }
`;
