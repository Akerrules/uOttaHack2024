import Image from 'next/image';
import React from 'react';
import Link from "next/link";

const ChargingStationCard = ({ station }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 m-4 max-w-sm min-w-[300px]">
      {/* <Image 
        src={station.imageUrl}
        alt={station.name}
        width={400}
        height={100}
        className="rounded-lg"
      /> */}
      <h2 className="text-lg font-semibold my-2">{station.name}</h2>
      <p className="text-gray-600">{station.formattedAddress}</p>
      <Link href='/charging/station' > <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Charge Here
      </button></Link>
    </div>
  );
};

export default ChargingStationCard;
