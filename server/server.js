const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// const uploadMiddleware = require("./middleware/MulterMiddleware");

const userrouter = require("./routes/userRoute");
const organiserouter = require("./routes/organiserRoute");
const eventsrouter = require("./routes/eventRoute");
const commentrouter = require("./routes/postcomment");
const bookingrouter = require("./routes/bookingRoute");
const serviceRouter = require("./routes/postservices");
const reviewRouter = require("./routes/reviewRoute");
const Notification = require("./routes/notificationRoute");
const imageRouter = require("./routes/imageRoute");

// const imageRouter = require("./routes/imageRoute");

const port = process.env.PORT || 5001;

const app = express();

app.use(express.json()); // middleware
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.use("/images", express.static("uploads/images"));
// app.use("/images", uploadMiddleware.single("image"));

app.use("/user", userrouter);
app.use("/organise", organiserouter);
app.use("/events", eventsrouter);
app.use("/comment", commentrouter);
app.use("/service", serviceRouter);
app.use("/booking", bookingrouter);
app.use("/file", imageRouter);
app.use("/review", reviewRouter);
app.use("/notification", Notification);
app.use("/filter", require("./routes/filterRoutes"));

// app.use("/images", imageRouter);

const url = process.env.URL;

// console.log("MongoDB URI:", url);

// Connect to MongoDB ------------------------------
mongoose
  .connect(url)
  .then(() => {
    app.listen(port, () => {
      console.log(`app running in port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
