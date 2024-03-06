const express = require('express')
const router = express.Router()

const {
    login,
    register,
    getAll,
    order
} = require('../controllers/Customer')
const { checkEmail, checkAuth } = require('../../middlewares')

router.post('/register', register)
router.post('/order',checkAuth, order)
router.get('/login/:email/:password', login)
router.get('/', getAll)

module.exports = router