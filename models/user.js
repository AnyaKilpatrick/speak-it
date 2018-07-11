const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
        // _id: {
        //     type: String,
        //     required: true
        // },
    local:{
        username: {
            type: String,
            required: true
        },
        password: {
            type:String,
            required: true
        },
        fullname: {
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
        aboutUser: {
            type: String,
            required: true
        },
        // adding an id of friend associated with this user
        friend:[{
            type:Schema.Types.ObjectId,
            ref:"User"
        }],
        requests:[{
            type:Schema.Types.ObjectId,
            ref:"User"
        }],
        pending:[{
            type:Schema.Types.ObjectId,
            ref:"User"
        }]

    },
    online: {
        type: Boolean,
        default:false
    },
    socketId: {
        type:String,
        default:null
    },
    chats:[{
        type:Schema.Types.ObjectId,
        ref:"Chat"
    }]
});
//generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
//checking if password is valid
userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.local.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
