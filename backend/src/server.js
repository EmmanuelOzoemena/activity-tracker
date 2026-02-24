dotenv.config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

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

