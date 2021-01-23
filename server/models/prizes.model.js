const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({

    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image_url: { type: String },
    quantity: { type: Number, required: true }

}, { timestamps: true });

module.exports = mongoose.model('prizes', schema);