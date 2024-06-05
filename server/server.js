const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
// const uploadMiddleware = require("./middleware/MulterMiddleware");

const userrouter = require("./routes/userRoute");
const organiserouter = require("./routes/organiserRoute");
const eventsrouter = require("./routes/eventRoute");
const commentrouter = require("./routes/postcomment");
const bookingrouter = require("./routes/bookingRoute");
const serviceRouter = require("./routes/postservices");

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

// Directory for storing uploaded images
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: imageStorage });

// Ensure the uploads directory exists
const fs = require("fs");
const uploadDir = path.join(__dirname, "uploads/images");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve static files from the uploads directory
app.use(
  "/uploads/images",
  express.static(path.join(__dirname, "uploads/images"))
);

// app.use("/images", express.static("uploads/images"));
// app.use("/images", uploadMiddleware.single("image"));

app.use("/user", userrouter);
app.use("/organise", organiserouter);
app.use("/events", eventsrouter);
app.use("/comment", commentrouter);
app.use("/service", serviceRouter);
app.use("/booking", bookingrouter);

// app.use("/images", imageRouter);

// const url =
//   "mongodb+srv://135ujjalsonowal:9JonUyI7QfXWqyLl@eventorganising.08cgxvg.mongodb.net/?retryWrites=true&w=majority";

// const url =
//   "mongodb+srv://nitulsonowal8133:nitul12345@events.6io85z4.mongodb.net/?retryWrites=true&w=majority";
const url =
  "mongodb+srv://UjjwalSonowalDB:UjjwalSonowal43db@eventorganizer.f7b1oz4.mongodb.net/?retryWrites=true&w=majority&appName=EventOrganizer";

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
