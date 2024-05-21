import React, { useState, useEffect } from "react";

import "./style.css"; // Import your CSS file for styling

export const MyOrganization = () => {
  const [organise, setOrganise] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false); // Track popup visibility
  const [selectedOrganise, setSelectedOrganise] = useState(null); // Store selected event

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5001/organise`);
      if (!response.ok) {
        console.error(`An error occurred: ${response.statusText}`);
        return;
      }
      const eventsData = await response.json();
      setOrganise(eventsData);
    }

    getRecords();
  }, []);

  const handleEdit = (organise) => {
    setSelectedOrganise(organise); // Set selected event
    setIsEditOpen(true); // Open edit popup
  };

  const handleCloseEdit = () => {
    setSelectedOrganise(null); // Clear selected event
    setIsEditOpen(false); // Close edit popup
  };

  const handleUpdateClicked = () => {
    // Replace this with your logic to update event on the backend
    console.log("Update Organise:", selectedOrganise);
    // Assuming successful update, call a function to update event in the state and close the popup
    handleSaveEdit(selectedOrganise);
  };

  const handleDelete = async (id) => {
    // Send a request to delete the event with the specified ID
    try {
      const response = await fetch(`http://localhost:5001/organise/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete organise");
      }
      // Remove the deleted event from the state
      const updatedOrganise = organise.filter((event) => event.id !== id);
      setOrganise(updatedOrganise);
    } catch (error) {
      console.error("Error deleting organise:", error.message);
    }
  };

  const handleSaveEdit = async (updatedOrganiser) => {
    // Replace this with your actual logic to update event on the backend (e.g., using fetch)
    console.log("Saving organise:", updatedOrganiser);
    // Assuming successful update, update the state with the new event
    const updatedOrganise = organise.map((event) =>
      event.id === updatedOrganise.id ? updatedOrganise : event
    );
    setOrganise(updatedOrganise);
    handleCloseEdit(); // Close edit popup
  };

  return (
    <div className="container">
      <div className="table-container">
        <h1>My Organization</h1>
        <table>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Owner Name</th>
              <th>Description</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {organise.map((organise) => (
              <tr key={organise.id}>
                <td>{organise.companyName}</td>
                <td>{organise.ownerName}</td>
                <td>{organise.description}</td>
                <td>{organise.contactEmail}</td>
                <td>{organise.contactPhone}</td>
                <td>{organise.address}</td>
                <td>{organise.rating}</td>
                <td>
                  <button onClick={() => handleEdit(organise)}>Edit</button>
                  <button onClick={() => handleDelete(organise.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Popup */}
      {isEditOpen && selectedOrganise && (
        <div className="edit-popup">
          <h2>Edit Organise</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="companyName">Company Name:</label>
            <input
              type="text"
              id="companyName"
              value={selectedOrganise.name}
              onChange={(e) =>
                setSelectedOrganise({
                  ...selectedOrganise,
                  name: e.target.value,
                })
              }
            />
            <label htmlFor="ownerName">Owner Name:</label>
            <input
              type="text"
              id="ownerName"
              value={selectedOrganise.name}
              onChange={(e) =>
                setSelectedOrganise({
                  ...selectedOrganise,
                  name: e.target.value,
                })
              }
            />
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              value={selectedOrganise.description}
              onChange={(e) =>
                setSelectedOrganise({
                  ...selectedOrganise,
                  description: e.target.value,
                })
              }
            />
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              value={selectedOrganise.email} // Assuming there's a price property
              onChange={(e) =>
                setSelectedOrganise({
                  ...selectedOrganise,
                  email: e.target.value,
                })
              }
            />
            <label htmlFor="phone">Phone:</label>
            <input
              type="number"
              id="Phone"
              value={selectedOrganise.phone} // Assuming there's a price property
              onChange={(e) =>
                setSelectedOrganise({
                  ...selectedOrganise,
                  phone: e.target.value,
                })
              }
            />
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={selectedOrganise.address} // Assuming there's a price property
              onChange={(e) =>
                setSelectedOrganise({
                  ...selectedOrganise,
                  address: e.target.value,
                })
              }
            />
            <button onClick={handleUpdateClicked}>Update</button>
            <button onClick={handleCloseEdit}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};
