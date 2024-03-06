const multer = require("multer");
const Advertiser = require("./api/models/Advertiser");
const jwt = require("jsonwebtoken");

//פונקציה שמסננת את סוגי הקבצים שאפשר להעלות
const fileFilter = (req, file, cb) => {
  //במקרה שלנו נאפשר רק קבצי בסיומת תמונה
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    //true אם הקובץ מסוג מתאים נחזיר
    cb(null, true);
  }
  //ואם לא - false
  cb(null, false);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

module.exports = {
  logUrl: (req, res, next) => {
    console.log(req.url);
    next();
  },

  checkAuth: (req, res, next) => {
    if (!req.headers.authorization) {
      res.status(401).send({ error: "Authentication1 failed!" });
    }
    const token = req.headers.authorization.split(" ")[0];
    if (!token) {
      return res.status(401).send({ error: "Authentication2 failed!" });
    }
    jwt.verify(token, process.env.TOKEN, (error, decoded) => {
      if (error) {
        return res.status(401).send({ message: "Authorization3 failed!" });
      }
      if (decoded) {
        next();
      }
    });
  },

  upload: multer({
    // dest: 'uploads/',
    storage,
    //הגדרות לגבי הקובץ המועלה
    limits: {
      //2MB הקובץ יכול להיות עד גודל של
      fileSize: 1024 * 1024 * 2,
    },
    fileFilter,
  }),

  checkAdvertiser: (req, res, next) => {
    Advertiser.findById({ _id: req.params.id })
      .then((a) => {
        next();
      })
      .catch((err) => {
        res.status(404).send({ message: `advertiser not found!` });
      });
  },
  checkEmail: (req, res, next) => {
    if (req.body.email.length >= 6) {
      next();
    }
    res.status(404).send({ error: `invalid email!` });
  },
};
