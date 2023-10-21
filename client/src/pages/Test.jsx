import React from "react";

import NavBar from "../components/NavBar";
import LaSide from "../components/SideMenu";
import Chat from "../components/Chat";

export default function Test() {
  return (
    <div className="relative z-0 flex flex-col h-screen w-screen">
      <NavBar />
      <div className="flex h-full">
        <LaSide />
        <Chat />
      </div>
    </div>
  );
}
