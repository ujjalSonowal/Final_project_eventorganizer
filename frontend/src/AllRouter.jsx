import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { OrganizerPage } from "./pages/OrganizerPage/OrganizerPage";
import { Signup } from "./pages/Auth/Signup";
import { Login } from "./pages/Auth/Login";
import { Eventpage } from "./pages/EventPages/Eventpage";
import { ProfileBio } from "./pages/UserProfile/ProfileBio";
import { UserProfile } from "./pages/UserProfile/UserProfile";
import { Booking } from "./pages/BookingPage/Booking";
import { AddEvent } from "./pages/AddEvent/index";
import { AddOrganizer } from "./pages/AddOrganizer/index";
import { MyEvent } from "./pages/Dashboard/MyEvent/index";
import { MyOrganization } from "./pages/Dashboard/MyOrganization";
// import { AllBookings } from "./pages/Dashboard/AllBookings";

const Allroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/organise" element={<OrganizerPage />} />
      <Route path="/events" element={<Eventpage />} />
      <Route path="/profile/:id" element={<UserProfile />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/addevent" element={<AddEvent />} />
      <Route path="/addorganization" element={<AddOrganizer />} />
      <Route path="/myevent" element={<MyEvent />} />
      <Route path="/myorganise" element={<MyOrganization />} />
      {/* <Route path="/allbooking" element={<AllBookings />} /> */}
    </Routes>
  );
};
export default Allroutes;
