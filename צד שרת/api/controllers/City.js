const { getTemp, apiRequests } = require("../../requests")
const City = require("../models/City")

module.exports = {

    getAll: (req, res) => {

        City.find().populate({ path: 'City', select: 'name numberBed decription address codeCategory codeCity codeAdvertiser price addition', strictPopulate: false })
            .then((citys) => { res.status(200).send(citys) })
            .catch((error) => { res.status(404).send({ message: error.message }) })
    },

    add: (req, res) => {
        const { name} = req.body
        const city = new City({
            name:name,
            apartments:[]
        })
        return city.save()
            .then((city) => {
                res.status(200).send({ message: city._id })
            })
            .catch((err) => {
                res.status(404).send({ error: err.message })
            })
    },

    tempNow: (req, res) => {
        City.findById({ _id: req.params.id })
            .then((a) => {
                apiRequests(`https://api.openweathermap.org/data/2.5/weather?q=${a.name}&appid=29e21eb08b02f857be9490804657ae5c`)
                    .then(body => {
                        res.status(200).send({ data: JSON.parse(body) })
                    })
                    .catch(err => {
                        res.status(500).send({ error: err.message })
                    })
            })
            .catch((err) => {
                res.status(404).send({ message: `city not found!` })
            })
    },
    tempDays: (req, res) => {
        City.findById({ _id: req.params.id })
            .then((a) => {
                apiRequests(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${a.name}&cnt=${req.params.days}&appid= 90b9b9db492306c3c74579441131d5cb`)
                    .then(body => {
                        res.status(200).send({ data: JSON.parse(body) })
                    })
                    .catch(err => {
                        res.status(500).send({ error: err.message })
                    })
            })
            .catch((err) => {
                res.status(404).send({ message: `city not found!` })
            })
    }
}