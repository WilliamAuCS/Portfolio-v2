const express = require('express');
const router = express.Router();

const argon2 = require('argon2');


// Response from /api
router.get('/', (req, res) => {
    res.send("From API route");
});

router.post('/', (req, res) => {
    encryptToArgon(req.body)
});

function encryptToArgon(toHash) {
    let afterHash;
    argon2.hash(toHash).then((hashed) => {
        afterHash = hashed;
    });
    return afterHash;
}

module.exports = router;