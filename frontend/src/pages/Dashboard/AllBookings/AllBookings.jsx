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
import { Link } from "react-router-dom";

export const AllBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/booking")
      .then((response) => response.json())
      .then((data) => setBookings(data));
  }, []);

  return (
    <DashboardContainer>
      <CardContainer>
        <Card bgColor="#007bff">
          4<br />
          Total Bookings
        </Card>
        <Card bgColor="#dc3545">
          2<br />
          Bookings Request
          <Link to="">
            <Button>view details</Button>
          </Link>
        </Card>
        <Card bgColor="#17a2b8">
          4<br />
          Booking History
          <Link to="">
            <Button>view details</Button>
          </Link>
        </Card>
        <Card bgColor="#ffc107">
          3<br />
          Rejected Bookings
          <Link to="">
            <Button>view details</Button>
          </Link>
        </Card>
      </CardContainer>
      <Title>Accepted Bookings:</Title>
      <Table>
        <thead>
          <tr>
            <th>Event ID</th>
            <th>User Name</th>
            <th>Booking Date</th>
            <th>Event Name</th>
            <th>Event Type</th>
            <th>No of Days</th>
            <th>Location</th>
            <th>Pincode</th>
            <th>District</th>
            <th>Contact Number</th>
            <th>Email</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.eventId}</td>
              <td>{booking.name}</td>
              <td>{booking.bookingDate}</td>
              <td>{booking.eventname}</td>
              <td>{booking.eventtype}</td>
              <td>{booking.noofday}</td>
              <td>{booking.location}</td>
              <td>{booking.pin}</td>
              <td>{booking.district}</td>
              <td>{booking.contact}</td>
              <td>{booking.email}</td>
              <td>{booking.price}</td>
              {/* <td>
                <Status success={event.status}>
                  {event.status ? "active" : "inactive"}
                </Status>
              </td> */}
            </tr>
          ))}
        </tbody>
      </Table>
    </DashboardContainer>
  );
};

// export default Dashboard;
