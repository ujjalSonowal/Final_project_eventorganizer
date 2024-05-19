import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
export const Vieworganise = () => {
  const [org, setOrg] = useState("");
  const userId = localStorage.getItem("User"); //get current logIn user
  const current = userId;
  const navigate = useNavigate();
  //get organise details using current user id
  useEffect(() => {
    async function getOrg() {
      const response = await fetch(
        `http://localhost:5000/organise/myorg/${current}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ current }),
        }
      );
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const myorg = await response.json();
      setOrg(myorg);
      const orgId = myorg._id;
      setorganiseid(orgId);
    }

    getOrg();
    return;
  }, [current]);

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
      const response = await fetch(`http://localhost:5000/events/create`, {
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

  return (
    <>
      <div className="myorg">
        {/* <p>{organiseid}</p> */}
        <p>{org.companyName}</p>
        <p>{org.contactEmail}</p>
        <p>{org.contactPhone}</p>
        <p>{org.address}</p>
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
      </div>
    </>
  );
};
