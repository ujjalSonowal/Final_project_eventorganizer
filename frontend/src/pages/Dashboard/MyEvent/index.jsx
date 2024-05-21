import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./event.css";

export const MyEvent = () => {
  const [events, setEvents] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false); // Track popup visibility
  const [selectedEvent, setSelectedEvent] = useState(null); // Store selected event
  // const [currentPage, setCurrentPage] = useState(1);
  // const [eventsPerPage] = useState(5);

  const currentuser = localStorage.getItem("User");

  useEffect(() => {
    async function getEvent() {
      try {
        const response = await fetch(
          `http://localhost:5001/events/my/event/${currentuser}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }
        const myevn = await response.json();
        if (Array.isArray(myevn)) {
          setEvents(myevn);
        } else {
          console.error("Fetched data is not an array");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch events");
      }
    }
    getEvent();
  }, [currentuser]);

  const handleEdit = (event) => {
    setSelectedEvent(event); // Set selected event
    setIsEditOpen(true); // Open edit popup
  };

  const handleCloseEdit = () => {
    setSelectedEvent(null); // Clear selected event
    setIsEditOpen(false); // Close edit popup
  };

  const handleUpdateClicked = () => {
    console.log("Update event:", selectedEvent);
    handleSaveEdit(selectedEvent);
  };

  const handleSaveEdit = async (updatedEvent) => {
    console.log("Saving event:", updatedEvent);
    const updatedEvents = events.map((event) =>
      event.id === updatedEvent.id ? updatedEvent : event
    );
    setEvents(updatedEvents);
    handleCloseEdit(); // Close edit popup
  };

  // Pagination logic
  // const indexOfLastEvent = currentPage * eventsPerPage;
  // const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  // const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <div className="table-container">
        <h1>My Events</h1>
        <table>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Event Type</th>
              <th>Capacity</th>
              <th>Price</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>Total Booking</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.name}</td>
                <td>{event.type}</td>
                <td>{event.capacity}</td>
                <td>{event.price}</td>
                <td>{event.status ? "Active" : "Inactive"}</td>
                <td>{event.createOn}</td>
                <td>{event.totalbooking}</td>
                <td>{event.rating}</td>
                <td>
                  <button onClick={() => handleEdit(event)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="pagination-container">
        <div className="pagination">
          {Array.from(
            { length: Math.ceil(events.length / eventsPerPage) },
            (_, index) => (
              <button key={index} onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            )
          )}
        </div>
      </div> */}

      {/* Edit Popup */}
      {isEditOpen && selectedEvent && (
        <div className="edit-popup">
          <h2>Edit Event</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="eventName">Event Name:</label>
            <input
              type="text"
              id="eventName"
              value={selectedEvent.name}
              onChange={(e) =>
                setSelectedEvent({ ...selectedEvent, name: e.target.value })
              }
            />
            <label htmlFor="eventType">Event Type:</label>
            <input
              type="text"
              id="eventType"
              value={selectedEvent.type}
              onChange={(e) =>
                setSelectedEvent({ ...selectedEvent, type: e.target.value })
              }
            />
            <label htmlFor="capacity">Capacity:</label>
            <input
              type="number"
              id="capacity"
              value={selectedEvent.capacity}
              onChange={(e) =>
                setSelectedEvent({ ...selectedEvent, capacity: e.target.value })
              }
            />
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              value={selectedEvent.price}
              onChange={(e) =>
                setSelectedEvent({ ...selectedEvent, price: e.target.value })
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
