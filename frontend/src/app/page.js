"use client";

import Car from "@/component/car";
import Sidebar from "@/component/sideBar";
import TpBar from "@/component/tpBar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen w-full ">
      <div className="absolute w-full z-0 overflow-hidden">
        <Car></Car>
      </div>
      {/* <div className="absolute z-1 w-full h-screen bg-pink-100">h</div> */}
      <div className="absolute  w-full z-10">
        <TpBar></TpBar>
        <div className="flex">
          {/* 1. sideBar 
        2. Three3D model Car 
        3. List of things  */}

          <Sidebar></Sidebar>
        </div>
      </div>
    </main>
  );
}
