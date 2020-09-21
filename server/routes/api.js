const express = require('express');
const router = express.Router();


// Response from /api
router.get('/', (req, res) => {
    res.send("From API route");
});

// Post request to encrypt string
router.post('/encrypt/:encrypt_type', (req, res) => {
    let data = req.body;
    let encrypt_type = req.params.encrypt_type;

    if(encrypt_type == "Argon2i") {
        encryptToArgon(data.text, (hashed) => {
            // Return hashed value
            res.status(200).send({ result: hashed });
        })
    }
    else if(encrypt_type == "bcrypt") {
        encryptTobcrypt(data.text, (hashed) => {
            // Return hashed value
            res.status(200).send({ result: hashed });
        })
    }
    else if(encrypt_type == "scrypt") {
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
    bcrypt.hash(toHash, saltRounds, function(err, hashed) {
        callback(hashed);
    });
}

const crypto = require('crypto');
// Encrypting string using scrypt
function encryptToscrypt(toHash, callback) {

    // Creating salt
    let salt = crypto.randomBytes(16).toString('hex');
    // Hashing and using result in callback
    crypto.scrypt(toHash, salt, 64, (err, hashed) => {
        callback(hashed);
    });
}


module.exports = router;