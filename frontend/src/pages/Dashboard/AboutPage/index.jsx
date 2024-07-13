import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

// Styled components for different elements
const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const PageTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 15px;
`;

const PageText = styled.p`
  line-height: 1.6;
`;

const SupportContainer = styled.div`
  margin-top: 20px;
`;

const SupportTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 10px;
`;

const ContactList = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

const ContactItem = styled.li`
  margin-bottom: 5px;
`;

const SocialMediaContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const SocialMediaLink = styled.a`
  color: #333;
  font-size: 24px;
  transition: color 0.3s ease;

  &:hover {
    color: #007bff;
  }
`;

export const AboutPage = () => {
  return (
    <PageContainer>
      <PageTitle>About Our Event Management Service</PageTitle>
      <PageText>
        At EventTora, our mission is to transform ordinary events into
        extraordinary experiences. We specialize in crafting memorable moments
        that leave a lasting impression. Whether you're planning a corporate
        gathering, a wedding celebration, or a community festival, we are
        dedicated to exceeding your expectations.
      </PageText>
      <SupportContainer>
        <SupportTitle>Customer Support</SupportTitle>
        <PageText>
          For any inquiries or support needs, please contact us through the
          following channels:
        </PageText>
        <ContactList>
          <ContactItem>Email: support@youreventservice.com</ContactItem>
          <ContactItem>Phone: +1 (123) 456-7890</ContactItem>
          <ContactItem>
            Operating Hours: Monday - Friday, 9:00 AM - 5:00 PM (EST)
          </ContactItem>
        </ContactList>
        <SocialMediaContainer>
          <SocialMediaLink href="https://twitter.com/youreventservice">
            <FontAwesomeIcon icon={faTwitter} />
          </SocialMediaLink>
          <SocialMediaLink href="https://facebook.com/youreventservice">
            <FontAwesomeIcon icon={faFacebook} />
          </SocialMediaLink>
          <SocialMediaLink href="https://instagram.com/youreventservice">
            <FontAwesomeIcon icon={faInstagram} />
          </SocialMediaLink>
        </SocialMediaContainer>
      </SupportContainer>
    </PageContainer>
  );
};

// export default AboutPage;
