const mongoose = require('mongoose');

const supplySchema = new mongoose.Schema({
    location: {
        type: String,
        required: true,
    },
    itemName: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
}, { timestamps: true });

const Supply = mongoose.model('Supply', supplySchema);

module.exports = Supply;