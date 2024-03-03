import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import axios from "axios";
// Marker.js or at the top of your current file
const Marker = ({ text }) => (
  <div
    style={{
      width: "50px",
      height: "50px",
      position: "absolute",
      // background: "red",
      // borderRadius: "50%",
      color: "white",
    }}
  >
    <img
      width="50"
      height="50"
      src="https://img.icons8.com/ios-filled/50/region-code.png"
      alt="region-code"
    />
  </div>
);

const MapWithMarkers = ({ locations }) => {
  const [markerData, setMarkerData] = useState([]);

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

  // Set up Google Maps API key
  const apiKey = "AIzaSyCVrzSbDpq1huUtJ-06e5c1zXsZTGFuh9w";

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={{ lat: 45.4215, lng: -75.6972 }} // Default center (Ottawa)
        defaultZoom={12} // Default zoom level
      >
        {markerData.map((location) => (
          <Marker
            key={location.id}
            lat={location.lat}
            lng={location.lng}
            // text={location.name}
            imgSrc="https://img.icons8.com/ios-filled/50/region-code.png"
            // imgSrc="https://img.icons8.com/ios-filled/50/region-code.png"
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

// const Marker = ({ text }) => <div style={{ color: 'red' }}>{text}</div>;

export default MapWithMarkers;
