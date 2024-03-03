"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import Car from "../component/car";
import TpBar from "../component/tpBar";
import Link from "next/link";
import Sidebar from "../component/sideBar";
import battery from "../component/batteryPage";

export default function charging() {
  return (
    <main className=" h-screen w-full">
      <div>
        <TpBar></TpBar>
      </div>
      <div className="flex">
        <Sidebar></Sidebar>
        <battery></battery>

      </div>
    </main>
  );
}
