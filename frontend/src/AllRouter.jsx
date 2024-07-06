import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { OrganizerPage } from "./pages/OrganizerPage/OrganizerPage";
import { Signup } from "./pages/Auth/Signup";
import { Login } from "./pages/Auth/Login";
import { Eventpage } from "./pages/EventPages/Eventpage";
import { ProfileBio } from "./pages/UserProfile/ProfileBio";
import { UserProfile } from "./pages/UserProfile/UserProfile";
// import { Booking } from "./pages/BookingPage/Booking";
// import { AddEvent } from "./pages/AddEvent/index";
// import { AddOrganizer } from "./pages/AddOrganizer/index";
// import { MyEvent } from "./pages/Dashboard/MyEvent/index";
// import { MyOrganization } from "./pages/Dashboard/MyOrganization";
import { AllBookings } from "./pages/Dashboard/AllBookings/AllBookings";

import { Myorganization } from "./pages/MyOrganization/Myorganization";
import { Vieworganise } from "./pages/MyOrganization/Vieworganise";
import { MyEvent } from "./pages/MyEvents/MyEvent";
import { MyBooking } from "./pages/MyBooking/MyBooking";
// import { CreateBook } from "./pages/MyBooking/CreateBook";
// import { EventDetailsPage } from "./pages/EventPages/EventDetailsPage";
import { EventsOrganise } from "./pages/EventPages/EventsOrganise";
import { RecentBooking } from "./pages/MyBooking/RecentBooking";
import { AboutPage } from "./pages/Dashboard/AboutPage/index";

const Allroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/booking" element={<Booking />} /> */}
      <Route path="/organise" element={<OrganizerPage />} />
      <Route path="/events" element={<Eventpage />} />
      <Route path="/profile/:id" element={<UserProfile />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/profile/:id/bio" element={<ProfileBio />} /> */}
      <Route path="/about" element={<AboutPage />} />
      <Route path="/allbooking/:id" element={<AllBookings />} />
      <Route path="/createorganization" element={<Myorganization />} />
      <Route path="/myorg/:id" element={<Vieworganise />} />
      <Route path="/myevent/:id" element={<MyEvent />} />
      <Route path="/mybooking/:id" element={<MyBooking />} />
      {/* <Route path="/createbook/:eventId" element={<CreateBook />} /> */}
      {/* <Route path="/eventdetails/:id" element={<EventDetailsPage />} /> */}
      <Route path="/organise/events/:id" element={<EventsOrganise />} />
      <Route path="/viewbooking/:id" element={<RecentBooking />} />
    </Routes>
  );
};
export default Allroutes;
