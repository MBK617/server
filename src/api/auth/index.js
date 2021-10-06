const express = require('express');

const app = express();

app.use('/user', require('./user'));
app.use('/post', require('./post'));

module.exports = app;