const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 8080;
const api = require('./routes/api');
const app = express();

const corsOptions = {
    origin: 'https://makosusa.com', 
    optionsSuccessStatus: 200
}
app.use(bodyParser.json());

app.use('/api', api);
app.get('/', cors(corsOptions), function(req, res) {
    res.send("hello from server")
});

app.listen(PORT, function() {
    console.log("Server running on port:" + PORT)
});