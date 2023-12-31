//DEPENDENCIES
require("dotenv").config()
require("./config/db")
const express = require("express")
const morgan = require("morgan")

const app = express()
const { PORT = 3013 } = process.env

const Animal = require("./models/Animal")

//MIDDLEWARE
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }))

//ROUTES & ROUTER
//INDEX - GET
app.get("/animals", async (req, res)=>{
let animals = await Animal.find({})
res.render("index.ejs", {
    animals: animals.reverse()
})
})

//NEW - GET
app.get("/animals/new", (req, res) => {
    res.render("new.ejs")
})

//CREATE - POST
app.post("/animals", async (req, res) => {
    try {
        if (req.body.extinct === "on") {
            req.body.extinct = true
        } else {
            req.body.extinct = false
        }
        let newAnimal = await Animal.create(req.body)
        res.redirect("/animals")
    } catch (err) {
        res.send(err)
    }
})

//SHOW - GET

//SERVER LISTENER
app.listen(PORT, () => console.log(`listening to the sounds of ${PORT}`))