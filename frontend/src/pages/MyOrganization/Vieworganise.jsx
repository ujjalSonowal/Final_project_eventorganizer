import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  OuterSection,
  OrgSection,
  MyOrg,
  Title,
  HeadingOrg,
  Detail,
  OrgDetails,
  ServicesContainer,
  ServiceBox,
  FormPopup,
  FormContainer,
  Button,
  Items,
  AddButton,
} from "./viewOrgStyle";

import "./addevent.css";

export const Vieworganise = () => {
  const [org, setOrg] = useState("");
  const [status, setStatus] = useState(false); // State variable for status
  const userId = localStorage.getItem("User");
  const navigate = useNavigate();

  useEffect(() => {
    async function getOrg() {
      const response = await fetch(
        `http://localhost:5001/organise/myorg/${userId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const myOrg = await response.json();
      setOrg(myOrg);
      const orgId = myOrg._id;
      setOrganiseId(orgId);
    }

    if (userId) {
      getOrg();
    }

    return;
  }, [userId]);

  const [organiseId, setOrganiseId] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [capacity, setCapacity] = useState([]);
  const [services, setServices] = useState([""]);
  const [price, setPrice] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const toggleUpdateForm = () => {
    setIsUpdateFormOpen(!isUpdateFormOpen);
  };

  const handleServiceChange = (index, value) => {
    const newServices = [...services];
    newServices[index] = value;
    setServices(newServices);
  };

  const addService = () => {
    setServices([...services, ""]);
  };

  const removeService = (index) => {
    const newServices = services.filter((_, i) => i !== index);
    setServices(newServices);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { userId, organiseId, name, type, capacity, price, services };
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
      navigate(`/myevent/${userId}`);
    } catch (error) {
      console.log("Could not submit the form data");
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: org.name,
      owner: org.owner,
      email: org.email,
      phone: org.phone,
      location: org.location,
      status: org.status,
      services: org.services,
    };
    try {
      const response = await fetch(
        `http://localhost:5001/organise/update/${organiseId}`,
        {
          method: "PATCH",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error);
      }
      setIsUpdateFormOpen(false);
      setOrg(json);
    } catch (error) {
      console.log("Could not update the organisation data");
    }
  };
  //add capacity
  const [newCapacity, setnewcapacity] = useState("");

  const addCapacity = () => {
    if (newCapacity) {
      setCapacity([...capacity, newCapacity]);
      setnewcapacity("");
    }
  };
  const removeCapacity = (index) => {
    setCapacity(capacity.filter((_, i) => i !== index));
  };
  //add price
  const [newPrice, setNewPrice] = useState("");

  const addPrice = () => {
    if (newPrice) {
      setPrice([...price, newPrice]);
      setNewPrice("");
    }
  };

  const removeprice = (index) => {
    setPrice(price.filter((_, i) => i !== index));
  };

  if (!org) return <div>Create Your Organisation</div>;

  return (
    <OuterSection>
      <OrgSection>
        <AddButton onClick={() => toggleForm()}>Add Event</AddButton>
        <MyOrg isFormOpen={isFormOpen}>
          <Title>My Organisations</Title>
          <HeadingOrg>
            <Detail>
              <strong>Organization Name:</strong> {org.name}
            </Detail>
            <Detail>
              <strong>Email:</strong> {org.email}
            </Detail>
          </HeadingOrg>
          <HeadingOrg>
            <Detail>
              <strong>Owner Name:</strong> {org.owner}
            </Detail>
            <Detail>
              <strong>Contact Number:</strong> {org.phone}
            </Detail>
          </HeadingOrg>

          <OrgDetails>
            <Detail>
              <strong>Organization Created: </strong>
              {org.startdate}
            </Detail>
            <Detail>{org.location}</Detail>
            <Detail>{org.address}</Detail>
            <Detail>{org.pin}</Detail>
            <Detail>{org.postoffice}</Detail>
            <Detail>{org.state}</Detail>

            <ServicesContainer>
              <p>Services:</p>
              {org.services?.map((service, index) => (
                <ServiceBox key={index}>{service}</ServiceBox>
              ))}
            </ServicesContainer>
            <Detail>{org.status ? "Active" : "Inactive"}</Detail>
            {/* <Detail>{org.rating}</Detail> */}
          </OrgDetails>
        </MyOrg>
        <>
          {isFormOpen && (
            <FormPopup>
              <FormContainer>
                {/* <form onSubmit={handleSubmit}>
                    <h2>Add Event Details</h2>
                    <label>
                      <span>Event Name:</span>
                      <input
                        type="text"
                        placeholder="Event Name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                      />
                    </label>
                    <label>
                      <span>Event Type:</span>
                      <input
                        type="text"
                        placeholder="Type"
                        onChange={(e) => setType(e.target.value)}
                        value={type}
                      />
                    </label>
                    <label>
                      <span>Person Capacity:</span>
                      <input
                        type="number"
                        placeholder="Capacity"
                        onChange={(e) => setCapacity(e.target.value)}
                        value={capacity}
                      />
                    </label>
                    <label>
                      <span>Price:</span>
                      <input
                        type="number"
                        placeholder="Price"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                      />
                    </label>
                    <Button type="submit">Save</Button>
                    <Button type="button" onClick={() => toggleForm()}>
                      Cancel
                    </Button>
                  </form> */}
                <div className="form-popup">
                  <form onSubmit={handleSubmit}>
                    <h2>Add Event details</h2>
                    <label>Event name:</label>
                    <input
                      type="text"
                      placeholder="Event Name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      required
                    />

                    <label>Event Type: </label>
                    <input
                      type="text"
                      placeholder="Type"
                      onChange={(e) => setType(e.target.value)}
                      value={type}
                      required
                    />

                    <label htmlFor="capacity">Event Capacity:</label>
                    <div>
                      <input
                        type="text"
                        placeholder="add-capacity"
                        onChange={(e) => setnewcapacity(e.target.value)}
                      />
                      <button
                        type="button"
                        className="add-service"
                        onClick={addCapacity}
                      >
                        {" "}
                        Add Capacity
                      </button>
                    </div>
                    <ol>
                      {capacity.map((capacity, index) => (
                        <li key={index}>
                          {capacity}
                          <button
                            type="button"
                            className="remove-service"
                            onClick={() => removeCapacity(index)}
                          >
                            X
                          </button>
                        </li>
                      ))}
                    </ol>
                    <label htmlFor="price">Price</label>
                    <div>
                      <input
                        type="text"
                        placeholder="Add a Price"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                      />
                      <button
                        type="button"
                        className="add-service"
                        onClick={addPrice}
                      >
                        Add Price
                      </button>
                    </div>
                    <ul>
                      {price.map((price, index) => (
                        <li key={index}>
                          {price}
                          <button
                            type="button"
                            className="remove-service"
                            onClick={() => removeprice(index)}
                          >
                            X
                          </button>
                        </li>
                      ))}
                    </ul>
                    <div className="services-section">
                      <label htmlFor="services">Services:</label>
                      {services.map((service, index) => (
                        <div key={index} className="service">
                          <input
                            type="text"
                            value={service}
                            onChange={(e) =>
                              handleServiceChange(index, e.target.value)
                            }
                          />
                          <button
                            type="button"
                            onClick={() => removeService(index)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button type="button" onClick={addService}>
                        Add Service
                      </button>
                    </div>
                    <div className="morebutton">
                      <button id="mrbtn" type="submit">
                        Save
                      </button>
                      <button
                        id="mrbtn"
                        type="button"
                        onClick={() => toggleForm()}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </FormContainer>
            </FormPopup>
          )}
        </>
        <>
          {isUpdateFormOpen && (
            <FormPopup>
              <FormContainer>
                <form onSubmit={handleUpdateSubmit}>
                  <h2>Update Organisation Details</h2>
                  <label>
                    <span>Organisation Name:</span>
                    <input
                      type="text"
                      placeholder="Organisation Name"
                      onChange={(e) => setOrg({ ...org, name: e.target.value })}
                      value={org.name}
                    />
                  </label>
                  <label>
                    <span>Onwer Name:</span>
                    <input
                      type="text"
                      placeholder="Owner Name"
                      onChange={(e) =>
                        setOrg({ ...org, owner: e.target.value })
                      }
                      value={org.owner}
                    />
                  </label>
                  <label>
                    <span>Email:</span>
                    <input
                      type="email"
                      placeholder="Email"
                      onChange={(e) =>
                        setOrg({ ...org, email: e.target.value })
                      }
                      value={org.email}
                    />
                  </label>
                  <label>
                    <span>Phone:</span>
                    <input
                      type="text"
                      placeholder="Phone"
                      onChange={(e) =>
                        setOrg({ ...org, phone: e.target.value })
                      }
                      value={org.phone}
                    />
                  </label>
                  <label>
                    <span>Location:</span>
                    <input
                      type="text"
                      placeholder="Location"
                      onChange={(e) =>
                        setOrg({ ...org, location: e.target.value })
                      }
                      value={org.location}
                    />
                  </label>
                  <label>Status</label>
                  <select
                    className="selectbtn"
                    onChange={(e) =>
                      setOrg({ ...org, status: e.target.value === "true" })
                    }
                    value={org.status}
                  >
                    <option value={"true"}>Active</option>
                    <option value={"false"}>Inactive</option>
                  </select>

                  <Button type="submit">Save</Button>
                  <Button type="button" onClick={() => toggleUpdateForm()}>
                    Cancel
                  </Button>
                </form>
              </FormContainer>
            </FormPopup>
          )}
        </>

        <Items isFormOpen={isFormOpen}>
          <Link to={`/myevent/${organiseId}`}>
            <Button>View Events</Button>
          </Link>
          <Button onClick={() => toggleUpdateForm()}>
            Update Organization Details
          </Button>
          <Button>Delete</Button>
        </Items>
      </OrgSection>
    </OuterSection>
  );
};

export default Vieworganise;
