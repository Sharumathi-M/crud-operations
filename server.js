/**
 * CLIENT MANAGEMENT SYSTEM - CRUD OPERATIONS
 *
 * 1. package
 * 2. server
 * 3. Db
 * 4. schema & model
 * 5. controller
 * 6. router
 * 7. check in postman
 * 8. set frontend part - ejs
 * 9. set the default view for frontend
 * 10. build code
 * 11. add styles
 * 12. setup connection btw frontend and backend
 * 13. run in favourite browser
 */

// PACKAGES INITIALIZATION (Both build-in and third party package)
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors"); // later
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const router = require("./server/router/router");
const connectDB = require("./server/database/dbConnection");
const ClientModel = require('./server/model/db');

const app = express();

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

app.use(morgan());

// parse the form request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));

// mongodb connection
connectDB();

// Ejs View
app.set("view engine", "ejs");

// Home Page
app.get("/home", (req, res) => {
  res.render("index");
});

app.get("/api/userss", (req,res) => {
  ClientModel.find({})
  .then( allDetails => {
      res.render("show", { details: allDetails });
  })
  .catch( err => {
      console.log(err);
  });
});

app.get("/api/update", (req,res) => {})
// routes
app.use("/home", express.static(path.resolve(__dirname, "assets/css")));

// server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
