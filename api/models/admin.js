const mongoose = require("mongoose");



const adminSchema = new mongoose.Schema({

    
    name: {type: String, required: true},
    mobileNo: {
        type: Number, 
        required: true, 
        // unique: true
    },

    address: {type: String, required: true},
    age: {type: Number, required: true},


    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },

    state: {type: String, required: true},
    city: {type: String, required: true},

    password: {type: String, required: true},
    pay:[],
    joined: { type: String},


})

module.exports = mongoose.model("Admin", adminSchema);