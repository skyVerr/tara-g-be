const express = require('express');
const router = express.Router();
const Auth = require('../controllers/auth.controller');
const Business = require('../controllers/business');

router.get('/', Business.get);

router.post('/challenge', Business.addChallenge);
router.get('/challenge', Business.getChallenges);

module.exports = router;