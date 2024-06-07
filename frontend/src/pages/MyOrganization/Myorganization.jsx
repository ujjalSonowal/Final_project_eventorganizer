import React, { useState } from "react";
import "./myorg.css";

export const Myorganization = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [owner, setOwner] = useState("");
  const [phone, setPhone] = useState("");
  const [startdate, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [pin, setPin] = useState("");
  const [postoffice, setPostoffice] = useState("");
  const [state, setMstate] = useState("");
  const [services, setServices] = useState([""]);
  const [status, setStatus] = useState("Active");

  const userId = localStorage.getItem("User");

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
    const data = {
      name,
      email,
      owner,
      userId,
      phone,
      startdate,
      location,
      address,
      pin,
      postoffice,
      state,
      status,
      services, // Ensure services is included in the data
    };
    try {
      const response = await fetch(`http://localhost:5001/organise/post`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Data not submitted");
      }
      const result = await response.json();
      console.log(result);
      alert("Data submitted successfully!");
      const organiseId = result.id;
      localStorage.setItem("OrganiseId", organiseId);

      // Reset the form fields
      setName("");
      setEmail("");
      setOwner("");
      setPhone("");
      setDate("");
      setLocation("");
      setAddress("");
      setPin("");
      setPostoffice("");
      setMstate("");
      setServices([""]);
      setStatus("");
    } catch (error) {
      console.error(error);
      alert("Error submitting data: " + error.message);
    }
  };

  return (
    <>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <label htmlFor="name">Organize Name:</label>
            <input
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />

            <label htmlFor="email">Organize Email:</label>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <label htmlFor="owner">Organize Owner:</label>
          <input
            type="text"
            name="owner"
            onChange={(e) => setOwner(e.target.value)}
            value={owner}
          />

          <label htmlFor="phone">Phone number:</label>
          <input
            type="tel"
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />

          <label htmlFor="startdate">Organization From:</label>
          <input
            type="date"
            name="startdate"
            onChange={(e) => setDate(e.target.value)}
            value={startdate}
          />

          <label htmlFor="location">Office location:</label>
          <input
            type="text"
            name="location"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          />

          <label htmlFor="address"> Office Address:</label>
          <input
            type="text"
            name="address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />

          <label htmlFor="pin">Pin:</label>
          <input
            type="number"
            name="pin"
            onChange={(e) => setPin(e.target.value)}
            value={pin}
          />

          <label htmlFor="postoffice">Post Office:</label>
          <input
            type="text"
            name="postoffice"
            onChange={(e) => setPostoffice(e.target.value)}
            value={postoffice}
          />

          <label htmlFor="state">State:</label>
          <input
            type="text"
            name="state"
            onChange={(e) => setMstate(e.target.value)}
            value={state}
          />
          <label htmlFor="status">Status:</label>
          <select
            name="status"
            onChange={(e) => setStatus(e.target.value)}
            value={status}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <div className="services-section">
            <label htmlFor="services">Services:</label>
            {services.map((service, index) => (
              <div key={index} className="service">
                <input
                  type="text"
                  value={service}
                  onChange={(e) => handleServiceChange(index, e.target.value)}
                />
                <button type="button" onClick={() => removeService(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addService} className="btns">
              Add Service
            </button>
          </div>

          <button type="submit" className="btns">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
