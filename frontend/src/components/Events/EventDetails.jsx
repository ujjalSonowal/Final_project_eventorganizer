import React, { useState } from "react";
import styled from "styled-components";
import StarRating from "../StarRating";
import { Link, useNavigate } from "react-router-dom";

// Styles for the Go Back button
const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  /* margin-top: 20px; */
`;
const MainContainer = styled.div`
  margin: 10px;
  /* border: 1px solid red; */
`;
const SectionRight = styled.div`
  /* border: 1px solid red; */
  margin: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  box-shadow: 3px 10px 20px lightblue;
  border-radius: 8px;
`;
const SectionLeft = styled.div`
  border: 1px solid red;
  margin: 10px;
  padding: 20px;
  width: 100%;
  /* box-shadow: 3px 10px 20px lightblue; */
`;
const SectionButtom = styled.div`
  /* border: 1px solid red; */
  margin: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 3px 10px 20px lightblue;
  border-radius: 8px;
`;

const Btn = styled.button`
  background-color: #007bff;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 80px;
`;
const BookBtn = styled.button`
  background-color: #007bff;
  color: white;
  padding: 8px 8px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100px;
  text-align: center;
  margin: 10px;
  /* margin-left: 70%; */
`;

const Header = styled.div`
  display: flex;
  margin: 10px;
  /* border: 1px solid red; */
`;

const Content = styled.div`
  display: flex;
  gap: 100px;
`;

const H1 = styled.h1`
  margin-left: 40%;
  font-size: 20px;
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 20px;
  gap: 20px;
  width: 80%;
`;

const Input = styled.input`
  width: 100%;
  height: 100px;
  padding: 10px;
`;

const P = styled.p`
  margin: 10px;
  font-size: 15px;
`;

const Description = styled.p`
  /* font-weight: 300; */
  padding: 10px;
  text-align: start;
  padding-bottom: 30px;
`;

const SubCon = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 20px; */
  align-items: flex-start;
`;

const MainSub = styled.div`
  display: flex;
  gap: 50px;
`;

const CommentBody = styled.div`
  text-align: start;
`;

export const EventDetails = ({ event }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const navigate = useNavigate();

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Comment:", comment);
    console.log("Rating:", rating);
    setComment("");
    setRating(0);
  };

  return (
    <MainContainer>
      <Header>
        {/* Go Back Button */}
        <Button onClick={() => navigate(-1)}>Go Back</Button>
        <H1>{event.name.toUpperCase()}</H1>
      </Header>
      <Content>
        <SectionLeft>
          <img src="https://via.placeholder.com/300" alt="Event" />
        </SectionLeft>
        <SectionRight>
          <MainSub>
            <SubCon>
              <P>Event Name: {event.name}</P>
              <P>Price: {event.price}</P>
              <P>Total Booking: {event.totalbooking}</P>
              <P>Capacity: {event.capacity}</P>
            </SubCon>
            <SubCon>
              <P>Created On: {event.createOn}</P>
              <P>Type: {event.type}</P>
              <P>Status: {event.status}</P>
              <StarRating rating={event.rating} />
            </SubCon>
          </MainSub>

          <Description>
            <string>Description: </string>
            {event.eventdesc}
          </Description>

          <Link to="/createbook">
            <BookBtn>Book Now</BookBtn>
          </Link>
        </SectionRight>
      </Content>
      <SectionButtom>
        <h2>Comments</h2>
        <CommentForm onSubmit={handleSubmit}>
          <Input
            placeholder="Write your comment..."
            value={comment}
            onChange={handleCommentChange}
            required
          />
          <Btn type="submit">Submit</Btn>
        </CommentForm>
        <CommentBody>
          {event.comment &&
            event.comment.map((comment, index) => (
              <div key={index}>
                <P>
                  <strong>Comment Body: {comment.commentBody}</strong>
                </P>
                <P>Comment On: {comment.commentDate}</P>
              </div>
            ))}
        </CommentBody>
      </SectionButtom>
    </MainContainer>
  );
};
