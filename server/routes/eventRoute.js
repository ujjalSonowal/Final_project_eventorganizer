const express = require("express");
const {
  getallevent,
  createevent,
  updateevent,
  singlevent,
  deletevent,
  updateprice,
  updatecapacity,
  geteventuser,
  getsixevent,
  LatestEvent,
} = require("../controllers/eventcontroller");

const router = express.Router();

//get all events for user
router.get("/", getallevent);
//get a signle event
router.get("/:id", singlevent);

//returns user's events only
router.get("/myevent/:id", geteventuser);

//get event with limit 6
router.get("/homeevent", getsixevent);

//get all events by top rating
router.get("/rating");

//get latest event
router.get("/latest", LatestEvent);

//create a event by user/organise
router.post("/create", createevent);

//update a evenet/mannage
router.patch("/update/:id", updateevent);

//delete a event
router.delete("/delete/:id", deletevent);
//router update price
router.patch("/update/price/:id", updateprice);
//update capacity
router.patch("/update/capacity/:id", updatecapacity);

module.exports = router;
