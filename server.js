// Here is where we import modules
// We begin by loading Express
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require("path")

// Models
const Fruit = require("./models/fruit")

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, "public")))

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

// show fruit
app.get('/fruits/:id', async (req, res) => {
    const fruit = await Fruit.findById(req.params.id);
    // console.log(fruit);
    res.render('fruits/show.ejs', { fruit: fruit });
});

// edit fruit
app.get("/fruits/:id/edit", async (req, res) => {
    const fruit = await Fruit.findById(req.params.id);
    // console.log(fruit);
    // res.send(`this is the edit route for ${fruit.name}`)
    res.render("fruits/edit.ejs", {
        fruit: fruit
    });
});

app.put("/fruits/:id", async (req, res) => {
    const formData = req.body
    if (req.body.isReadyToEat === "on") {
        formData.isReadyToEat = true;
    } else {
        formData.isReadyToEat = false;
    }
    await Fruit.findByIdAndUpdate(req.params.id, formData);

    res.redirect(`/fruits/${req.params.id}`);

})

// delete fruit
app.delete('/fruits/:id', async (req, res) => {
    await Fruit.findByIdAndDelete(req.params.id);
    res.redirect('/fruits');
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});