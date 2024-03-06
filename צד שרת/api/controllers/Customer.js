const customer = require("../models/customer")

const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { sendMailOrder } = require("../../requests")
dotenv.config()

module.exports = {

    getAll: (req, res) => {

        customer.find()
            .then((advertisers) => { res.status(200).send({ advertisers }) })
            .catch((error) => { res.status(404).send({ message: error.message }) })
    },

    register: (req, res) => {

        const { email, password } = req.body

        customer.find({ email: { $eq: email } })
            .then(customers => {
                if (customers.length > 0) {
                    return res.status(409).send({ message: 'Email is already exists' })
                }
                bcrypt.hash(password, 10, (error, hash) => {
                    if (error) {
                        return res.status(500).send({ error: error.message })
                    }
                    const customer2 = new customer({
                        email,
                        password: hash
                    })
                    return customer2.save()
                })
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'tzipi974@gmail.com',
                        pass: process.env.PASSWORD,
                    }
                });
                let mailOptions = {
                    from: 'tzipi974@gmail.com',
                    to: email,
                    subject: 'Hi, ' + email + ' new customer',
                    text: 'Wellcome to our organization!\n Your registeration got successfull.',
                    html: `<h3>wellcome ${email} </h3><br></br><p>Wellcome to our organization!\n Your registeration got successfull.</p><br></br><strong>enjoy from my application!!!</strong><br></br><img src='D:/Node JS2/פרוייקט סיום/uploads/home.jpg' width={'40%'}></img>`,
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                res.status(200).send({ customer: req.body})
            })
            .catch(error => {
                res.status(404).send({ error: error.message })
            })
    },

    login: (req, res) => {
        const { email, password } = req.params

        customer.find({ email: { $eq: email } })
            .then(cus => {
                if (cus.length == 0) {
                    return res.status(409).send({ message: 'Email and password are not matches!' })
                }
                const [cust] = cus
                bcrypt.compare(password, cust.password, (error, result) => {
                    if (error || !result) {
                        return res.status(500).send({ error: 'Email and password are not matches!' })
                    }
                    const token = jwt.sign({ email, password }, process.env.TOKEN, {
                        expiresIn: '1H'
                    })
                    res.status(200).send({ customer: cus, token })
                })
            })
            .catch(error => {
                res.status(404).send({ error: error.message })
            })
    },
    order: (req, res) => {
        sendMailOrder(req.body)
            .then(() => {
                res.status(200).send({ message: `order add` })
            })
            .catch((error) => {
                res.status(404).send({ error: error.message })
            })
    },
}