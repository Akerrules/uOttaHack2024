"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import Car from "../component/car";
import TpBar from "../component/tpBar";
import Sidebar from "../component/sideBar";
import BatteryPage from "../component/batteryPage";
import Map from "../component/map";
import ChargingStationCard from "../component/chargingStation";


export default function charging() {

  const stations = [
    {
      id: 1,
      imageUrl: '/images/station1.jpg', // Replace with your local or public image paths
      name: 'ElectroCharge Central Park',
      address: '123 Main St, Metropolis, NY'
    },
    {
      id: 2,
      imageUrl: '/images/station2.jpg',
      name: 'PowerPlug Downtown',
      address: '456 Elm St, Gotham, NJ'
    },
    {
      id: 3,
      imageUrl: '/images/station1.jpg', // Replace with your local or public image paths
      name: 'ElectroCharge Central Park',
      address: '123 Main St, Metropolis, NY'
    },
    {
      id: 4,
      imageUrl: '/images/station1.jpg', // Replace with your local or public image paths
      name: 'ElectroCharge Central Park',
      address: '123 Main St, Metropolis, NY'
    },
    {
      id: 5,
      imageUrl: '/images/station1.jpg', // Replace with your local or public image paths
      name: 'ElectroCharge Central Park',
      address: '123 Main St, Metropolis, NY'
    },
    {
      id: 6,
      imageUrl: '/images/station1.jpg', // Replace with your local or public image paths
      name: 'ElectroCharge Central Park',
      address: '123 Main St, Metropolis, NY'
    },
    {
      id: 7,
      imageUrl: '/images/station1.jpg', // Replace with your local or public image paths
      name: 'ElectroCharge Central Park',
      address: '123 Main St, Metropolis, NY'
    },
    {
      id: 8,
      imageUrl: '/images/station1.jpg', // Replace with your local or public image paths
      name: 'ElectroCharge Central Park',
      address: '123 Main St, Metropolis, NY'
    },
    
  ];

  return (
    <main className=" h-screen w-full">
      <div>
        <TpBar></TpBar>
      </div>
      <div className="flex">

        <div className="bg-white rounded-lg">
            <Sidebar></Sidebar>
        </div>
        <Map></Map>
      </div>

      <div className="flex flex-nowrap overflow-x-auto space-x-4 py-4">
      {stations.map((station) => (
        <ChargingStationCard key={station.id} station={station} />
      ))}
    </div>

    </main>
  );
}
