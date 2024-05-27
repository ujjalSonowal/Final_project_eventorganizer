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
import { CreateBook } from "./pages/MyBooking/CreateBook";
import { EventDetailsPage } from "./pages/EventPages/EventDetailsPage";

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
      {/* <Route path="/addevent" element={<AddEvent />} />
      <Route path="/addorganization" element={<AddOrganizer />} /> */}
      {/* <Route path="/myevent" element={<MyEvent />} />
      <Route path="/myorganise" element={<MyOrganization />} /> */}
      <Route path="/allbooking/:id" element={<AllBookings />} />
      <Route path="/createorganization" element={<Myorganization />} />
      <Route path="/myorg/:id" element={<Vieworganise />} />
      <Route path="/myevent/:id" element={<MyEvent />} />
      <Route path="/mybooking/:id" element={<MyBooking />} />
      <Route path="/createbook" element={<CreateBook />} />
      <Route path="/eventdetails/:id" element={<EventDetailsPage />} />
    </Routes>
  );
};
export default Allroutes;

// import React from 'react'
// import { Routes,Route } from "react-router-dom"
// import { Hoempage } from "./pages/homepage/Hoempage";
// import { Organisepage } from "./pages/organisepage/Organisepage";
// import { Signup } from './pages/auth/Signup';
// import { Login } from './pages/auth/Login';
// import { Eventpage } from './pages/EventPages/Eventpage';
// import { ProfileBio } from './pages/UserProfile/ProfileBio';
// import { UserProfile } from './pages/UserProfile/UserProfile';
// import { Myoranization } from './pages/Oranization/Myoranization';
// import { Vieworganise } from './pages/Oranization/Vieworganise';
// import Events from './pages/Myevents/Events';

// const Allroutes = () => {
//   return (
//           <Routes>
//                     <Route path="/" element={<Hoempage /> } />
//                     <Route path="/organise" element={<Organisepage /> } />
//                     <Route path="/events" element={<Eventpage/>}/>
//                     <Route path='/profile/:id' element={<UserProfile/>}/>
//                     <Route path="/signup" element={ <Signup />}/>
//                     <Route path="/login" element={<Login />}/>
//                     <Route path='/createorganization' element ={<Myoranization/>}/>
//                     <Route path='/myorg/:id' element={<Vieworganise/>}/>
//                     <Route path='/myevent/:id' element={<Events /> }/>
//          </Routes>
//   )
// }
// export default Allroutes
