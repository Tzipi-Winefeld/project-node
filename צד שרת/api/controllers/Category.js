const Advertiser = require("../models/Advertiser")
const Category = require("../models/Category")

module.exports = {

    getAll: (req, res) => {

        Category.find().populate({ path: 'apartments', select: 'name numberBed decription address codeCategory codeCity codeAdvertiser price addition', strictPopulate: false })
            .then((categories) => { res.status(200).send(categories) })
            .catch((error) => { res.status(404).send({ message: error.message }) })
    },

    add: (req, res) => {
        const { name } = req.body

        const category = new Category({
            name:name,
            apartments: []
        })
        return category.save()
            .then((category) => {
                res.status(200).send({ message: category._id })
            })
            .catch((err) => {
                res.status(500).send({ error: err.message })
            })
    },
}