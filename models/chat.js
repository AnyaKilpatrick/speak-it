const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    participants:[{type: Schema.Types.ObjectId, ref: "User"}],
    messages:[
        {
            authorName: {
                type:String
            },
            authorId:{
                type:String
            },
            authorCountry:{
                type:String
            },
            text: {
                type:String
            },
            time : { 
                type : Date,
                default: Date.now 
            }
        }
    ]

});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
