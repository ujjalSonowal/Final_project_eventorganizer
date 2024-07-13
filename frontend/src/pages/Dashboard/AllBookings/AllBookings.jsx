import React, { useEffect, useState } from "react";
import {
  DashboardContainer,
  CardContainer,
  Card,
  Table,
  Status,
  Title,
  Button,
} from "./Allbooking.styles";
import "./Popform.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

export const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [org, setOrg] = useState("");
  const currentuser = localStorage.getItem("User");
  const [organiseId, setOrganiseId] = useState("");

  useEffect(() => {
    const getOrg = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/organise/myorg/${currentuser}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const myOrg = await response.json();
        setOrg(myOrg);
        const orgId = myOrg._id;
        setOrganiseId(orgId);
      } catch (error) {
        console.error("Error fetching organization:", error);
      }
    };

    const fetchData = async () => {
      await getOrg();
    };

    fetchData();
  }, [currentuser]);

  useEffect(() => {
    const getBooking = async (orgId) => {
      try {
        const response = await fetch(
          `http://localhost:5001/booking/allbooking/${orgId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    if (organiseId) {
      getBooking(organiseId);
    }
  }, [organiseId]);

  const totalBookings = bookings.length;
  const bookingRequests = bookings.filter(
    (booking) => booking.Status === "Pending"
  ).length;
  const bookinghistory = bookings.filter(
    (booking) => booking.Status === "Accepted"
  ).length;
  const rejectbooking = bookings.filter(
    (booking) => booking.Status === "Rejected"
  ).length;

  const [status, setStatus] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [paymentstatus, setPaymentstatus] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState("");

  const togglePopup = (
    id,
    currentStatus,
    currentPrice,
    currentCapacity,
    currentPaymentStatus
  ) => {
    setSelectedBookingId(id);
    setStatus(currentStatus);
    setPrice(currentPrice);
    setCapacity(currentCapacity);
    setPaymentstatus(currentPaymentStatus);
    setShowPopup(!showPopup);
  };

  const toggleOff = () => {
    setShowPopup(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      Status: status,
      price: price,
      capacity: capacity,
      paymentstatus: paymentstatus,
    };
    try {
      const response = await fetch(
        `http://localhost:5001/booking/update/${selectedBookingId}`,
        {
          method: "PATCH",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const updatedBookings = bookings.map((booking) =>
          booking._id === selectedBookingId
            ? {
                ...booking,
                Status: status,
                price: price,
                capacity: capacity,
                paymentstatus: paymentstatus,
              }
            : booking
        );
        setBookings(updatedBookings);
      }
      setShowPopup(false);
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  return (
    <DashboardContainer>
      <CardContainer>
        <Card bgColor="#007bff">
          {totalBookings}
          <br />
          Total Bookings
        </Card>
        <Card bgColor="#dc3545">
          {bookingRequests}
          <br />
          Booking Requests
        </Card>
        <Card bgColor="#17a2b8">
          {bookinghistory}
          <br />
          Booking History
        </Card>
        <Card bgColor="#ffc107">
          {rejectbooking}
          <br />
          Rejected Bookings
        </Card>
      </CardContainer>
      <Table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Booking Date</th>
            <th>Event Name</th>
            <th>Event Type</th>
            <th>No of Days</th>
            <th>Capacity</th>
            <th>Location</th>
            <th>Pincode</th>
            <th>District</th>
            <th>Contact Number</th>
            <th>Email</th>
            <th>Price</th>
            <th>Status</th>
            <th>Payment Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.name}</td>
              <td>{booking.bookingDate}</td>
              <td>{booking.eventname}</td>
              <td>{booking.eventtype}</td>
              <td>{booking.noofday}</td>
              <td>{booking.capacity}</td>
              <td>{booking.location}</td>
              <td>{booking.pin}</td>
              <td>{booking.district}</td>
              <td>{booking.contact}</td>
              <td>{booking.email}</td>
              <td>{booking.price}</td>
              <td>
                <Status success={booking.Status === "Accepted"}>
                  {booking.Status}
                </Status>
              </td>
              <td>
                <Status success={booking.paymentstatus === "Paid"}>
                  {booking.paymentstatus}
                </Status>
              </td>
              <td>
                <button
                  onClick={() =>
                    togglePopup(
                      booking._id,
                      booking.Status,
                      booking.price,
                      booking.capacity,
                      booking.paymentstatus
                    )
                  }
                >
                  <FontAwesomeIcon icon={faPen} className="snav-icon" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {showPopup && (
        <div className="form-popup">
          <form onSubmit={handleSubmit}>
            <label htmlFor="price">Add Amount</label>
            <input
              className="priceinput"
              type="number"
              placeholder="Add Total Amount"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <br />
            <label htmlFor="capacity">Update Capacity</label>
            <input
              className="priceinput"
              type="text"
              placeholder="Add Capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
            <br />
            <label htmlFor="status">Update Status</label>
            <select
              className="selectst"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
            <label htmlFor="paymentstatus">Payment Status</label>
            <select
              className="selectst"
              id="paymentstatus"
              value={paymentstatus}
              onChange={(e) => setPaymentstatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Paid">Paid</option>
            </select>
            <div className="button-section">
              <button type="submit">Update</button>
              <button type="button" onClick={toggleOff}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </DashboardContainer>
  );
};
