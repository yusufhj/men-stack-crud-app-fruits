// mogoose lib
const mongoose = require("mongoose");
// create schema
const fruitSchema = new mongoose.Schema({
    name: String,
    isReadyToEat: Boolean,
});

// compile the model Name, Schema
const Fruit = mongoose.model("Fruit", fruitSchema);

// export the model (share it with the rest of the app)
module.exports = Fruit;