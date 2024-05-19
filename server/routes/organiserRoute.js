const express = require("express");
const {
  getallorganise,
  createorganise,
  getbytoprating,
  getsingleorganize,
  updateone,
  deleteone,
  getorgbyuserid,
} = require("../controllers/organisercontroller");

const router = express.Router();

//get all organises
router.get("/", getallorganise);

//get by userId
router.get("/myorg/:id", getorgbyuserid),
  //get top rating organize
  router.get("/rating", getbytoprating);
// create organise
router.post("/addorganise", createorganise);
//get single organise
router.get("/:id", getsingleorganize);
router.patch("/update/:id", updateone);
router.patch("/service");

//delete organise
router.delete("/delete/:id", deleteone);

module.exports = router;
