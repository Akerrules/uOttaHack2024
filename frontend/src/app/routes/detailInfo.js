import React from 'react';

const CarDetail = () => {
  const batteryData = [
    { title: 'Speed', value: '80 km/h' },
    { title: 'Average Energy Consumption', value: '188 wh/km' },
    { title: 'Range', value: '255km' },
    // Assuming these new values for demonstration purposes
    { 
      title: 'Full Capacity', 
      remaining: '200 km',  // This is a new field for remaining km
      used: '155 km',       // This is a new field for used km
    },
  ];

  return (
    <div className="flex">
      {batteryData.map((item, index) => (
        <div key={index} className="bg-white min-w-[19rem] m-2 p-4 rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-1">
          {/* Check if item has 'remaining' and 'used' fields to create a divided block */}
          {item.remaining && item.used ? (
            <div>
              <h2 className="text-gray-500 text-lg">{item.title}</h2>
              {/* Divided area for remaining and used km */}
              <div className=" justify-between mt-2">
                <div className='flex'>
                  <h3 className="text-gray-500 text-md">Remaining <br></br></h3>
                  <p className="text-gray-800 text-xl">{item.remaining}</p>
                  <hr></hr>
                  <hr></hr>
                </div>
                <div className='flex'>
                  <h3 className="text-gray-500 text-md">Used <br></br></h3>
                  <p className="text-gray-800 text-xl">{item.used}</p>
                </div>
              </div>
            </div>
          ) : (
            // Original layout for other items
            <div>
              <h2 className="text-gray-500 text-lg">{item.title}</h2>
              <p className="text-gray-800 text-3xl mt-2">{item.value}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CarDetail;
