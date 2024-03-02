const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.API_KEY;

async function getGeolocation(address) {
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
      // Log the actual error for debugging purposes
      console.error('Error fetching geolocation:', error);
      throw new Error('Error fetching geolocation');
    }
  }
  

// Example usage
const address = '1600 Amphitheatre Parkway, Mountain View, CA';
getGeolocation(address)
  .then(location => {
    console.log(location);
  })
  .catch(error => {
    console.error(error);
  });
