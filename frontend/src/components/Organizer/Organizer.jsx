import React, { useState } from "react";
import { Link } from "react-router-dom";
import StarRating from "../StarRating";
import styled from "styled-components";

const OrganiseContainer = styled.div`
  /* display: flex; */
  /* flex-direction: row; */
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* max-width: 600px; */
  margin: 20px auto;
  max-width: 100%;
`;
const OrgCon = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const OrganiseCard = styled.div`
  max-width: 100%;
  text-align: left;
`;

const StrongText = styled.strong`
  display: block;
  margin-bottom: 10px;
`;

const Details = styled.div`
  margin: 10px 0;
`;

const MoreButton = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  a {
    color: white;
    text-decoration: none;
  }
`;

const DetailsView = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 600px;
  width: 90%;
  overflow: auto;
  max-height: 80vh;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 130px;
  right: 380px;
  background: #ff5b5b;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
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
    <OrganiseContainer>
      <OrgCon>
        <OrganiseCard>
          <StrongText>
            <p>Organise Name: {organise.name}</p>
          </StrongText>
          <p>Email Id: {organise.email}</p>
          <Details>
            <p>Services: {organise.service}</p>
          </Details>
          <StarRating rating={organise.rating} />
          <MoreButton>
            <Button onClick={viewDetails}>View More</Button>
            <Button>
              <Link to={`/organise/events/${organise._id}`}>View Events</Link>
            </Button>
          </MoreButton>
        </OrganiseCard>
      </OrgCon>
      {details && (
        <DetailsView>
          <PopupContent>
            <CloseButton onClick={toggleViewOff}>X</CloseButton>
            <p>Owner: {organise.owner}</p>
            <p>Contact No: {organise.phone}</p>
            <p>Address: {organise.address}</p>
            <p>Pin: {organise.pin}</p>
            <p>State: {organise.state}</p>
            <p>Office Location: {organise.location}</p>
            <p>Post Office Address: {organise.postoffice}</p>
            <p>Total Booking: {organise.totalboking}</p>
            <p>Organise Created On: {organise.createdAt}</p>
          </PopupContent>
        </DetailsView>
      )}
    </OrganiseContainer>
  );
};
