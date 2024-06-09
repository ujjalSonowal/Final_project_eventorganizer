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
  geteventbyorgid,
  getEventWithReviews,
} = require("../controllers/eventcontroller");

const router = express.Router();

//get all events for user
router.get("/", getallevent);
//get a signle event
router.get("/:id", singlevent);

//returns user's events only
router.get("/my/event/:id", geteventuser);

//get event with limit 6
router.get("/home", getsixevent);

//get all events by top rating
router.get("/rating");

//get latest event
router.get("/latest/event", LatestEvent);

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
//get events by organise Id
router.get("/organise/events/:id", geteventbyorgid);

//get an event with its reviews and average rating
router.get("/event/review/:eventId", getEventWithReviews);

module.exports = router;
