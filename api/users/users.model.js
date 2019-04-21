var mongoose = require('mongoose');

var UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNum: String,
    profilePic: String,
    dob: Date,
    age: Number,
    isOnline: {
        type: Boolean,
        default: true
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    dp: String
});

UsersSchema.pre('save', async function(next) {
    if(!this.email) {
        return next(new Error("email is a mandatory field"));
    }
    this.email = this.email.toLowerCase();
    next();
});
// console.log("this: ", this);
// const regex = /^\d+$/g;
// if(regex.test(this.phoneNum)) {
//     return next();
// }
// {
//     type: String,
//     required: true,
//     unique: true
// }
module.exports = mongoose.model('User', UsersSchema);
