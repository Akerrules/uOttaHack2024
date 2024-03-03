import React from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const Map = () => {
    const mapContainerStyle = {
        width: '100%',
        height: '400px'
    };

    const center = {
        lat: 45.4218,
        lng: -75.6816
    };

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyCVrzSbDpq1huUtJ-06e5c1zXsZTGFuh9w">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={10}>
                <Marker position={center} />
            </GoogleMap>
        </LoadScript>
    );
};

export default Map;
