// src/StyledComponents.js
import styled from "styled-components";

export const OuterSection = styled.div`
  height: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const OrgSection = styled.div`
  width: 100%;
  max-width: 800px;
  font-family: Arial, sans-serif;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #fff;
  padding: 20px;
`;

export const MyOrg = styled.div`
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  margin-bottom: 20px;
  text-align: center;
`;

export const HeadingOrg = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const Detail = styled.p`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  color: #333;
  font-size: 16px;
`;

export const OrgDetails = styled.div`
  margin-top: 20px;
`;

export const ServicesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
`;

export const ServiceBox = styled.div`
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
`;

export const FormPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  width: 70%;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 8px;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Button = styled.button`
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const Items = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;
