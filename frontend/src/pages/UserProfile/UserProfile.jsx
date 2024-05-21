import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProfileBio } from "./ProfileBio";
import "./userprofile.css";
import { Sidenav } from "../../components/Sidenav/Sidenav";

export const UserProfile = () => {
  const [user, setUser] = useState([]);
  const { id } = useParams();
  const current = id;
  useEffect(() => {
    async function getuser() {
      const response = await fetch(`http://localhost:5001/user/${current}`);
      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const user = await response.json();
      setUser(user);
    }
    getuser();
    return;
  }, [current]);

  return (
    <>
      <div className="maincontainer">
        <div className="profile-section">
          <ProfileBio user={user} />
        </div>
        {/* <div className="sidenav">
            <Sidenav/>
          </div> */}
      </div>
    </>
  );
};
