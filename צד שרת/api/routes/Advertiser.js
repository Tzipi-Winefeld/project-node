const express = require('express')
const router = express.Router()

const {
    login,
    register,
    getAll,
    password,
    getToken
} = require('../controllers/Advertiser')
const { checkEmail } = require('../../middlewares')

router.post('/register', register)
router.get('/login/:email/:password', login)
router.get('/getAll', getAll)
router.post('/getPass', password)
router.get('/token',getToken)

module.exports = router