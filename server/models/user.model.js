const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({

    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
    
}, { timestamps: true });

module.exports = mongoose.model('users', schema);