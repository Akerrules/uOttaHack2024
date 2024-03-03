'use client'

import Car from "@/component/car";
import Sidebar from "@/component/sideBar";
import TpBar from "@/component/tpBar";
import Image from "next/image";


export default function Home() {

  return (
    <main className="h-screen w-full p-8">
      <TpBar></TpBar>
      <div className="flex">
        {/* 1. sideBar 
        2. Three3D model Car 
        3. List of things  */}

        <Sidebar></Sidebar>
        <Car></Car>

      </div>

    </main>
  );
}
