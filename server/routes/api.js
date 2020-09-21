const express = require('express');
const router = express.Router();

const argon2 = require('argon2');


// Response from /api
router.get('/', (req, res) => {
    res.send("From API route");
});

// Post request to encrypt string
router.post('/toArgon', (req, res) => {
    let data = req.body;
    encryptToArgon(data.text, (hashed) => {
        if(hashed == "error") {
            res.status(500).send("Server error");
            return;
        }
        res.status(200).send({ result: hashed });
    })

});

// Encrypting string using Argon2i
function encryptToArgon(toHash, callback) {
    argon2.hash(toHash).then((hashed) => {
        callback(hashed);
    });
}

module.exports = router;