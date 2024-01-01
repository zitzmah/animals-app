//DEPENDENCIES
require("dotenv").config()
require("./config/db")
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const animalRouter = require("./routes/animals")

const app = express()
const { PORT = 3013 } = process.env
const seedData = require("./models/seed")

const Animal = require("./models/Animal")

//MIDDLEWARE
app.use((req, res, next) => {
    req.model = {
        Animal,
        seedData
    }
    console.log("this is middleware")
    next()
})
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.use("/public", express.static("public"))

//ROUTES & ROUTER
app.use("/animals", animalRouter)

//SERVER LISTENER
app.listen(PORT, () => console.log(`listening to the sounds of ${PORT}`))