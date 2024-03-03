// pages/map.js
import Head from 'next/head';
import React from 'react';
import Map from '../component/map';
import SpotifyEmbed from '../component/spotify';
const MapPage = () => {
    const progress = 50; // 50% progress
    const distance = 40; 
    const totaltime = 45; 
    const arrivalTime = '23:00'; 


  return (
    <>
      <Head>
        <title>Map and Music Interface</title>
      </Head>
      <div className=" ">
        {/* Map Component */}

        
        {/* Information Bar */}
        <div className=''>
            <div className="bg-gray-200 p-4 mt-2 rounded-lg">
            <div className="flex justify-between items-center mb-2">
                <div>Distance {distance}</div>
                <div>Total Time {totaltime}</div>
                <div>ETA {arrivalTime}</div>
            </div>
            <div className="w-full bg-gray-400 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="mt-2 text-lg font-semibold">Destination: 123 Main St, Springfield</div>
            </div>
            
            {/* Music Playlist */}
            {/* <div className="mt-2 p-4 bg-gray-100">
                <SpotifyEmbed></SpotifyEmbed>
            </div> */}

        </div>
      </div>
    </>
  );
};

export default MapPage;
