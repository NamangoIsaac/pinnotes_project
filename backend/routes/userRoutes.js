const express = require('express');
const { registerUser, authUser } = require('../controllers/userController');
const router = express.Router();

router.post('/login', authUser);
router.post('/register', registerUser);

module.exports = router;
