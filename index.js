const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

//Routes
const auth = require('./routes/auth');

app.use('/auth', auth);

app.listen(8080, () => {
    console.clear();
    console.log('App is listening to port 8080');
});