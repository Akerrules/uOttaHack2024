"use client";

import React, { useState } from "react";
import TpBar from "../component/tpBar";
import Sidebar from "../component/sideBar";
import Map from "../component/map";
import MapPage from "./drivingMode";



export default function routes() {

  return (
    <main className=" h-screen w-full">
      <div>
        <TpBar></TpBar>
      </div>
 

        <div className="bg-white rounded-lg">
            <Sidebar></Sidebar>
        </div>



      

    </main>
  );
}
