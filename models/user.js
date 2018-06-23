const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    nativeLang: {
        type:String,
        required: true
    },
    country: {
        type:String,
        required: true
    },
    age: {
        type:Number,
        required: true
    },
    password: {
        type:String,
        required: true
    },
    aboutUser: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
