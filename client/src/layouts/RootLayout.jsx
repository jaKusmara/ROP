import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/home/sidebar/SideBar";

import { useToggleFormContext } from "../hooks/useContext/useToggleForm";
import { useAuthContext } from "../hooks/useContext/useAuthContext";
import { useProject } from "../hooks/useProject";
import ShowedTask from "../components/project/board/ShowedTask";

export default function RootLayout() {
  const { user } = useAuthContext();
  const { setProjects } = useProject();
  const { task } = useToggleFormContext();

  useEffect(() => {
    if (user) {
      setProjects(user);
    }
  }, [user]);

  return (
    <>
      {task && <ShowedTask />}
      <aside className="bg-neutral-950 h-full w-[15%] flex flex-col text-lg p-1">
        <SideBar />
      </aside>
      <main className="flex bg-neutral-900 w-[85%]">
        <Outlet />
      </main>
    </>
  );
}
