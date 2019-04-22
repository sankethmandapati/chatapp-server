const bcrypt = require('bcrypt');
var mongoose = require('mongoose');
// console.log("skdjfsd");

mongoose.connect('mongodb://localhost:27017/chat-app', {useNewUrlParser: true});
mongoose.connection.on('error', function(){
    console.log("error occured while connecting to the database");
});
mongoose.connection.once('open', function(err){
    console.log("successfully connected with the database...");
});


var Users = require('../api/users/users.model');


async function encrypt() {
    try {
        console.log("trying");
        const users = await Users.find({}).select('password').lean().exec();
        console.log("usersss: ", users);
        for(let i = 0; i < users.length; i++) {
            console.log("i: ", i);
            console.log("password: ", users[i].password);
            const encryptedPassword = bcrypt.hashSync(users[i].password, 10);
            console.log("encryptedPassword: ", encryptedPassword);
            const updated = await Users.update({_id: users[i]._id}, {$set: {password: encryptedPassword}});
            console.log("updated: ", updated);
        }
        console.log("ending");
        // try {
        // } catch(err) {
            // console.log("error: ", err);
        // }
        // .then(async (users) => {
        //     console.log("users: ", users);
        // })
        // .catch((err) => {
        //     console.log("errrr: ", err);
        // });
    } catch(error) {
        console.log("errorr: ", error);
    }
}
encrypt();
console.log("qwerty");