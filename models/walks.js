const mongoose = require('mongoose');

const walkSchema = new mongoose.Schema({
    day: String,
    lengthMiles:Number,
    where: String
});

const Walk = mongoose.model('Walk', walkSchema);

module.exports = Walk;
