const express = require("express");
const {
  createbooking,
  getbookingall,
  getsinglebooking,
  updatebooking,
  // getbookinguser,
  getmybooking,
  getallbooking,
  deletebooking,
  recentbooking,
  getBookingsForEvent,
  checkBookingExists,
} = require("../controllers/bookingcontroller");
const router = express.Router();

router.get("/", getbookingall);
router.get("/:id", getsinglebooking);

//get my booking userID
// router.get("/mybooking", getbookinguser);

//get booking by userId
router.get("/mybooking/:id", getmybooking);

//get all booking by userid for organiser
router.get("/allbooking/:id", getallbooking);

//create booking
router.post("/post", createbooking);
//update booking
router.patch("/update/:id", updatebooking);
//delete booking
router.delete("/delete/:id", deletebooking);

router.get("/event/recent/:id", recentbooking);
// router.get("/notification/:id", getNotifications);

router.get("/event/booking/:eventId", getBookingsForEvent);
router.get("/check/:eventId/:userId", checkBookingExists);
module.exports = router;
