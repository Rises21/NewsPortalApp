const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
require("dotenv").config();
require("colors");

connectDB();
const app = express();
const userRoute = require("./routes/userRoute");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", userRoute);

app.get("*", (req, res) => {
  console.log("The endpoint is not found!");
  res.status(404).send("Endpoint doesn't exist");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.red));
