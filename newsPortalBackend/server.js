const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
const formData = require("express-form-data");

require("dotenv").config();
require("colors");

connectDB();
const app = express();
const userRoute = require("./routes/userRoute");
const categoryRoute = require("./routes/categoryRoute");
const newsRoute = require("./routes/newsRoute");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(formData.parse());

app.use("/api/users", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/news", newsRoute);

app.get("*", (req, res) => {
  console.log("The endpoint is not found!");
  res.status(404).send("Endpoint doesn't exist");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.red));
