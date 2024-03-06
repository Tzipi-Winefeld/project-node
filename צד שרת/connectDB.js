const mongoose = require('mongoose')

const dotenv = require('dotenv')
dotenv.config()

// פונקציה מובנית שמתחברת למסד
// לפי המחרוזת שמקבלת בסוגריים
const connectToDB = async () => {
    await mongoose.connect(process.env.LOCAL_URI)
    // await mongoose.connect(process.env.URI)
}

// משתנה מכיל את המסד
const database = mongoose.connection

// במקרה של כשלון
database.on('error', (error) => {
    console.log('error not connect');
    console.log(error.message);
})

// במקרה של הצלחה
database.once('connected', () => {
    console.log('connection succeed!');
})

module.exports = connectToDB