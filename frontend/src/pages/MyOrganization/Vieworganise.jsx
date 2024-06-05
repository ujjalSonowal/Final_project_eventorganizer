import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./style.css";
export const Vieworganise = () => {
  const [org, setorg] = useState("");
  const userId = localStorage.getItem("User"); //get current logIn user
  // const current = userId;
  const navigate = useNavigate();
  //get organise details using current user id
  useEffect(() => {
    async function getOrg() {
      const response = await fetch(
        `http://localhost:5001/organise/myorg/${userId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          // body: JSON.stringify({ current })
        }
      );
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const myorg = await response.json();
      setorg(myorg);
      const orgId = myorg._id;
      setorganiseid(orgId);

      //  localStorage.setItem('OrganiseId',orgId);
    }
    if (userId) {
      getOrg(); // Only fetch if userId is available
    }

    // getOrg();
    return;
  }, [userId]);
  const [organiseId, setorganiseid] = useState("");
  const [name, setname] = useState("");
  const [type, settype] = useState("");
  const [capacity, setcapacity] = useState("");
  const [price, setprice] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    const data = { userId, organiseId, name, type, capacity, price };
    try {
      const response = await fetch(`http://localhost:5001/events/create`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error);
      }
      setIsFormOpen(false);
      // setReloadComponent(!reloadComponent);
      navigate(`/myevent/${userId}`);
    } catch (error) {
      console.log("could not submit the form data");
    }
  };
  if (!org) return <div> Create Your Organise</div>;

  return (
    <div className="org-outer-section">
      <div className="org-section">
        <div className="myorg">
          <h1>My Organisations</h1>
          <div className="heading-org">
            <p>
              {" "}
              <strong>Organization Name:</strong> {org.name}
            </p>
            <p>
              {" "}
              <strong>Email:</strong> {org.email}
            </p>
          </div>
          <div className="heading-org">
            <p>
              {" "}
              <strong>Owner Name:</strong> {org.owner}
            </p>
            <p>
              {" "}
              <strong>Contact Number: </strong> {org.phone}
            </p>
          </div>

          <div className="org-details">
            <p>{org.startdate}</p>
            <p>{org.location}</p>
            <p>{org.address}</p>
            <p>{org.pin}</p>
            <p>{org.postoffice}</p>
            <p>{org.state}</p>
            <p>{org.service}</p>
            <p>{org.status}</p>
            <p>{org.rating}</p>
          </div>
        </div>
        <>
          {" "}
          {isFormOpen && (
            <div className="form-popup">
              <div className="form-container">
                <form onSubmit={handlesubmit}>
                  <h2>Add Event details</h2>
                  <label>
                    <span>Event name:</span>
                    <input
                      type="text"
                      placeholder="Event Name"
                      onChange={(e) => setname(e.target.value)}
                      value={name}
                    />
                  </label>
                  <label>
                    <span>Event Type:</span>
                    <input
                      type="text"
                      placeholder="Type"
                      onChange={(e) => settype(e.target.value)}
                      value={type}
                    />
                  </label>
                  <label>
                    <span> Person Capacity:</span>
                    <input
                      type="number"
                      placeholder="Capacity"
                      onChange={(e) => setcapacity(e.target.value)}
                      value={capacity}
                    />
                  </label>
                  <label>
                    <span>Price:</span>
                    <input
                      type="number"
                      placeholder="price"
                      onChange={(e) => setprice(e.target.value)}
                      value={price}
                    />
                  </label>
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => toggleForm()}>
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          )}
        </>
        <div className="items">
          <button onClick={() => toggleForm()}>Add Event</button>
          <button>view Events</button>
          <button>Update Org Details</button>
        </div>
      </div>
    </div>
  );
};
