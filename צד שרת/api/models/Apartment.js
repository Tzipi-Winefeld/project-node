const mongoose = require('mongoose')

const apartmentSchema = mongoose.Schema({
    name: {
        type: String,
    },
    decription: String,
    image: {
        type: String,
        require: true
    },
    codeCategory: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: 'Category',
    },
    codeCity: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: 'City',
    },
    address: {
        type: String,
        require: true
    },
    numberBed: {
        type: Number,
        require: true
    },
    addition: {
        type: String
    },
    price: {
        type: Number,
        require: true
    },
    codeAdvertiser: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: 'Advertiser',
    }
})

module.exports = mongoose.model('Apartment', apartmentSchema)