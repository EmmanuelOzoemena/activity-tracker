dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");

const youthRoutes = require("./routes/youth.routes");
const activityRoutes = require("./routes/activity.routes");
const attendanceRoutes = require("./routes/attendance.routes");
const statRoutes = require("./routes/stat.routes");

const app = express();


app.use(helmet());
const allowedOrigins = [
  'http://localhost:5173', 
  'https://cchs-activity-tracker.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl/Thunder Client)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Mongoose connection
const port = process.env.PORT || 3000;
const dbURI = process.env.dbURI;

mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

app.get("/", (req, res) => {
  res.send("Welcome to the Activity Tracker API");
});

// Routes
app.use("/youths", youthRoutes);
app.use("/activities", activityRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/stats", statRoutes);
