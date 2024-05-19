import React from "react";
import { useEffect, useState } from "react";
import "./myorg.css";
export const Myoranization = () => {
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  // const [userid, setUserId] = useState("");
  const [address, setAddress] = useState("");
  const [services, setServices] = useState([
    { serviceName: "", description: "" },
  ]);

  const userId = localStorage.getItem("User");

  const handleServiceChange = (index, event) => {
    const updatedServices = [...services];
    updatedServices[index][event.target.name] = event.target.value;
    setServices(updatedServices);
  };

  const addService = () => {
    setServices([...services, { serviceName: "", description: "" }]);
  };

  const removeService = (index) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
  };

  const handlesubmit = async (e) => {
    const data = {
      companyName,
      description,
      ownerName,
      contactEmail,
      contactPhone,
      userId,
      services,
    };
    try {
      const response = await fetch(
        `http://localhost:5000/organise/addorganise`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Data not submitted");
      }
      const result = await response.json();
      console.log(result);
      alert("Data submitted successfully!");
    } catch (error) {
      console.error(error);
      alert("Error submitting data: " + error.message);
    }
  };

  return (
    <>
      <div className="form">
        <form onSubmit={handlesubmit}>
          <div className="row">
            <label htmlFor="name">Organize Name:</label>
            <input
              type="text"
              name="companyName"
              onChange={(e) => setCompanyName(e.target.value)}
              value={companyName}
            />

            <label htmlFor="email">Organize Email:</label>
            <input
              type="email"
              name="contactEmail"
              onChange={(e) => setContactEmail(e.target.value)}
              value={contactEmail}
            />
          </div>
          <label htmlFor="owner">Organize Owner:</label>
          <input
            type="text"
            name="ownerName"
            onChange={(e) => setOwnerName(e.target.value)}
            value={ownerName}
          />

          {/* <label htmlFor="userId">User ID:</label>
                <input type="text" name="userId" value={formState.userId} onChange={handleInputChange} /> */}

          <label htmlFor="phone">Phone number:</label>
          <input
            type="tel"
            name="contactPhone"
            onChange={(e) => setContactPhone(e.target.value)}
            value={contactPhone}
          />

          {/* <label htmlFor="startdate">Organization From:</label>
          <input
            type="date"
            name="startdate"
            onChange={(e) => setdate(e.target.value)}
            value={date}
          /> */}

          {/* <label htmlFor="location">Office location:</label>
          <input
            type="text"
            name="location"
            onChange={(e) => setlocation(e.target.value)}
            value={location}
          /> */}

          <label htmlFor="address"> Office Address:</label>
          <input
            type="text"
            name="address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
          <label htmlFor="description"> Description:</label>
          <input
            type="text"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />

          <div className="services-section">
            <h3>Services</h3>
            {services.map((service, index) => (
              <div key={index} className="service">
                <label htmlFor={`serviceName-${index}`}>Service Name:</label>
                <input
                  type="text"
                  name="serviceName"
                  value={service.serviceName}
                  onChange={(e) => handleServiceChange(index, e)}
                />
                <label htmlFor={`serviceDescription-${index}`}>
                  Description:
                </label>
                <input
                  type="text"
                  name="description"
                  value={service.description}
                  onChange={(e) => handleServiceChange(index, e)}
                />
                <button type="button" onClick={() => removeService(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addService}>
              Add Service
            </button>
          </div>

          {/* <label htmlFor="pin">Pin:</label>
          <input
            type="number"
            name="pin"
            onChange={(e) => setpin(e.target.value)}
            value={pin}
          /> */}

          {/* <label htmlFor="postoffice">Post Office:</label>
          <input
            type="text"
            name="postoffice"
            onChange={(e) => setpostoffice(e.target.value)}
            value={postoffice}
          /> */}

          {/* <label htmlFor="state">State:</label>
          <input
            type="text"
            name="state"
            onChange={(e) => setmstate(e.target.value)}
            value={mstate}
          /> */}

          {/* <label htmlFor="service">Service:</label>
          <input
            type="text"
            name="service"
            onChange={(e) => setservice(e.target.value)}
            value={service}
          /> */}

          {/* <label htmlFor="status">Status:</label>
                <input type="checkbox" name="status" checked={formState.status} onChange={(e) => setFormState({ ...formState, status: e.target.checked })} /> */}

          <button type="submit" className="btns">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
