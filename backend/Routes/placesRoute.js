const express = require('express');
const placesController = require('../Controllers/placesController');

const router = express.Router();

router.post('/', placesController.getPlacesAlongRoute);

module.exports = router;
