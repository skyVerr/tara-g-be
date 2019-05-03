const express = require('express');
const router = express.Router();
const Auth = require('../controllers/auth.controller');
const Business = require('../controllers/business');

router.get('/', Business.get);

module.exports = router;