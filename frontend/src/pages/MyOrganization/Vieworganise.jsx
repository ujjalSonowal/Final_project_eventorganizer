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
} from "./viewOrgStyle";

export const Vieworganise = () => {
  const [org, setOrg] = useState("");
  const [status, setStatus] = useState(""); // State variable for status
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
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const toggleUpdateForm = () => {
    setIsUpdateFormOpen(!isUpdateFormOpen);
  };

  const handleSubmit = async (e) => {
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
      navigate(`/myevent/${userId}`);
    } catch (error) {
      console.log("Could not submit the form data");
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: org.name,
      email: org.email,
      phone: org.phone,
      location: org.location,
      status: status, // Include status in the data object
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

  if (!org) return <div>Create Your Organisation</div>;

  return (
    <OuterSection>
      <OrgSection>
        <MyOrg>
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
            <Detail>{org.status}</Detail>
            <Detail>{org.rating}</Detail>
          </OrgDetails>
        </MyOrg>
        <>
          {isFormOpen && (
            <FormPopup>
              <FormContainer>
                <form onSubmit={handleSubmit}>
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
                </form>
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
                  <label>
                    <span>Status:</span>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)} // Update the status state directly
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </label>

                  <Button type="submit">Save</Button>
                  <Button type="button" onClick={() => toggleUpdateForm()}>
                    Cancel
                  </Button>
                </form>
              </FormContainer>
            </FormPopup>
          )}
        </>
        <Items>
          <Button onClick={() => toggleForm()}>Add Event</Button>
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
