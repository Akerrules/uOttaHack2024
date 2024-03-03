import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import axios from "axios";
// Marker.js or at the top of your current file
// const Marker = ({ text }) => (
//   <div
//     style={{
//       width: "50px",
//       height: "50px",
//       position: "absolute",
//       // background: "red",
//       // borderRadius: "50%",
//       color: "white",
//     }}
//   >
//     <img
//       width="50"
//       height="50"
//       src="https://img.icons8.com/ios-filled/50/region-code.png"
//       alt="region-code"
//     />
//   </div>
// );

const MapWithMarkers = ({ locations }) => {
  const [markerData, setMarkerData] = useState([]);
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
    // This will round the corners of the container
    overflow: "hidden", // This ensures the corners of the map itself are rounded
  };
  const center = {
    lat: 45.4218,
    lng: -75.6816,
  };

  useEffect(() => {
    const fetchCoordinates = async () => {
      const promises = locations.map(async (location) => {
        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              location.formattedAddress
            )}&key=AIzaSyCVrzSbDpq1huUtJ-06e5c1zXsZTGFuh9w`
          );

          const results = response.data.results;
          //   console.log(response.data.results[0].geometry.location);
          if (results && results.length > 0) {
            const { lat, lng } = results[0].geometry.location;
            return { ...location, lat, lng };
          }
        } catch (error) {
          console.error("Error fetching coordinates:", error);
        }
        return null;
      });
      const markerData = await Promise.all(promises);
      //   console.log(markerData)
      setMarkerData(markerData.filter(Boolean));
    };

    fetchCoordinates();
  }, [locations]);

  console.log(locations, "location from mapmaker");
  // Set up Google Maps API key
  const apiKey = "AIzaSyCVrzSbDpq1huUtJ-06e5c1zXsZTGFuh9w";

  return (
    // <div style={{ height: "400px", width: "100%" }}>

    <LoadScript googleMapsApiKey="AIzaSyCVrzSbDpq1huUtJ-06e5c1zXsZTGFuh9w">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={13}
      >
        {markerData.map((location) => (
          <div>
            {location.lat}
            <Marker
              key={location.id}
              position={location}
              // text={location.name}
              imgSrc="https://img.icons8.com/ios-filled/50/region-code.png"
              // imgSrc="https://img.icons8.com/ios-filled/50/region-code.png"
            />
          </div>
        ))}
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

// const Marker = ({ text }) => <div style={{ color: 'red' }}>{text}</div>;

export default MapWithMarkers;
