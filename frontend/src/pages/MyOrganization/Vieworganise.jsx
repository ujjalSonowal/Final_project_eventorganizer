import React, { useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

export const Vieworganise = () => {
  const [org, setOrg] = useState({});
  const userId = localStorage.getItem("User");
  const navigate = useNavigate();

  useEffect(() => {
    async function getOrg() {
      try {
        const response = await fetch(
          `http://localhost:5001/organise/myorg/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch organizer details");
        }
        const myorg = await response.json();
        setOrg(myorg);
      } catch (error) {
        console.error(error);
      }
    }
    getOrg();
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
      const response = await fetch(`http://localhost:5000/events/post`, {
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
      navigate("/");
    } catch (error) {
      console.log("could not submit the form data");
    }
  };

  const handleDelete = async () => {
    // Handle delete functionality here
  };

  const handleUpdate = async () => {
    // Handle update functionality here
  };

  return (
    <>
      <div className="organise-container">
        <div className="organise-header">
          <h2>Organizer Details</h2>
          <div>
            <button id="delete-btn" onClick={handleDelete}>
              Delete
            </button>
            <button id="update-btn" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </div>
        <table className="org-table">
          <tbody>
            <tr>
              <td>Company Name:</td>
              <td>{org.companyName}</td>
            </tr>
            <tr>
              <td>Contact Email:</td>
              <td>{org.contactEmail}</td>
            </tr>
            <tr>
              <td>Contact Phone:</td>
              <td>{org.contactPhone}</td>
            </tr>
            <tr>
              <td>Address:</td>
              <td>{org.address}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <>
        {" "}
        {isFormOpen && (
          <div className="form-popup-event">
            <div className="form-container-event">
              <form onSubmit={handlesubmit}>
                <h2>Add Event details</h2>
                <label>
                  <span>Event name:</span>
                  <input
                    id="etn"
                    type="text"
                    placeholder="Event Name"
                    onChange={(e) => setname(e.target.value)}
                    value={name}
                  />
                </label>
                <label>
                  <span>Event Type:</span>
                  <input
                    id="etn"
                    type="text"
                    placeholder="Type"
                    onChange={(e) => settype(e.target.value)}
                    value={type}
                  />
                </label>
                <label>
                  <span> Person Capacity:</span>
                  <input
                    id="etn"
                    type="number"
                    placeholder="Capacity"
                    onChange={(e) => setcapacity(e.target.value)}
                    value={capacity}
                  />
                </label>
                <label>
                  <span>Price:</span>
                  <input
                    id="etn"
                    type="number"
                    placeholder="price"
                    onChange={(e) => setprice(e.target.value)}
                    value={price}
                  />
                </label>
                <button id="t-btn" type="submit">
                  Save
                </button>
                <button id="t-btn" type="button" onClick={() => toggleForm()}>
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </>
      <div className="items">
        <button id="vi-btn" onClick={() => toggleForm()}>
          Add Event
        </button>
        <button id="vi-btn">view Events</button>
      </div>
    </>
  );
};
