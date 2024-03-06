const mongoose = require('mongoose')

const advertiserSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
        match: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    },
    password: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    phoneAdd: {
        type: String,
    },
    apartments: [{
        type: mongoose.Types.ObjectId,
        require: true,
        ref: 'Apartment',
    }]
})

module.exports = mongoose.model('Advertiser', advertiserSchema)