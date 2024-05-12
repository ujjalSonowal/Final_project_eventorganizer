const express = require("express");
const {
  getallevent,
  createevent,
  updateevent,
  singlevent,
  deletevent,
  updateprice,
  updatecapacity,
} = require("../controllers/eventcontroller");

const router = express.Router();

//get all events for user
router.get("/", getallevent);
//get a signle event
router.get("/:id", singlevent);

//get all events by top rating
router.get("/rating");

//cretae a event by user/organise
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
