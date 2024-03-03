"use client";

import React, { useState } from "react";
import TpBar from "../component/tpBar";
import Sidebar from "../component/sideBar";
import Map from "../component/map";
import Link from "next/link";



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
          <Map></Map>
      </div>
      <Link href="/routes">
          <button className="text-gray-500 text-2xl mt-6 inline-block border-6 border-white font-semibold py-2 px-4 ml-6 rounded-lg bg-white  transition-transform duration-300 hover:-translate-y-1">
            START TRIP »
          </button>
        </Link>

    </main>
  );
}
