import React from "react";
import { useEffect, useState } from "react";
import "./myorg.css";
export const Myorganization = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [owner, setowner] = useState("");
  const [phone, setphone] = useState("");
  const [date, setdate] = useState("");
  const [location, setlocation] = useState("");
  const [address, setaddress] = useState("");
  const [pin, setpin] = useState("");
  const [postoffice, setpostoffice] = useState("");
  const [mstate, setmstate] = useState("");
  const [service, setservice] = useState("");

  const userId = localStorage.getItem("User");
  const handlesubmit = async (e) => {
    const data = {
      name,
      email,
      owner,
      userId,
      phone,
      date,
      location,
      address,
      pin,
      postoffice,
      mstate,
      service,
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
              name="name"
              onChange={(e) => setname(e.target.value)}
              value={name}
            />

            <label htmlFor="email">Organize Email:</label>
            <input
              type="email"
              name="email"
              onChange={(e) => setemail(e.target.value)}
              value={email}
            />
          </div>
          <label htmlFor="owner">Organize Owner:</label>
          <input
            type="text"
            name="owner"
            onChange={(e) => setowner(e.target.value)}
            value={owner}
          />

          {/* <label htmlFor="userId">User ID:</label>
                <input type="text" name="userId" value={formState.userId} onChange={handleInputChange} /> */}

          <label htmlFor="phone">Phone number:</label>
          <input
            type="tel"
            name="phone"
            onChange={(e) => setphone(e.target.value)}
            value={phone}
          />

          <label htmlFor="startdate">Organization From:</label>
          <input
            type="date"
            name="startdate"
            onChange={(e) => setdate(e.target.value)}
            value={date}
          />

          <label htmlFor="location">Office location:</label>
          <input
            type="text"
            name="location"
            onChange={(e) => setlocation(e.target.value)}
            value={location}
          />

          <label htmlFor="address"> Office Address:</label>
          <input
            type="text"
            name="address"
            onChange={(e) => setaddress(e.target.value)}
            value={address}
          />

          <label htmlFor="pin">Pin:</label>
          <input
            type="number"
            name="pin"
            onChange={(e) => setpin(e.target.value)}
            value={pin}
          />

          <label htmlFor="postoffice">Post Office:</label>
          <input
            type="text"
            name="postoffice"
            onChange={(e) => setpostoffice(e.target.value)}
            value={postoffice}
          />

          <label htmlFor="state">State:</label>
          <input
            type="text"
            name="state"
            onChange={(e) => setmstate(e.target.value)}
            value={mstate}
          />

          <label htmlFor="service">Service:</label>
          <input
            type="text"
            name="service"
            onChange={(e) => setservice(e.target.value)}
            value={service}
          />

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
