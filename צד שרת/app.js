
const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors=require('cors')

const AdvertiserRouter = require('./api/routes/Advertiser')
const customerRouter = require('./api/routes/Customer')
const cityRouter = require('./api/routes/City')
const categoryRouter = require('./api/routes/Category')
const apartmentRouter = require('./api/routes/Apartment')


const connectToDB = require('./connectDB')

dotenv.config()
connectToDB()

const app = express()

app.use(bodyParser.json())
app.use(cors())

//endpoints
app.get('', (req, res) => {
    res.status(200).send('The Application run')
})
const path = require('path');

// קבע את הנתיב לתיקיית התמונות הציבורית
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/advertiser', AdvertiserRouter)
app.use('/Customer', customerRouter)
app.use('/city', cityRouter)
app.use('/category', categoryRouter)
app.use('/apartment', apartmentRouter)

//יצירת מאזין
app.listen(3001, () => {
    console.log(`my app is listening in http://localhost:3001`);
})