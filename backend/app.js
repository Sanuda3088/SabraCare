const express = require('express');
const app = express();
const cors = require('cors');


app.use(cors()); //for Cross Origin resources sharing

app.use(express.urlencoded({ extended: true })); //even the nested objects will be encoded

app.use(express.json()); //for parsing the requests and responses with JSON format
//above 3 lines are the middleware functions

module.exports = app;