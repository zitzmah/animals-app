//DEPENDENCIES


//EXPORTS
module.exports = {
    index,
    newForm,
    destroy,
    update,
    create,
    edit,
    show,
    seed
}

//ROUTE CONTROLLERS

async function index(req, res) {
    let animals = await req.model.Animal.find({})
    res.render("index.ejs", {
        animals: animals.reverse()
    })
}

async function newForm(req, res) {
    res.render("new.ejs")
}

async function destroy(req, res) {
    try {
        let deletedAnimal = await req.model.Animal.findByIdAndDelete(req.params.id)
        res.redirect("/animals")
    } catch (error) {
        res.status(500).send("something went wrong when deleting")
    }
}

async function update(req, res) {
    try {
        if (req.body.extinct === "on") {
            req.body.extinct = true
        } else {
            req.body.extinct = false
        }
        let updatedAnimal = await req.model.Animal.findByIdAndUpdate(
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
}

async function create(req, res) {
    try {
        if (req.body.extinct === "on") {
            req.body.extinct = true
        } else {
            req.body.extinct = false
        }
        let newAnimal = await req.model.Animal.create(req.body)
        res.redirect("/animals")
    } catch (err) {
        res.send(err)
    }
}

async function edit(req, res) {
    try {
        let foundAnimal = await req.model.Animal.findByIdAndUpdate(req.params.id)
        res.render("edit.ejs", {
            animal: foundAnimal
        })
    } catch (error) {
        res.send("hello from the error")
    }
}

async function seed(req, res) {
    try {
        await req.model.Animal.deleteMany({})
        await req.model.Animal.create(
            req.model.seedData
        )

        res.redirect("/animals")
    } catch (error) {
        res.send("something went wrong with your seeds")
    }
}

async function show(req, res) {
    let foundAnimal = await req.model.Animal.findById(req.params.id)
    res.render("show.ejs", {
        animal: foundAnimal
    })
}

