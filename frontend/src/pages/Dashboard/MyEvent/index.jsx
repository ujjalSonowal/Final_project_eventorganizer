import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./event.css";

export const MyEvent = () => {
  const [events, setEvents] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false); // Track popup visibility
  const [selectedEvent, setSelectedEvent] = useState(null); // Store selected event
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(5);

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/events`);
      if (!response.ok) {
        console.error(`An error occurred: ${response.statusText}`);
        return;
      }
      const eventsData = await response.json();
      setEvents(eventsData);
    }

    getRecords();
  }, []);

  const handleEdit = (event) => {
    setSelectedEvent(event); // Set selected event
    setIsEditOpen(true); // Open edit popup
  };

  const handleCloseEdit = () => {
    setSelectedEvent(null); // Clear selected event
    setIsEditOpen(false); // Close edit popup
  };

  const handleUpdateClicked = () => {
    // Replace this with your logic to update event on the backend
    console.log("Update event:", selectedEvent);
    // Assuming successful update, call a function to update event in the state and close the popup
    handleSaveEdit(selectedEvent);
  };

  const handleDelete = async (eventId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/events/delete/${eventId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete event");
      }
      // Update state to remove the deleted event
      setEvents(events.filter((event) => event.id !== eventId));
      // Display success message
      toast.success("Event deleted successfully");
    } catch (error) {
      console.error("Error deleting event:", error);
      // Display error message
      toast.error("Failed to delete event");
    }
  };

  const handleSaveEdit = async (updatedEvent) => {
    // Replace this with your actual logic to update event on the backend (e.g., using fetch)
    console.log("Saving event:", updatedEvent);
    // Assuming successful update, update the state with the new event
    const updatedEvents = events.map((event) =>
      event.id === updatedEvent.id ? updatedEvent : event
    );
    setEvents(updatedEvents);
    handleCloseEdit(); // Close edit popup
  };

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            {currentEvents.map((event) => (
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
                  {/* <Link to={`/myevent/${event.id}`}>Edit</Link> */}
                  <button onClick={() => handleEdit(event)}>Edit</button>
                  <button onClick={() => handleDelete(event.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-container">
        <div className="pagination">
          {events.map((event, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>

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
              value={selectedEvent.price} // Assuming there's a price property
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
