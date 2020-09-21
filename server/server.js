const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 8080;
const api = require('./routes/api');
const app = express();

const corsOptions = {
    origin: 'http://localhost:4200', 
    optionsSuccessStatus: 200
}
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use('/api', api);
app.get('/', function(req, res) {
    res.send("hello from server")
});

app.listen(PORT, function() {
    console.log("Server running on port:" + PORT)
});