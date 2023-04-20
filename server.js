var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Variables
const PORT = 3000;
const MONGO_URL = "mongodb://localhost:27017/team";
const OPTIONS = { useNewUrlParser: true };

// Express Application
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', require('./routes'));

mongoose.connect(MONGO_URL, OPTIONS)
    .then(() => {
        console.log('Connected to mongoDB...');
    })
    .catch(err => {
        console.log('Error :', err);
    })

app.listen(PORT, function () {
    console.log("Application is on port:", PORT);
})

exports.PORT = PORT;
exports.MONGO_URL = MONGO_URL;