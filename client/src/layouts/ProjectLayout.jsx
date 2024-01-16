import { Outlet } from "react-router-dom";

import SideBar from "../components/project/SideBar";

export default function ProjectLayout() {
  return (
    <div className="flex h-full w-full">
      <aside className="flex flex-col h-full w-1/6 bg-neutral-700">
        <SideBar />
      </aside>

      <main className="flex flex-col h-full w-5/6 bg-neutral-500">
        <Outlet />
      </main>
    </div>
  );
}
