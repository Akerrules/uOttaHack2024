"use client";

import React, { useState } from "react";
import TpBar from "../../component/tpBar";
import Link from "next/link";
import Sidebar from "../../component/sideBar";
import ChargingInterface from "./chargingUI";
import NearbyPlacesList from "./nearbyPlace";

export default function Station() {
  const nearbyPlaces = [
    {
      id: 1,
      name: "Joe’s Coffee",
      address: "123 Main St",
      imageUrl: "/restaurant/r1.png", // replace with your image path or URL
    },
    {
      id: 2,
      name: "Central Perk",
      address: "456 Elm St",
      imageUrl: "/restaurant/r2.jpg", // replace with your image path or URL
    },

    {
      id: 3,
      name: "Victoria Social Club",
      address: "456 Elm St",
      imageUrl: "/restaurant/r3.jpg", // replace with your image path or URL
    },

    {
      id: 4,
      name: "Central Perk",
      address: "456 Elm St",
      imageUrl: "/restaurant/r1.png", // replace with your image path or URL
    },

    {
      id: 5,
      name: "Central Perk",
      address: "456 Elm St",
      imageUrl: "/restaurant/r2.jpg", // replace with your image path or URL
    },
    // Add more places as needed
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
        <div>
          <img src="/carImage.png"></img>
          <ChargingInterface></ChargingInterface>
        </div>

        <div>
          <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Nearby Recommendations</h2>
            <NearbyPlacesList places={nearbyPlaces} />
          </div>
        </div>
      </div>
    </main>
  );
}
