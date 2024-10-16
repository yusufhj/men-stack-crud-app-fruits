// Here is where we import modules
// We begin by loading Express
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

// Models
const Fruit = require("./models/fruit")

const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.get("/", async (req, res) => {
    res.render("index.ejs");
});

// fruits page
app.get("/fruits", async (req, res) => {
    const fruits = await Fruit.find()
    res.render("fruits/index.ejs", { fruits: fruits})
});


// create new fruit page
app.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs");
});

// create fruit POST
app.post('/fruits', async (req, res) => {
    const formData = req.body
    if (req.body.isReadyToEat === "on") {
        formData.isReadyToEat = true;
    } else {
        formData.isReadyToEat = false;
    }
    await Fruit.create(formData);
    
    res.redirect("/fruits");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});