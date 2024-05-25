import styled from "styled-components";

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;
`;

export const Card = styled.div`
  flex: 1;
  background-color: ${(props) => props.bgColor || "#fff"};
  color: #fff;
  padding: 20px;
  margin: 10px 10px;
  text-align: center;
  border-radius: 8px;
`;

export const Table = styled.table`
  width: 100%;
  max-width: 800px;
  border-collapse: collapse;
  margin-top: 20px;
  position: absolute;
  top: 300px;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    background-color: #f2f2f2;
    text-align: left;
  }
`;

export const Status = styled.span`
  color: ${(props) => (props.success ? "green" : "red")};
  font-weight: bold;
`;

export const Title = styled.h1`
  position: absolute;
  top: 250px;
  left: 170px;
  /* bottom: 60px; */
  font-size: 30px;
`;

export const Button = styled.button`
  position: relative;
  top: 10px;
  text-decoration: underline;
`;
