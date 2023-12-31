//DEPENDENCIES
const mongoose = require("mongoose")

const animalSchema = new mongoose.Schema({
    species: {type: String, required: true},
    extinct: Boolean,
    location: {type: String, required: true},
    lifeExpectancy: {type: Number}
})

const Animal = mongoose.model("Animal", animalSchema)

module.exports = Animal