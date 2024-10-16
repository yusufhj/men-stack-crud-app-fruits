// Here is where we import modules
// We begin by loading Express
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// Models
const Fruit = require("./models/fruit")

const app = express();

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.get("/", async (req, res) => {
    res.render("index.ejs");
});

// create new fruit page
app.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});