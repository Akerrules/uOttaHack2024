
const axios = require('axios');
require('dotenv').config();
const API_KEY = process.env.API_KEY;

async function getPlaces(req, res) {
    const { lat, lng, placeType = "electric_vehicle_charging_station" } = req.body;
    try {
      
      // const bounds = routes.bounds;
      const places = await getNearbyPlaces(lat,lng, placeType);
      res.json(places);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

async function getNearbyPlaces(lat, lng, placeType) {
    const url = 'https://places.googleapis.com/v1/places:searchNearby';
  
    const requestBody = {
      includedTypes: [placeType],
      maxResultCount: 3,
      locationRestriction: {
        circle: {
          center: {
            latitude: lat,
            longitude: lng 
          },
          radius: 5000
        }
      }
    };
  
    const headers = {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask': `places.displayName,places.formattedAddress,places.id,places.photos`
    };
  
    try {
      const response = await axios.post(url, requestBody, { headers });
      // console.log(response.data.places.p);
      const places = transformObjects(response.data.places);
      return places;
    } catch (error) {
      console.error('Error:', error.message);
    }
    // return response.data;
  }

  function transformObjects(arr) {
    return arr.map(obj => ({
      id: obj.id,
      formattedAddress: obj.formattedAddress,
      name: obj.displayName.text,
      // photos: obj.photos
    }));
  }

  module.exports = {
    getPlaces,
  };