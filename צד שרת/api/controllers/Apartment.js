const { apiRequests } = require("../../requests");
const Advertiser = require("../models/Advertiser");
const Apartment = require("../models/Apartment");
const Category = require("../models/Category");
const City = require("../models/City");
const { tempNow } = require("./City");

module.exports = {
  add: (req, res) => {
    Advertiser.findById({ _id: req.params.id }).then((a) => {
      const {
        name,
        decreption,
        image,
        codeCategory,
        codeCity,
        address,
        numberBed,
        addition,
        price,
        codeAdvertiser,
      } = req.body;
      const path = req.file.path;

      const apartment = new Apartment({
        name,
        decreption,
        image: path.replace("\\", "/"),
        codeCategory,
        codeCity,
        address,
        numberBed,
        addition,
        price,
        codeAdvertiser,
      });
      return apartment
        .save()

        .then((a) => {
          Category.findByIdAndUpdate(
            codeCategory,
            { $push: { apartments: a._id } },
            { new: true }
          ).then(() => {
            Advertiser.findByIdAndUpdate(
              codeAdvertiser,
              { $push: { apartments: a._id } },
              { new: true }
            ).then(() => {
              City.findByIdAndUpdate(
                codeCity,
                { $push: { apartments: a._id } },
                { new: true }
              ).then(() => {
                res.status(200).send(`Add apartment succeed`);
              });
            });
          });
        })
        .catch((error) => {
          res.status(500).send({ error: error.message });
        });
    });
  },

  remove: (req, res) => {
    Apartment.findById({ _id: req.params.idApartment })
      .then((a) => {
        if (a.codeAdvertiser != req.params.id)
          return res
            .status(400)
            .send({ message: "you cant delete this apartment" });
        Category.findByIdAndUpdate(
          { _id: a.codeCategory },
          { $pull: { apartments: req.params.idApartment } },
          { new: true }
        ).then(() => {
          Advertiser.findByIdAndUpdate(
            { _id: a.codeAdvertiser },
            { $pull: { apartments: req.params.idApartment } },
            { new: true }
          ).then(() => {
            City.findByIdAndUpdate(
              { _id: a.codeCity },
              { $pull: { apartments: req.params.idApartment } },
              { new: true }
            ).then(() => {
              return a.deleteOne().then(() => {
                res
                  .status(200)
                  .send(`Delete apartment ${req.params.idApartment} succeed `);
              });
            });
          });
        });
      })
      .catch((error) => {
        res.status(404).send({ error: error.message });
      });
  },

  update: (req, res) => {
    const _id = req.params.id;
    Apartment.findById({ _id: req.params.idApartment })
      .then((apartment) => {
        if (apartment.codeAdvertiser != _id) {
          return res
            .status(400)
            .send({ message: "Cannot update this apartment!" });
        }
        const s = {
          name,
          decreption,
          address,
          numberBed,
          addition,
          price,
        }=req.body;

        Apartment.findByIdAndUpdate({ _id: req.params.idApartment }, s, {
          new: true,
        })
          .then((apartment) => {
            res.status(200).send(apartment);
          })
          .catch((error) => {
            res.status(404).send({ error: error.message });
          });
      })
      .catch((error) => {
        res.status(404).send({ error: error.message });
      });
  },

  // שליפות==============================================================================
  getById: (req, res) => {
    Apartment.findById({ _id: req.params.id })
      .populate({
        path: "codeCategory codeCity codeAdvertiser",
        select: "name email phone phoneAdd",
        strictPopulate: false,
      })
      .then((a) => {
        const x = null;
        apiRequests(
          `https://api.openweathermap.org/data/2.5/weather?q=${a.name}&appid=29e21eb08b02f857be9490804657ae5c`
        ).then((body) => {
          x = JSON.parse(body);
        });
        res.status(200).send({ apartment: a, temp: x });
      })
      .catch((err) => {
        res.status(404).send({ message: `apartment not found!` });
      });
  },

  getByIdAndDays: (req, res) => {
    Apartment.findById({ _id: req.params.id })
      .populate({
        path: "codeCategory codeCity codeAdvertiser",
        select: "name email phone phoneAdd",
        strictPopulate: false,
      })
      .then((a) => {
        const x = null;
        apiRequests(
          `https://api.openweathermap.org/data/2.5/forecast/daily?q=${a.name}&cnt=${req.params.days}&appid= 90b9b9db492306c3c74579441131d5cb`
        ).then((body) => {
          x = JSON.parse(body);
        });
        res.status(200).send({ apartment: a, tempToDays: x });
      })
      .catch((err) => {
        res.status(404).send({ message: `apartment not found!` });
      });
  },

  getAll: (req, res) => {
    Apartment.find()
      .populate({
        path: "codeCategory codeCity codeAdvertiser",
        select: "name email phone phoneAdd",
        strictPopulate: false,
      })
      .then((apartments) => {
        res.status(200).send(apartments);
      })
      .catch((error) => {
        res.status(404).send({ message: error.message });
      });
  },

  getByCategory: (req, res) => {
    Category.findById({ _id: req.params.id })
      .populate({
        path: "apartments",
        select:
          "name numberBed decription address codeCategory codeCity codeAdvertiser price addition image",
        strictPopulate: false,
      })
      .then((x) => {
        res.status(200).send(x.apartments);
      })
      .catch((err) => {
        res.status(404).send({ error: err.message });
      });
  },

  getByCity: (req, res) => {
    City.findById({ _id: req.params.id })
      .populate({
        path: "apartments",
        select:
          "name numberBed decription address codeCategory codeCity codeAdvertiser price addition image",
        strictPopulate: false,
      })
      .then((x) => {
        // const t='no connect'
        apiRequests(
          `https://api.openweathermap.org/data/2.5/weather?q=${x.name}&appid=29e21eb08b02f857be9490804657ae5c`
        )
          .then((body) => {
            return res
              .status(200)
              .send({ apartments: x.apartments, temp: JSON.parse(body) });
          })
          .catch((err) => {
            return res
              .status(200)
              .send({ apartments: x.apartments, temp: "no connect" });
          });
      })
      .catch((err) => {
        res.status(404).send({ error: err.message });
      });
  },

  getByNumberBedBig: (req, res) => {
    Apartment.find()
      .populate({
        path: "codeCategory codeCity codeAdvertiser",
        select: "name email phone phoneAdd",
        strictPopulate: false,
      })
      .where({ numberBed: { $gte: req.params.num } })
      .then((x) => {
        res.status(200).send(x);
      })
      .catch((err) => {
        res.status(404).send({ error: err.message });
      });
  },

  getByNumberBedLittle: (req, res) => {
    Apartment.find()
      .populate({
        path: "codeCategory codeCity codeAdvertiser",
        select: "name email phone phoneAdd",
        strictPopulate: false,
      })
      .where({ numberBed: { $lt: req.params.num } })
      .then((apartments) => {
        res.status(200).send(apartments);
      })
      .catch((err) => {
        res.status(404).send({ error: err.message });
      });
  },

  getByNumberBedEq: (req, res) => {
    Apartment.find()
      .populate({
        path: "codeCategory codeCity codeAdvertiser",
        select: "name email phone phoneAdd",
        strictPopulate: false,
      })
      .where({ numberBed: { $eq: req.params.num } })
      .then((x) => {
        res.status(200).send(x);
      })
      .catch((err) => {
        res.status(404).send({ error: err.message });
      });
  },

  getByPriceLittle: (req, res) => {
    Apartment.find()
      .populate({
        path: "codeCategory codeCity codeAdvertiser",
        select: "name email phone phoneAdd",
        strictPopulate: false,
      })
      .where({ price: { $lt: req.params.num } })
      .then((x) => {
        res.status(200).send(x);
      })
      .catch((err) => {
        res.status(404).send({ error: err.message });
      });
  },

  getByPriceBig: (req, res) => {
    Apartment.find()
      .populate({
        path: "codeCategory codeCity codeAdvertiser",
        select: "name email phone phoneAdd",
        strictPopulate: false,
      })
      .where({ price: { $gte: req.params.num } })
      .then((x) => {
        res.status(200).send(x);
      })
      .catch((err) => {
        res.status(404).send({ error: err.message });
      });
  },
  // יש בעיה איך נכנסים לתוך המאפיינים של הדירה
  getByAdvertiser: (req, res) => {
    Advertiser.findById({ _id: req.params.id })
      .populate({
        path: `apartments`,
        select: `name numberBed decription address codeCategory codeCity codeAdvertiser price addition image`,
        strictPopulate: false,
      })
      .then((x) => {
        res.status(200).send(x.apartments);
      })
      .catch((err) => {
        res.status(404).send({ error: err.message });
      });
  },
  im: (req, res) => {
    const path = req.file;
    res.send(`<img src="${path}" alt="Uploaded image"/>`);
  },
};