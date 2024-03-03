import React from 'react';

const Battery = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {data.map((item, index) => (
        <div key={index}>
          <h2 className="text-gray-500 text-lg">{item.title}</h2>
          <p className="text-gray-800 text-3xl mt-2">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

const BatteryPage = () => {
  const batteryData = [
    { title: 'Capacity', value: '5000 mAh' },
    { title: 'Voltage', value: '3.7 V' },
    { title: 'Type', value: 'Lithium-ion' },
  ];

  return (
    <div>
      <h1>Battery Information</h1>
      <Battery data={batteryData} />
    </div>
  );
};

export default BatteryPage;
