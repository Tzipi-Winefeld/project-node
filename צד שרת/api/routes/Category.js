const express = require('express')
const router = express.Router()

const {
    add,
    getAll
} = require('../controllers/Category')
const { checkAdvertiser, checkAuth } = require('../../middlewares')

router.post('/add/:id',checkAuth, checkAdvertiser, add)
router.get('/getAll', getAll)

module.exports = router