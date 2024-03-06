const request = require("request");
const nodemailer = require("nodemailer");

module.exports = {
  apiRequests: (url) => {
    return new Promise((resolve, reject) => {
      request(url, (err, res, data) => {
        if (data) {
          resolve(data);
        }
        if (err) {
          reject(err);
        }
      });
    });
  },

  sendMail: (x) => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tzipi974@gmail.com",
        pass: process.env.PASSWORD,
      },
    });
    let mailOptions = {
      from: "tzipi974@gmail.com",
      to: x.email,
      subject: `${x.pass}` + `- is your Home code`,
      html: `<h2>Log in to Your Home</h2><br></br><h4>Welcome back! Enter this code within the next 10 minutes to log in : <strong>${x.pass}</strong></h4><br></br><img src='.http://localhost:3001/uploads/home.jpg' width={'40%'}></img>`, //
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },
  getTemp: (req, res) => {
    apiRequests(
      `https://api.openweathermap.org/data/2.5/weather?q=${a.name}&appid=29e21eb08b02f857be9490804657ae5c`
    )
      .then((body) => {
        res.status(200).send({ data: JSON.parse(body) });
      })
      .catch((err) => {
        res.status(500).send({ error: err.message });
      });
  },
  getTempDays: (req, res) => {
    apiRequests("https://jsonplaceholder.typicode.com/todos")
      .then((body) => {
        res.status(200).send({ data: JSON.parse(body) });
      })
      .catch((err) => {
        res.status(500).send({ error: err.message });
      });
  },
  sendMailOrder: (x) => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tzipi974@gmail.com",
        pass: process.env.PASSWORD,
      },
    });

    let mailOptions = {
      from: "tzipi974@gmail.com",
      to: x.email,
      subject: `Your order ${x.apartment.name} Right choice `,
      html: `<h3 style{{color:'red'}}>פרטי ההזמנה</h3><div style={{textAlign:'center'}}><h3>
      👉 עיר:${x.apartment.codeCity.name} ,<br></br>👉 כתובת:${
        x.apartment.address
      }<br></br>
      👉סוג דירה:${x.apartment.codeCategory.name} ,<br></br>👉 מספר מיטות:${
        x.apartment.numberBed
      }<br></br>
      👉תוספות:${x.apartment.addition} ,<br></br>👉 מחיר:${x.apartment.price}
            </h3></div><strong>Enjoy and success</strong>
            <img src=${__dirname + `/${x.apartment.image}`}/>`,
      attachments: [
        {
          filename: "home.jpg",
          path: __dirname + `/${x.apartment.image}`, // נתיב לתמונה במערכת הקבצים שלך
          cid: `http://localhost:3001/${x.apartment.image}`, // זהה ל-src ב-HTML
        }
      ],
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },
};
