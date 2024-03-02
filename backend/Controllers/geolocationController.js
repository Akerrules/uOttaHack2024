// as a controller of the getPlaces route, utulizes the google map api to find the nearby places of a given location
// and returns the results to the client
// The controller is called by the getPlaces route in the server.js file

const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.API_KEY;

async function getGeolocation(req, res) {
  const { address} = req.body;

  try {
    const result = await fetchGeolocation(address);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function fetchGeolocation(address) {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: address,
        key: API_KEY,
      },
    });

    const data = response.data;
    if (data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return { latitude: location.lat, longitude: location.lng };
    } else {
      throw new Error('Location not found');
    }
  } catch (error) {
    throw new Error('Error fetching geolocation');
  }
}


module.exports = {
  getGeolocation,
};

