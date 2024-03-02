const express = require('express');
const directionsController = require('../Controllers/directionsController');

const router = express.Router();

router.post('/', directionsController.getDirections);

module.exports = router;
