const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Advertiser = require("../models/Advertiser");

const dotenv = require("dotenv");
const { sendMail } = require("../../requests");
dotenv.config();

module.exports = {
  getAll: (req, res) => {
    Advertiser.find()
      .populate({
        path: "apartments",
        select:
          "name numberBed decription address codeCategory codeCity codeAdvertiser price addition",
      })
      .then((advertisers) => {
        res.status(200).send(advertisers);
      })
      .catch((error) => {
        res.status(404).send({ error: error.message });
      });
  },

  register: (req, res) => {
    const { email, password, phone, phoneAdd } = req.body;
    Advertiser.find({ email: { $eq: email } })
      .then((advertisers) => {
        if (advertisers.length > 0) {
          return res.status(409).send(false);
        }
        bcrypt.hash(password, 10, (error, hash) => {
          if (error) {
            return res.status(500).send({ error: error.message });
          }
          const advertiser = new Advertiser({
            email,
            password: hash,
            phone,
            phoneAdd,
            apartment: [],
          });
          return advertiser.save();
        });
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "tzipi974@gmail.com",
            pass: process.env.PASSWORD,
          },
        });
        let mailOptions = {
          from: "tzipi974@gmail.com",
          to: email,
          subject: "Hi, " + email,
          text: "Wellcome to our organization!\n Your registeration got successfull.",
          html: `<h3>wellcome ${email} </h3><br></br><p>Wellcome to our organization!\n Your registeration got successfull.</p><br></br><strong>enjoy from my application!!!</strong><br></br><img src='D:/Node JS2/פרוייקט סיום/uploads/home.jpg' width={'40%'}></img>`,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        res.status(200).send({ advertiser: req.body});
      })
      .catch((error) => {
        res.status(404).send({ error: error.message });
      });
  },

  login: (req, res) => {
    const { email, password } = req.params;

    Advertiser.find({ email: { $eq: email } })
      .populate({
        path: "apartments",
        select:
          "name numberBed decription address codeCategory codeCity codeAdvertiser price addition",
      })
      .then((advertisers) => {
        if (advertisers.length == 0) {
          return res
            .status(409)
            .send({ message: "Email and password are not matches!" });
        }
        const [advertiser] = advertisers;
        bcrypt.compare(password, advertiser.password, (error, result) => {
          if (error || !result) {
            return res
              .status(500)
              .send({ error: "Email and password are not matches!" });
          }
          const token = jwt.sign({ email, password }, process.env.TOKEN, {
            expiresIn: "1H",
          });
          res.status(200).send({ advertisers, token });
        });
      })
      .catch((error) => {
        res.status(404).send({ error: error.message });
      });
  },

  password: (req, res) => {
    sendMail(req.body)
      .then(() => {
        res.status(200).send({ message: `password sent to your email` });
      })
      .catch((error) => {
        res.status(404).send({ error: error.message });
      });
  },
  getToken: (req, res) => {
    const email = "example@example.com";
    const password = "ex123ex";
    const token = jwt.sign({ email, password }, process.env.TOKEN, {
      expiresIn: "1H",
    });
    res.status(200).send(token);
  },
};
