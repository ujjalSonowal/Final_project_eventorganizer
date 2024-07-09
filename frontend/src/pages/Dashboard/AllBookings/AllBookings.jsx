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
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
export const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [org, setOrg] = useState("");
  const currentuser = localStorage.getItem("User");
  const [organiseId, setOrganiseId] = useState("");

  // useEffect(() => {
  //   // fetch(`http://localhost:5001/booking`)
  //   //   .then((response) => response.json())
  //   //   .then((data) => setBookings(data));
  //    async function getOrg() {
  //     const response = await fetch(
  //       `http://localhost:5001/organise/myorg/${currentuser}`,
  //       {
  //         method: "GET",
  //         headers: { "Content-Type": "application/json" },
  //       }
  //     );
  //     if (!response.ok) {
  //       const message = `An error occurred: ${response.statusText}`;
  //       console.error(message);
  //       return;
  //     }
  //     const myOrg = await response.json();
  //     console.log(myOrg)
  //     setOrg(myOrg);
  //     const orgId = myOrg._id;
  //     console.log(orgId)
  //     setOrganiseId(orgId);
  //   }
  //   getOrg();
  //   async function getbooking(orgId) {
  //     fetch(`http://localhost:5001/booking/allbooking/${orgId}`)
  //     .then((response) => response.json())
  //     .then((data) => setBookings(data));
  //   }

  //   getbooking()
  //   return;
  // }, []);
  useEffect(() => {
    const getOrg = async () => {
      const response = await fetch(
        `http://localhost:5001/organise/myorg/${currentuser}`,
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
    };

    // const getBooking = async (orgId) => {
    //   const response = await fetch(`http://localhost:5001/booking/allbooking/${orgId}`);
    //   if (!response.ok) {
    //     const message = `An error occurred: ${response.statusText}`;
    //     console.error(message);
    //     return;
    //   }
    //   const data = await response.json();
    //   setBookings(data);
    // };

    const fetchData = async () => {
      await getOrg();
    };

    fetchData();
  }, [currentuser]);

  useEffect(() => {
    const getBooking = async (orgId) => {
      const response = await fetch(
        `http://localhost:5001/booking/allbooking/${orgId}`
      );
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const data = await response.json();
      setBookings(data);
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

  const [Status, setStatus] = useState(
    (bookings.status = "pending"
      ? "Pending"
      : bookings.status === "rejected"
      ? "Rejected"
      : "Accepted")
  );
  const [price, setPrice] = useState(bookings.price);
  const [capacity, setCapacity] = useState(bookings.capacity);
  const [paymentstatus, setPaymentstatus] = useState(
    bookings.Status === "pending"
      ? "Pending"
      : bookings.Status === "unpaid"
      ? "Unpaid"
      : "Paid"
  );
  const [selectedBookingId, setSelectedBookingId] = useState("");

  const togglePopup = (id, currentStatus, currentPrice, currentCapacity) => {
    setSelectedBookingId(id);
    setStatus(currentStatus);
    setPrice(currentPrice);
    setCapacity(currentCapacity);
    setShowPopup(!showPopup);
    console.log(id);
  };
  const toogleoff = () => {
    setShowPopup(false);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const data = {
      Status: Status,
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
        console.log("wrong id");
      } else {
        const updatedBookings = bookings.map((booking) =>
          booking.id === selectedBookingId
            ? {
                ...booking,
                Status: Status,
                price: price,
                capacity: capacity,
                paymentstatus: paymentstatus,
              }
            : booking
        );
        setBookings(updatedBookings);
      }
      setShowPopup(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
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
          Bookings Request
          {/* <Link to="">
            <Button>view details</Button>
          </Link> */}
        </Card>
        <Card bgColor="#17a2b8">
          {bookinghistory}
          <br />
          Booking History
          {/* <Link to="">
            <Button>view details</Button>
          </Link> */}
        </Card>
        <Card bgColor="#ffc107">
          {rejectbooking}
          <br />
          Rejected Bookings
          {/* <Link to="">
            <Button>view details</Button>
          </Link> */}
        </Card>
      </CardContainer>
      {/* <Title>Accepted Bookings:</Title> */}
      <Table>
        <thead>
          <tr>
            {/* <th>Event ID</th> */}
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
            <tr key={booking.id}>
              {/* <td>{booking.eventId}</td> */}
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
                <Status success={booking.Status}>
                  {booking.Status === "Pending"
                    ? "Pending"
                    : booking.Status === "Rejected"
                    ? "Rejected"
                    : "Accepted"}
                </Status>
              </td>
              <td>
                <Status success={booking.paymentstatus}>
                  {booking.paymentstatus === "Pending"
                    ? "Pending"
                    : booking.paymentstatus === "Unpaid"
                    ? "Unpaid"
                    : "Paid"}
                </Status>
              </td>
              <td>
                {" "}
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
                </button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {showPopup && (
        <>
          <div className="form-popup">
            <form onSubmit={handlesubmit}>
              <label htmlFor="price">Add Amount</label>
              <input
                className="priceinput"
                type="number"
                placeholder="Add Total Amount"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
              <br />
              <label htmlFor="price">Update Capacity</label>
              <input
                className="priceinput"
                type="text"
                placeholder="Add capacity"
                onChange={(e) => setCapacity(e.target.value)}
                value={capacity}
              />
              <br />
              <label htmlFor="Status"> Update Status</label>
              <select
                className="selectst"
                id="status"
                value={Status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
              <label htmlFor="Status"> Payment Status</label>
              <select
                className="selectst"
                id="status"
                value={paymentstatus}
                onChange={(e) => setPaymentstatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Unpaid">Unpaid</option>
                <option value="Paid">Paid</option>
              </select>
              <div className="button-section">
                <button>Update</button>
                <button onClick={toogleoff}>Cancel</button>
              </div>
            </form>
          </div>
        </>
      )}
    </DashboardContainer>
  );
};

// export default Dashboard;
