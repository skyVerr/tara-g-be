const express = require('express');
const router = express.Router();
const Auth = require('../controllers/auth.controller');
const Travellers = require('../controllers/travellers');

router.get('/', Travellers.get);
router.post('/:id/facebook', Travellers.addFacebook);
router.post('/:id/challenge', Travellers.challengeDone);
router.get('/leaderboard', Travellers.leaderboard);

module.exports = router;