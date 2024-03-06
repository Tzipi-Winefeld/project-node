const express = require('express')
const router = express.Router()

const {
    add,
    getAll,
    tempDays,
    tempNow
} = require('../controllers/City')
const { checkAdvertiser, checkAuth } = require('../../middlewares')

router.post('/add/:id',checkAdvertiser,checkAuth, add)
router.get('/getAll', getAll)
router.get('/temp/:id', tempNow)
router.get('/tempDays/:id/:days', tempDays)

module.exports = router