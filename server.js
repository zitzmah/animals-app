//DEPENDENCIES
require("dotenv").config()
require("./config/db")
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")

const app = express()
const { PORT = 3013 } = process.env

const Animal = require("./models/Animal")

//MIDDLEWARE
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))

//ROUTES & ROUTER
//INDEX - GET
app.get("/animals", async (req, res) => {
    let animals = await Animal.find({})
    res.render("index.ejs", {
        animals: animals.reverse()
    })
})

//NEW - GET
app.get("/animals/new", (req, res) => {
    res.render("new.ejs")
})

//DELETE
app.delete("/animals/:id", async (req, res) => {
    try {
        let deletedAnimal = await Animal.findByIdAndDelete(req.params.id)
        res.redirect("/animals")
    } catch (error) {
        res.status(500).send("something went wrong when deleting")
    }
})

//UPDATE
app.put("/animals/:id", async (req, res) => {
    try {
        if (req.body.extinct === "on") {
            req.body.extinct = true
        } else {
            req.body.extinct = false
        }
        let updatedAnimal = await Animal.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        )
        res.redirect(`/animals/${updatedAnimal._id}`)
    } catch (error) {
        res.send("something whent wrong in this route")
    }
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

//EDIT
app.get("/animals/edit/:id", async (req, res) => {
    try {
        let foundAnimal = await Animal.findByIdAndUpdate(req.params.id)
        res.render("edit.ejs", {
            animal: foundAnimal
        })
    } catch (error) {
        res.send("hello from the error")
    }
})

//SHOW - GET
app.get("/animals/:id", async (req, res) => {
    let foundAnimal = await Animal.findById(req.params.id)
    res.render("show.ejs", {
        animal: foundAnimal
    })
})

//SERVER LISTENER
app.listen(PORT, () => console.log(`listening to the sounds of ${PORT}`))