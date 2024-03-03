import React from 'react';
import Head from 'next/head';
import NearbyPlacesList from './nearbyPlace';



const ChargingInterface = () => {
  const chargePercentage = 50; // Example charged percentage
  const powerCharged = 30; // Example power charged in kWh
  const ratedRange = 210; // Example rated range in miles
  const timeRemaining = 120; // Example time remaining in minutes
  const timeUsed = 60; // Example time used in minutes

  return (
    <>
      <Head>
        <title>EV Charging Interface</title>
      </Head>
      <div className="p-10">
        <div className="space-y-4">
          {/* Progress Bar with Percentage */}
          <div>
            <div className="text-xl mb-2">Charge Progress</div>
            <div className="w-full bg-gray-200 rounded-full h-4 relative">
              <div
                className="bg-blue-600 h-4 rounded-full"
                style={{ width: `${chargePercentage}%` }}
              />
              <div className="absolute inset-0 flex justify-center items-center">
                <span className="text-sm font-semibold text-white">{chargePercentage}% Charged</span>
              </div>
            </div>
          </div>

          {/* Power Charged */}
          <div className="border border-slate-400 p-4 rounded transition-transform duration-300 hover:-translate-y-1">
            <div className="text-xl">Power Charged: {powerCharged} kWh</div>
          </div>

          {/* Rated Range */}
          <div className="border border-slate-400 p-4 rounded transition-transform duration-300 hover:-translate-y-1">
            <div className="text-xl">Rated Range: {ratedRange} miles</div>
          </div>

          {/* Time Info */}
          <div className="border border-slate-400 p-4 rounded flex transition-transform duration-300 hover:-translate-y-1">
            <div className="flex-1 text-center border-r">
              <div className="text-xl">Time Left: {timeRemaining} min</div>
            </div>
            <div className="flex-1 text-center transition-transform duration-300 hover:-translate-y-1">
              <div className="text-xl">Time Used: {timeUsed} min</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChargingInterface;
