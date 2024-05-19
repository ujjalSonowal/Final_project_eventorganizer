const express = require("express");
const {
  createbooking,
  getbookingall,
  getsinglebooking,
  updatebooking,
  getbookinguser,
} = require("../controllers/bookingcontroller");
const router = express.Router();

router.get("/", getbookingall);
router.get("/:id", getsinglebooking);

//get my booking userID
router.get("/mybooking", getbookinguser);

//create booking
router.post("/addbooking", createbooking);
//update booking
router.patch("/update/:id", updatebooking);
//delete booking
router.delete("/delete/:id");

module.exports = router;
