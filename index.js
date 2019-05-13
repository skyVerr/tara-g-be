const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

//Routes
const auth = require('./routes/auth');
const lookBadge = require('./routes/look_badge');
const business = require('./routes/business');
const travellers = require('./routes/travellers');

var webhooks;



app.get('/webhooks', (req, res) => {
    webhooks = req.query;
    res.send(req.query['hub.challenge']).end();
});

app.post('/webhooks', (req, res) => {
    webhooks = req.body;
    res.json(req.body).end();
});

app.get('/getwebhooks', (req, res) => {
    res.json(webhooks);
});


app.use('/auth', auth);
app.use('/look_badge', lookBadge);
app.use('/business', business);
app.use('/travellers', travellers);

//Serve images
app.use('/images',express.static('images'));

app.listen(8080, () => {
    console.clear();
    console.log('App is listening to port 8080');
});