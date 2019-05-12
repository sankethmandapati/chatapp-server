var mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    created_at: {
        type: Date,
        required: true
    },
    dp: String
});

UsersSchema.pre('save', async function(next) {
    if(!this.email || !this.password) {
        return next(new Error("email and password are mandatory fields"));
    }
    this.email = this.email.toLowerCase();
    this.password = bcrypt.hashSync(this.password, 10);
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
