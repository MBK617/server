require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const authCheck = require('./middleware/auth');
const cors = require('cors');

var app = express();
app.use(bodyparser.json());
app.use(cors());

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));

const publicAPI = require('./api/public')
const authAPI = require('./api/auth')

app.use('/api/public', publicAPI);
app.use('/api/auth', authCheck, authAPI);