const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    apartments: [{
        type: mongoose.Types.ObjectId,
        require: true,
        ref: 'Apartment',
    }]
})

module.exports = mongoose.model('Category', categorySchema)