import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";

export const ProfileBio = ({ user }) => {
  const [updateform, setupdateform] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [pincode, setPinCode] = useState(user.pincode);
  const [city, setCity] = useState(user.city);
  const [state, setState] = useState(user.state);
  const [postoffice, setPostOffice] = useState(user.postoffice);
  const [street, setStreet] = useState(user.street);
  const userId = localStorage.getItem("User");

  const navigate = useNavigate();

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setPinCode(user.pincode);
    setCity(user.city);
    setState(user.state);
    setPostOffice(user.postoffice);
    setStreet(user.street);
  }, [user]);

  const toggleform = () => {
    setupdateform(!updateform);
  };

  const toggleoff = () => {
    setupdateform(false);
  };

  const handleupdate = async (e) => {
    e.preventDefault();
    const data = {
      name,
      phone,
      pincode,
      city,
      email,
      state,
      postoffice,
      street,
    };
    try {
      const response = await fetch(
        `http://localhost:5001/user/update/${userId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (!response) {
        console.log("error");
      }
      const updated = await response.json();
      console.log(updated);
      navigate(`/profile/${userId}`);
      setupdateform(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Heading>My Profile</Heading>
      <UserCard>
        {updateform ? (
          <Form onSubmit={handleupdate}>
            <InputLabel>Username:</InputLabel>
            <Input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <InputLabel>Email:</InputLabel>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputLabel>Phone Number:</InputLabel>
            <Input
              type="number"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <InputLabel>Post Office:</InputLabel>
            <Input
              type="text"
              name="postoffice"
              value={postoffice}
              onChange={(e) => setPostOffice(e.target.value)}
            />
            <InputLabel>Street:</InputLabel>
            <Input
              type="text"
              name="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
            <InputLabel>City:</InputLabel>
            <Input
              type="text"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <InputLabel>State:</InputLabel>
            <Input
              type="text"
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <InputLabel>Pin Code:</InputLabel>
            <Input
              type="number"
              name="pincode"
              value={pincode}
              onChange={(e) => setPinCode(e.target.value)}
            />
            <MoreButton>
              <SaveButton>Save</SaveButton>
              <Button onClick={() => toggleoff()}>Cancel</Button>
            </MoreButton>
          </Form>
        ) : (
          <>
            <UserInfo>
              <UserInfo>
                <Avatar
                  src={user.profilePic}
                  alt="profilepic"
                  onClick={toggleform}
                />
              </UserInfo>
            </UserInfo>
            <UserInfo>
              <UserInfoLabel>Username:</UserInfoLabel>
              <UserInfoText>{user.name}</UserInfoText>
            </UserInfo>
            <UserInfo>
              <UserInfoLabel>Email:</UserInfoLabel>
              <UserInfoText>{user.email}</UserInfoText>
            </UserInfo>
            <UserInfo>
              <UserInfoLabel>Phone Number:</UserInfoLabel>
              <UserInfoText>{user.phone}</UserInfoText>
            </UserInfo>
            <UserInfo>
              <UserInfoLabel>State:</UserInfoLabel>
              <UserInfoText>{user.state}</UserInfoText>
            </UserInfo>
            <UserInfo>
              <UserInfoLabel>Post Office:</UserInfoLabel>
              <UserInfoText>{user.postoffice}</UserInfoText>
            </UserInfo>
            <UserInfo>
              <UserInfoLabel>Pin Code:</UserInfoLabel>
              <UserInfoText>{user.pincode}</UserInfoText>
            </UserInfo>
            <UserInfo>
              <UserInfoLabel>Street:</UserInfoLabel>
              <UserInfoText>{user.street}</UserInfoText>
            </UserInfo>
            <UserInfo>
              <UserInfoLabel>City:</UserInfoLabel>
              <UserInfoText>{user.city}</UserInfoText>
            </UserInfo>
            <MoreButton>
              <EditButton onClick={toggleform}>Edit</EditButton>
            </MoreButton>
          </>
        )}
      </UserCard>
    </Container>
  );
};
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
`;
const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Heading = styled.h1`
  font-size: 24px;
  text-align: center;
`;

const UserCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const UserInfoLabel = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

const UserInfoText = styled.span`
  flex: 1;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputLabel = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SaveButton = styled.button`
  padding: 8px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const EditButton = styled.button`
  padding: 8px 20px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
const Button = styled.button`
  padding: 8px 20px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const MoreButton = styled.div`
  display: flex;
  gap: 10px;
`;

// export default UserManagement;
