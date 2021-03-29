const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
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

    referralId: {type: String, required: true},
    wallet:{type:Number, default:0},
    referredList:[
    ],
    bonus:{type:Number,default:0},
    commission:{type:Number,default:0},
    joined: { type: String},
    bankaccountno:{type:Number,default:0},
    bankifsc:{type:String, default:""},
    bankname:{type:String, default:""},
    payReq: {type: Boolean, default: false}
})

module.exports = mongoose.model("User", userSchema);