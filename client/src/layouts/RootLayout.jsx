import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { useState } from "react";
import Background from "../components/Background";
import { useToggleFormContext } from "../hooks/useContext/useToggleForm";

export default function RootLayout() {
  const { background } = useToggleFormContext();

  return (
    <div className="m-0 h-screen relative">
      {background ? <Background /> : null}
      <header className="bg-indigo-400 flex-col h-[5%]">
        <NavBar />
      </header>
      <section className="flex flex-row h-[95%]">
        <aside className="flex flex-col w-[15%] bg-neutral-800 border-r">
          <SideBar />
        </aside>
        <main className="bg-neutral-700 w-full h-full">
          <Outlet />
        </main>
      </section>
    </div>
  );
}
