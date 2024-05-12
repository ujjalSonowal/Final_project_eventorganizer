import React, { useState } from "react";
import "./booking.css";

export function Booking() {
  const [bookingDate, setBookingDate] = useState(new Date());
  const [totalDays, setTotalDays] = useState(1);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [capacity, setCapacity] = useState(0);
  // const [paymentStatus, setPaymentStatus] = useState("Unpaid");

  const handleBookingDateChange = (event) => {
    setBookingDate(new Date(event.target.value));
  };

  const handleTotalDaysChange = (event) => {
    setTotalDays(parseInt(event.target.value));
  };

  // const handlePaymentStatusChange = (event) => {
  //   setPaymentStatus(event.target.value);
  // };

  const handleCapacityChange = (event) => {
    setCapacity(parseInt(event.target.value));
  };

  return (
    <form className="booking-form">
      <label>Booking Date:</label>
      <input
        type="date"
        value={bookingDate.toISOString().substring(0, 10)}
        onChange={handleBookingDateChange}
      />
      <label>Total Days:</label>
      <input
        type="number"
        value={totalDays}
        onChange={handleTotalDaysChange}
        min="1"
      />
      <div>
        <label for="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startTime}
          onChange={(event) => setStartTime(event.target.value)}
        />
        <label for="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endTime}
          onChange={(event) => setEndTime(event.target.value)}
        />
      </div>
      {/* <label>Payment Status:</label>
      <div>
        <input
          type="radio"
          id="unpaid"
          name="paymentStatus"
          value="Unpaid"
          checked={paymentStatus === "Unpaid"}
          onChange={handlePaymentStatusChange}
        />
        <label for="unpaid">Unpaid</label>
        <input
          type="radio"
          id="paid"
          name="paymentStatus"
          value="Paid"
          checked={paymentStatus === "Paid"}
          onChange={handlePaymentStatusChange}
        />
        <label for="paid">Paid</label>
      </div> */}
      <label>Capacity:</label>
      <input
        type="number"
        value={capacity}
        onChange={handleCapacityChange}
        min="1"
      />{" "}
      {/* Set minimum capacity to 1 */}
      <br />
      <button type="submit">Submit Booking</button>
    </form>
  );
}

// export default Booking;
