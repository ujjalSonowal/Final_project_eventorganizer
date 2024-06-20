import React, { useState } from "react";
import { Link } from "react-router-dom";
import StarRating from "../StarRating";
import styled from "styled-components";
import "./style.css";

// Styled Components
const OrganizeContainer = styled.div`
  background: #83979b;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 20px;
  padding: 20px;
  max-width: 400px;
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const Details = styled.div`
  margin: 10px 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const Button = styled.button`
  background-color: #000000;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  padding: 10px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #ff8080;
  }
`;

const ModalOverlay = styled.div`
  background: rgba(0, 0, 0, 0.5);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  border-radius: 10px;
  left: 50%;
  width: 600px;
  max-width: 800px;
  padding: 20px;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  font-size: 1.5rem;
  position: absolute;
  right: 10px;
  top: 10px;
`;

const H2 = styled.h2`
  font-size: 20px;
  color: brown;
  font-weight: bold;
`;

const P = styled.p`
  font-size: 16px;
  color: #333;
  background: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
  margin: 5px 0;
`;

export const Organizer = ({ organise }) => {
  const [details, setDetails] = useState(false);

  const viewDetails = () => {
    setDetails(!details);
  };

  const toggleViewOff = () => {
    setDetails(false);
  };

  return (
    <OrganizeContainer>
      <strong>
        <P>Organize Name: {organise.name}</P>
      </strong>
      <P>Email Id: {organise.email}</P>
      <Details>
        <P>Services: {organise.service}</P>
      </Details>
      <StarRating rating={organise.rating} />
      <ButtonGroup>
        <Button onClick={viewDetails}>View More</Button>
        <Button>
          <Link to={`/organise/events/${organise._id}`}>View Events</Link>
        </Button>
      </ButtonGroup>

      {details && (
        <>
          <ModalOverlay onClick={toggleViewOff} />
          <Modal>
            <CloseButton onClick={toggleViewOff}>×</CloseButton>
            <H2>Organizer Details</H2>
            <div className="one">
              <div className="two">
                <P>
                  <strong>Owner: </strong>
                  {organise.owner}
                </P>
                <P>
                  <strong>Contact No:</strong> {organise.phone}
                </P>
              </div>
              <div className="three">
                <P>
                  <strong>Address:</strong> {organise.address}
                </P>
                <P>
                  <strong>Pin:</strong> {organise.pin}
                </P>
                <P>
                  <strong>State:</strong> {organise.state}
                </P>
                <P>
                  <strong>Office Location:</strong> {organise.location}
                </P>
                <P>
                  {" "}
                  <strong>Post Office Address:</strong> {organise.postoffice}
                </P>
              </div>
              <div className="service">
                <P>
                  <strong>Services:</strong> {organise.service}
                </P>
              </div>
              <div className="fourth">
                <P>
                  <strong>Total Booking:</strong> {organise.totalboking}
                </P>
                <P>
                  <strong>Organize Created On:</strong>
                  {new Date(organise.createdAt).toLocaleDateString()}
                </P>
              </div>
            </div>
          </Modal>
        </>
      )}
    </OrganizeContainer>
  );
};
