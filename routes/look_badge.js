const express = require('express');
const router = express.Router();
const Auth = require('../controllers/auth.controller');
const LookBadge = require('../controllers/look_badge');

router.get('/', [Auth.verifyToken], LookBadge.get);
router.post('/', [Auth.verifyToken, Auth.isBusiness], LookBadge.create);

module.exports = router;