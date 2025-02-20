"use client";

import React, { useState } from "react";
import TpBar from "../component/tpBar";
import Sidebar from "../component/sideBar";
import Map from "../component/map";
import MapPage from "./drivingMode";
import SpotifyPlaylist from "./spotifyPlaylist";
import CarDetail from "./detailInfo";


export default function routes() {

  return (
    <main className=" h-screen w-full">
      <div>
        <TpBar></TpBar>
      </div>
 
      <div className="flex">
        <div className="bg-white rounded-lg">
            <Sidebar></Sidebar>
        </div>
        <div className="min-w-[55rem]">
          <Map></Map>
          <MapPage></MapPage>
           <CarDetail></CarDetail>
  
        </div>

        <div className="">
          <SpotifyPlaylist></SpotifyPlaylist>
        </div>

      </div>


      



      

    </main>
  );
}
