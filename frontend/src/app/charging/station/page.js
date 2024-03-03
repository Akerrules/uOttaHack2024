"use client";

import React, { useState } from "react";
import TpBar from "../../component/tpBar";
import Link from "next/link";
import Sidebar from "../../component/sideBar";


export default function Station() {

  return (
    <main className=" h-screen w-full">
      <div>
        <TpBar></TpBar>
      </div>
      <div className="flex">
        <div className="bg-white rounded-lg">
            <Sidebar></Sidebar>
        </div>
      </div>

    </main>
  );
}