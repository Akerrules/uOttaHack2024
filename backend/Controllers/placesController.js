const axios = require('axios');
const API_KEY = process.env.API_KEY;




async function getPlacesAlongRoute(req, res) {
  const { origin, destination, placeType = "electric_vehicle_charging_station" } = req.body;
  try {
    const routes = await fetchRoute(origin, destination);
    // const bounds = routes.bounds;
    const places = await findPlacesAlongRoute(routes, placeType);
    res.json(places);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function fetchRoute(origin, destination) {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
      params: {
        origin: origin,
        destination: destination,
        key: API_KEY
      },
    });

    const data = response.data;
    if (data.status === 'OK') {
        const distance = parseInt(data.routes[0].legs[0].distance.text);
        const duration = data.routes[0].legs[0].duration.text;
        return data.routes[0];
    } else {
      throw new Error('Error fetching directions');
    }
  } catch (error) {
    throw new Error('Error fetching directions');
  }
}
async function findPlacesAlongRoute(directions, placeType) {
  const waypoints = calculateWaypoints(directions); 
  const res = [];

  // Iterate through waypoints and find places of the specified type near each waypoint
  for (const waypoint of waypoints) {
    const result = await searchNearbyPlaces(waypoint.lat, waypoint.lng, placeType);
    res.push(result);
  }
  console.log(res);
  const uniqueSet = new Set();
  res.forEach(innerArray => {
    if (innerArray) {
      innerArray.forEach(element => {
        uniqueSet.add(element);
      });
    }
  });
const places = [...uniqueSet];
const filteredArray = filterUniqueAddresses(places);

return filteredArray;
}

async function searchNearbyPlaces(lat, lng, placeType) {
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
        radius: 500
      }
    }
  };

  const headers = {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': API_KEY,
    'X-Goog-FieldMask': `places.displayName,places.formattedAddress,places.id`
  };

  try {
    const response = await axios.post(url, requestBody, { headers });
    console.log(response.data.places);
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
      name: obj.displayName.text
    }));
  }
function filterUniqueAddresses(arr) {
    const uniqueAddresses = new Set();
    return arr.filter(obj => {
      if (uniqueAddresses.has(obj.id)) {
        return false; // Skip if address is already in the set
      } else {
        uniqueAddresses.add(obj.id);
        return true; // Include if address is not in the set
      }
    });
}

function calculateWaypoints(directions) {
  const numSegments = 5; // Divide the route into 5 segments
  const totalDistance = parseInt(directions.legs[0].distance.text);
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
  // console.log(waypoints);
  return waypoints;
}
  module.exports = {
    getPlacesAlongRoute,
  };
