const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

//Routes
const auth = require('./routes/auth');
const lookBadge = require('./routes/look_badge');


app.use('/auth', auth);
app.use('/look_badge', lookBadge);

//Serve images
app.use('/images',express.static('images'));

app.listen(8080, () => {
    console.clear();
    console.log('App is listening to port 8080');
});