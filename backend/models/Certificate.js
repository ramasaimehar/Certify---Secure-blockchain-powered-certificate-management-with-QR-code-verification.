const mongoose = require('mongoose');
const {encrypt , decrypt} = require("../controllers/Encryption")

const certificateSchema = new mongoose.Schema({
    certificateId: { type: String, required: true, unique: true },
    studentName: { type: String, required: true },
    Email: {type: String, required: true},
    Domain: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
});

module.exports = mongoose.model('Certificate', certificateSchema);
