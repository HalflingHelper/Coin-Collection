const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
    denomination: { required: true, type: String },
    year: { required: true, type: Number },
    design: { type: String, default: 'none' },
    mint: { required: true, type: String, enum: ['p', 's', 'd', 'none']}
});

module.exports = mongoose.model('Coin', coinSchema)