const express = require("express");
const {
  createbooking,
  getbookingall,
  getsinglebooking,
  updatebooking,
  // getbookinguser,
  getmybooking,
} = require("../controllers/bookingcontroller");
const router = express.Router();

router.get("/", getbookingall);
router.get("/:id", getsinglebooking);

//get my booking userID
// router.get("/mybooking", getbookinguser);

//get booking by userId
router.get("/mybooking/:id", getmybooking);

//create booking
router.post("/addbooking", createbooking);
//update booking
router.patch("/update/:id", updatebooking);
//delete booking
router.delete("/delete/:id");

module.exports = router;
