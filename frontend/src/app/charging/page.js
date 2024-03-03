"use client";

import React from "react";
import TpBar from "../component/tpBar";
import { useSearchParams } from "next/navigation";
import Sidebar from "../component/sideBar";
import { useRouter } from "next/navigation";
import MapWithMarkers from "../component/mapWithMarker";
import ChargingStationCard from "../component/chargingStation";
// import { json } from "stream/consumers";

export default function charging() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const decodedSearch = decodeURIComponent(searchParams.get("markers"));
  var json_marker = JSON.parse(decodedSearch);

  console.log(json_marker, "jason");
  // const stations = [
  //   {
  //     id: "ChIJ2yYYHgAFzkwRjGU5BPXLEGY",
  //     formattedAddress: "44 Elgin St, Ottawa, ON K1P 1C7, Canada",
  //     name: "Little Victories Coffee Roasters - Elgin",
  //   },
  //   {
  //     id: "ChIJSQkH3sAFzkwRhS8mNhp6nts",
  //     formattedAddress: "912 Bank St, Ottawa, ON K1S 3W6, Canada",
  //     name: "Kettlemans Bagel",
  //   },
  //   {
  //     id: "ChIJEYf9WFEEzkwRmzXNk2Aw2lU",
  //     formattedAddress: "150 Elgin St, Ottawa, ON K2P 1L4, Canada",
  //     name: "The SconeWitch",
  //   },
  // ];

  // console.log(stations, "station");

  // const stations = [
  //   {
  //     id: 1,
  //     imageUrl: '/images/station1.jpg', // Replace with your local or public image paths
  //     name: 'ElectroCharge Central Park',
  //     address: '123 Main St, Metropolis, NY'
  //   },
  //   {
  //     id: 2,
  //     imageUrl: '/images/station2.jpg',
  //     name: 'PowerPlug Downtown',
  //     address: '456 Elm St, Gotham, NJ'
  //   },
  //   {
  //     id: 3,
  //     imageUrl: '/images/station1.jpg', // Replace with your local or public image paths
  //     name: 'ElectroCharge Central Park',
  //     address: '123 Main St, Metropolis, NY'
  //   },
  //   {
  //     id: 4,
  //     imageUrl: '/images/station1.jpg', // Replace with your local or public image paths
  //     name: 'ElectroCharge Central Park',
  //     address: '123 Main St, Metropolis, NY'
  //   },
  //   {
  //     id: 5,
  //     imageUrl: '/images/station1.jpg', // Replace with your local or public image paths
  //     name: 'ElectroCharge Central Park',
  //     address: '123 Main St, Metropolis, NY'
  //   },
  //   {
  //     id: 6,
  //     imageUrl: '/images/station1.jpg', // Replace with your local or public image paths
  //     name: 'ElectroCharge Central Park',
  //     address: '123 Main St, Metropolis, NY'
  //   },
  //   {
  //     id: 7,
  //     imageUrl: '/images/station1.jpg', // Replace with your local or public image paths
  //     name: 'ElectroCharge Central Park',
  //     address: '123 Main St, Metropolis, NY'
  //   },
  //   {
  //     id: 8,
  //     imageUrl: '/images/station1.jpg', // Replace with your local or public image paths
  //     name: 'ElectroCharge Central Park',
  //     address: '123 Main St, Metropolis, NY'
  //   },

  // ];

  return (
    <main className=" h-screen w-full">
      <div>
        <TpBar></TpBar>
      </div>
      <div className="flex">
        <div className="bg-white rounded-lg">
          <Sidebar></Sidebar>
        </div>

        <MapWithMarkers locations={json_marker}></MapWithMarkers>
      </div>

      <div className="flex flex-nowrap overflow-x-auto space-x-4 py-4">
        {json_marker &&
          json_marker.map((station) => (
            <ChargingStationCard key={station.id} station={station} />
          ))}
      </div>
    </main>
  );
}
