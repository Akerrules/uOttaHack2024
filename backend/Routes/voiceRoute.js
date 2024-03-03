const express = require('express');
const voiceController = require('../Controllers/voiceController');

const router = express.Router();

router.post('/', voiceController.user_create);

module.exports = router;
