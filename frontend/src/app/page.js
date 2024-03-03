"use client";

import Car from "@/app/component/car";
import Sidebar from "@/app/component/sideBar";
import TpBar from "@/app/component/tpBar";
import Image from "next/image";
import BatteryPage from "./component/batteryPage";

export default function Home() {
  return (
    <main className="h-screen w-full ">
      <div className="absolute w-full z-0 overflow-hidden">
        <Car></Car>
      </div>
      {/* <div className="absolute z-1 w-full h-screen bg-pink-100">h</div> */}
      <div className=" w-full z-10">

        <TpBar></TpBar>
      </div>
       <div className="absolute z-10 ">
          <Sidebar></Sidebar>  
        </div>

        <div className="absolute z-10 top-[550px] left-[400px]">
            <BatteryPage></BatteryPage>
        </div>
      
    </main>
  );
}
