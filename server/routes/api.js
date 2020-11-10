const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const validator = require('validator');
const fs = require('fs');

// Response from /api
router.get('/', (req, res) => {
    res.send("From API route");
});

// Post request to encrypt string
router.post('/encrypt/:encrypt_type', (req, res) => {
    let data = req.body;
    let encrypt_type = req.params.encrypt_type;

    if (encrypt_type == "Argon2i") {
        encryptToArgon(data.text, (hashed) => {
            // Return hashed value
            res.status(200).send({ result: hashed });
        })
    }
    else if (encrypt_type == "bcrypt") {
        encryptTobcrypt(data.text, (hashed) => {
            // Return hashed value
            res.status(200).send({ result: hashed });
        })
    }
    else if (encrypt_type == "scrypt") {
        encryptToscrypt(data.text, (hashed) => {
            // Return hashed value
            res.status(200).send({ result: hashed.toString('hex') });
        })
    }


});

const argon2 = require('argon2');
// Encrypting string using Argon2i
function encryptToArgon(toHash, callback) {
    // Hashing and using result in callback
    argon2.hash(toHash).then((hashed) => {
        callback(hashed);
    });
}

const bcrypt = require('bcrypt');
// Encrypting string using bcrypt
function encryptTobcrypt(toHash, callback) {
    // Default rounds of salt generation
    const saltRounds = 10;
    // Hashing and using result in callback
    bcrypt.hash(toHash, saltRounds, function (err, hashed) {
        callback(hashed);
    });
}

const crypto = require('crypto');
const user = require('../models/user.js');
// Encrypting string using scrypt
function encryptToscrypt(toHash, callback) {

    // Creating salt
    let salt = crypto.randomBytes(16).toString('hex');
    // Hashing and using result in callback
    crypto.scrypt(toHash, salt, 64, (err, hashed) => {
        callback(hashed);
    });
}

function sanitizeUsername(username) {
    console.log(username)
    if (username) {
        return validator.isAscii(username);
    }
    return false;
}

router.post('/register', (req, res) => {

    // Extracting user data from request object
    let userData = req.body;

    // Username sanitation with ascii
    if (!sanitizeUsername(userData.username)) {
        res.status(400).send("Invalid Username Format");
        return;
    }
    userData.username = userData.username.toLowerCase();

    if (User.findOne({ username: userData.username }, (err, response) => {
        if (err) {
            console.error(err);
            return;
        }
        else if (response) {
            res.status(409).send("Username in use");
            return;
        }
        else {
            AddUser();
        }
    }))

        function AddUser() {
            let user = new User(userData);

            encryptToArgon(user.password, (hashed) => {
                user.password = hashed;
                user.save((err, registeredUser) => {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        res.status(200).send({ response: "Success" });
                    }
                });
            });
        };
});

router.post('/login', (req, res) => {
    // Extracting user data from request object
    let userData = req.body;

    // Username sanitation with ascii
    if (!sanitizeUsername(userData.username)) {
        res.status(400).send("Invalid Username Format");
        return;
    }
    userData.username = userData.username.toLowerCase();

    User.findOne({ username: userData.username }, (err, user) => {
        if (err) {
            console.error(err);
        }
        else {
            if (!user) {
                res.status(401).send("Invalid credentials");
            }
            else {
                try {
                    argon2.verify(user.password, userData.password).then(argon2Match => {
                        if (argon2Match) {
                            res.status(200).send({ response: "Success!" });
                        }
                        else {
                            res.status(401).send("Invalid credentials");
                        }
                    })
                }
                catch (err) {
                    console.error(err);
                }
            }
        }
    })
})

var bearerToken;
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var twitch_clientID = fs.readFileSync('./server_keys/twitch_client_id.key', { encoding: 'utf-8' });
var twitch_client_secret = fs.readFileSync('./server_keys/twitch_clientSecret.key', { encoding: 'utf-8' });
const twitch_get_bearer_token_URL = 'https://id.twitch.tv/oauth2/token?client_id=' + twitch_clientID + '&client_secret=' + twitch_client_secret + '&grant_type=client_credentials';

const validate_bearer_url = 'https://id.twitch.tv/oauth2/validate';

// This function checks if the bearer token is valid
function validate_bearer_token() {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            let expires_in = JSON.parse(xmlHttp.responseText)["expires_in"];
            // Check if token is about to expire
            if (expires_in < 3) {
                // Request new token
                return false;
            }
            // Token is falid
            return true;
        }
        else if (xmlHttp.status >= 400) {
            // Invalid or expired token
            return false;
        }
    }
    xmlHttp.open("GET", validate_bearer_url, true);
    xmlHttp.setRequestHeader('Authorization', 'Bearer ' + bearerToken);
    xmlHttp.send(null);
}

function get_bearer_token() {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            // Setting bearerToken
            bearerToken = JSON.parse(xmlHttp.responseText)["access_token"];
            console.log("bearer token: " + bearerToken);
            console.log(xmlHttp.responseText);
        }
    }
    xmlHttp.open("POST", twitch_get_bearer_token_URL, true);
    xmlHttp.send(null);
}

// Receives request from front-end
router.get('/twitch/getUser/:user', (req, res) => {
    let username = req.params.user;
    // If bearer token is expired, request new token
    if (validate_bearer_token() === false) {
        get_bearer_token();
    }
    get_channel_data(username).then((userInfo) => {
        res.status(200).send({data: userInfo});
    }).catch((err) => {
        console.error(err);
        res.status(400).send("User not found");
    });
});

const get_user_id_url = 'https://api.twitch.tv/helix/users?login=';

function get_user_id(username) {
    return new Promise(function (resolve, reject) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                let user_id = JSON.parse(xmlHttp.responseText)['data'][0].id;
                console.log(user_id)
                resolve(user_id);
                return;
            }
            else if (xmlHttp.status >= 400) {
                reject("Error");
                return;
            }
        }
        xmlHttp.open("GET", get_user_id_url + username, true);
        xmlHttp.setRequestHeader('client-id', twitch_clientID);
        xmlHttp.setRequestHeader('Authorization', 'Bearer ' + bearerToken);
        xmlHttp.send(null);
    });
}

const users_to_return = 1; // How many users to return on search (returns closest matches)
const twitch_get_channel_url = 'https://api.twitch.tv/helix/search/channels?first=' + users_to_return + '&query=';

// This funciton retrieves the data of the given user
function get_channel_data(username) {
    return new Promise(function (resolve, reject) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                resolve(JSON.parse(xmlHttp.responseText).data[0]);
            }
            else if (xmlHttp.status >= 400) {
                reject("Error");
            }
        }
        xmlHttp.open("GET", twitch_get_channel_url + username, true);
        xmlHttp.setRequestHeader('client-id', twitch_clientID);
        xmlHttp.setRequestHeader('Authorization', 'Bearer ' + bearerToken);
        xmlHttp.send(null);
    });
}

module.exports = router;