import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Organizer } from "../../components/Organizer/Organizer";

const OrganiseContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 2em;
  color: #333;
`;

const OrganiseItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* gap: 20px; */
  justify-content: center;
`;

export const OrganizerPage = () => {
  const [organise, setOrganise] = useState(null);

  useEffect(() => {
    async function getOrganise() {
      const response = await fetch(`http://localhost:5001/organise`);
      if (!response.ok) {
        const errorMsg = `An error occurred: ${response.statusText}`;
        console.error(errorMsg);
        return;
      }
      const organises = await response.json();
      setOrganise(organises);
    }
    getOrganise();
    return;
  }, []);

  return (
    <OrganiseContainer>
      <Title>Organizer</Title>
      <OrganiseItems>
        {organise &&
          organise.map((organise) => (
            <Organizer key={organise._id} organise={organise} />
          ))}
      </OrganiseItems>
    </OrganiseContainer>
  );
};
