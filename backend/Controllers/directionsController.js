// server/controllers/directionsController.js

const axios = require('axios');
const API_KEY = process.env.API_KEY;

async function getDirections(req, res) {
  const { origin, destination } = req.body;

  try {
    const result = await fetchDirections(origin, destination);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function fetchDirections(origin, destination) {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
      params: {
        origin: origin,
        destination: destination,
        key: API_KEY,
      },
    });

    const data = response.data;
    if (data.status === 'OK') {
        // parse the text to integer
        // console.log(data);
        const distance = parseInt(data.routes[0].legs[0].distance.text);
        const duration = data.routes[0].legs[0].duration.text;
        return data.routes[0];
      // return {distance, duration}; // Returning the first route found
    } else {
      throw new Error('Error fetching directions');
    }
  } catch (error) {
    throw new Error('Error fetching directions');
  }
}

module.exports = {
  getDirections,
};
