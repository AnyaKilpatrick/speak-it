const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;

const onlineUserSchema = new Schema({
    userId: {
        type: String
    },
    socketId: {
        type: String
    }
});

const OnlineUser = mongoose.model("OnlineUser", onlineUserSchema);

module.exports = OnlineUser;