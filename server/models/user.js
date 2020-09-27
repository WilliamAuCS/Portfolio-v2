const mongoose = require('mongoose');
const fs = require('fs');
const DB_Key = fs.readFileSync('./server_keys/user_mongodb.key', { encoding: 'utf-8' });

var user_connection = mongoose.createConnection(DB_Key, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    if(err) {
        console.error("Error! " + err);
    }
    else {
        console.log("Connected to mongodb: [User Information]");
    }
});

const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: String, 
    password: String
});

module.exports = user_connection.model('user', userSchema, 'users');