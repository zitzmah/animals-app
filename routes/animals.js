//DEPENDENCIES
const express = require("express")
const router = express.Router()

const animalController = require("../controllers/animals")

//ROUTES - INDUCESS
router.get("/", animalController.index)
router.get("/new", animalController.newForm)
router.delete("/:id", animalController.destroy)
router.put("/:id", animalController.update)
router.post("/", animalController.create)
router.get("/edit/:id", animalController.edit)
router.get("/seed", animalController.seed)
router.get("/:id", animalController.show)

module.exports = router