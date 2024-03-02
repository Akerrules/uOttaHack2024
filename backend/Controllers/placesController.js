
const axios = require('axios');
const API_KEY = process.env.API_KEY;
const SPECS = {
    speed: 60, // 60 miles per hour
    batteryCapacity: 300, // 300 miles
};

async function getPlacesAlongRoute(req, res) {
    const { origin, destination, placeType } = req.body;
  
    try {
      const directions = await fetchDirections(origin, destination);
      const places = await findPlacesAlongRoute(directions, placeType);
      res.json(places);
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
          key: apiKey,
        },
      });
  
      const data = response.data;
      if (data.status === 'OK') {
        console.log(data);
        return data.routes[0]; // First route is typically the best
      } else {
        throw new Error('Error fetching directions');
      }
    } catch (error) {
      throw new Error('Error fetching directions');
    }
  }
  
  async function findPlacesAlongRoute(directions, placeType) {
    const waypoints = calculateWaypoints(directions); // Calculate waypoints based on directions
    const places = [];
  
    // Iterate through waypoints and find places of the specified type near each waypoint
    for (const waypoint of waypoints) {
      const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
        params: {
          location: `${waypoint.lat},${waypoint.lng}`,
          radius: 5000, // Search within a radius of 5 km
          type: placeType, // Type of place to search for (e.g., 'restaurant', 'cafe', 'gas_station')
          key: API_KEY,
        },
      });
  
      const data = response.data;
      places.push(...data.results);
    }
  
    return places;
  }
  
  function calculateWaypoints(directions) {
    // Implement logic to calculate waypoints based on the provided directions
    // For simplicity, you can divide the route into segments and calculate waypoints along each segment
    // This function should return an array of { lat, lng } objects representing the waypoints
    function calculateWaypoints(directions) {
        const numSegments = 5; // Divide the route into 5 segments
        const totalDistance = directions.legs.reduce((total, leg) => total + leg.distance.value, 0);
        const segmentDistance = totalDistance / numSegments;
      
        const waypoints = [];
        let accumulatedDistance = 0;
      
        for (const leg of directions.legs) {
          const steps = leg.steps;
          for (const step of steps) {
            const stepDistance = step.distance.value;
            if (accumulatedDistance + stepDistance >= segmentDistance) {
              const remainingDistance = segmentDistance - accumulatedDistance;
              const remainingRatio = remainingDistance / stepDistance;
              const lat = step.start_location.lat + (step.end_location.lat - step.start_location.lat) * remainingRatio;
              const lng = step.start_location.lng + (step.end_location.lng - step.start_location.lng) * remainingRatio;
              waypoints.push({ lat, lng });
              accumulatedDistance = stepDistance - remainingDistance;
            } else {
              accumulatedDistance += stepDistance;
            }
          }
        }
        return waypoints;
      }
  }
  
  module.exports = {
    getPlacesAlongRoute,
  };