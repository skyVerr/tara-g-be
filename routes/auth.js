const express = require('express');
const router = express.Router();

const Auth = require('../controllers/auth.controller');

router.get('/login', Auth.login);
router.post('/signup', Auth.signup);

module.exports = router;