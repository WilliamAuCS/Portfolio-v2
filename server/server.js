const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const PORT = 8080;
const api = require('./routes/api');
const app = express();
const https = require("https");

const privateKey = fs.readFileSync('/etc/letsencrypt/live/server.makosusa.com/privkey.pem');
const certificate = fs.readFileSync('/etc/letsencrypt/live/server.makosusa.com/cert.pem');
const credentials = {key: privateKey, cert: certificate};

const corsOptions = {
    origin: ['https://www.williamaucs.com', 'https://williamaucs.com'], 
    optionsSuccessStatus: 200
}

var httpsServer = https.createServer(credentials, app);

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use('/api', api);
app.get('/', function(req, res) {
    res.send("hello from server")
});

httpsServer.listen(PORT, function() {
    console.log("Server running with https on port:" + PORT)
});