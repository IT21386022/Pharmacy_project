require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const { logEvents } = require("./middleware/logger");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const { authenticate } = require("./middleware/authenticate");



const PORT = process.env.PORT || 8072;

// console.log(process.env.NODE_ENV);

connectDB();

app.use(logger);
app.use(errorHandler);


app.use(cors());

app.use(express.json()); //this is a buit in middleware

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.once("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});

const customerRoute = require("./routes/CustomerRoute.js");
app.use("/customer", customerRoute);

const medicationRoute = require("./routes/MedicationRoute.js");
app.use("/medication",medicationRoute);

// Routes
const authRoutes = require("./routes/UserRoutes");
app.use("/auth", authRoutes);

// Protected route example
app.get("/protected", authenticate, (req, res) => {
  res.json({ message: "You are authorized!" });
});

