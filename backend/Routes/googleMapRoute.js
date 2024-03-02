const express = require('express');
const geolocationController = require('../Controllers/geolocationController'); 
const router = express.Router();

router.get('/', geolocationController.getGeolocation);

module.exports = router;