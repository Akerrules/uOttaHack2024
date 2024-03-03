const express = require('express');
const getNearByPlacesController = require('../Controllers/nearByPlacesController');

const router = express.Router();

router.post('/', getNearByPlacesController.getPlaces);

module.exports = router;
