const express = require('express');
const router = express.Router();
const Auth = require('../controllers/auth.controller');
const Travellers = require('../controllers/travellers');

router.get('/', Travellers.get);

module.exports = router;