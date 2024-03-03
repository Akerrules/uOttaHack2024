import React from 'react';
import SpotifyEmbed from './spotify';

// const Battery = ({ data }) => {
//   return (
//     <div className="bg-white p-8 rounded-lg shadow-md">
//       {data.map((item, index) => (
//         <div key={index}>
//           <h2 className="text-gray-500 text-lg">{item.title}</h2>
//           <p className="text-gray-800 text-3xl mt-2">{item.value}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

const BatteryPage = () => {
  const batteryData = [
    { title: 'Battery', value: '20%' },
    { title: 'Range', value: '300 km' },
    {title: 'Trip Starter>>', Value:'Start Trip'}
  ];

  return (

    <div className="flex">
      {batteryData.map((item, index) => (
        <div className="bg-white m-2 p-4 rounded-lg shadow-md max-h-36 min-w-40 transition-transform duration-300 hover:-translate-y-1" key={index}>
          <h2 className="text-gray-500 text-lg">{item.title}</h2>
          <p className="text-gray-800 text-3xl mt-2">{item.value}</p>
        </div>
      ))}

      <SpotifyEmbed></SpotifyEmbed>
    </div>


  );
};

export default BatteryPage;
