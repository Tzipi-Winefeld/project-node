const express = require('express')
const router = express.Router()

const {
    add,
    update,
    remove,
    getAll,
    getById,
    getByAdvertiser,
    getByCategory,
    getByCity,
    getByNumberBedBig,
    getByNumberBedEq,
    getByNumberBedLittle,
    getByPriceBig,
    getByPriceLittle,
    getByIdAndDays,
    im
} = require('../controllers/Apartment')
const { upload, checkAdvertiser, checkAuth } = require('../../middlewares')

router.post('/add/:id',checkAdvertiser,checkAuth, upload.single('image'),add)
router.patch('/update/:id/:idApartment',checkAdvertiser,checkAuth, update)
router.delete('/remove/:id/:idApartment',checkAdvertiser,checkAuth, remove)

// ===============================================================
router.get('/getAll',getAll)
router.get('/getById/:id',checkAuth,getById)
router.get('/getByIdAndDays/:id',getByIdAndDays)
router.get('/getByAdvertiser/:id',checkAdvertiser,checkAuth, getByAdvertiser)//check
router.get('/getByCategory/:id',checkAuth,getByCategory)
router.get('/getByCity/:id',checkAuth,getByCity)
router.get('/getByNumberBedBig/:num',getByNumberBedBig)
router.get('/getByNumberBedEq/:num',getByNumberBedEq)
router.get('/getByNumberBedLittle/:num',getByNumberBedLittle)
router.get('/getByPriceBig/:num',getByPriceBig)
router.get('/getByPriceLittle/:num',checkAuth,getByPriceLittle)
router.post('/a',upload.single('image'),im)

module.exports = router