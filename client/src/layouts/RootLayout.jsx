import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/home/sidebar/SideBar";
import Background from "../components/Background";
import { useToggleFormContext } from "../hooks/useContext/useToggleForm";
import { useAuthContext } from "../hooks/useContext/useAuthContext";
import { useProject } from "../hooks/useProject";

export default function RootLayout() {
  const { user } = useAuthContext();
  const { setProjects } = useProject();
  const { background } = useToggleFormContext();

  useEffect(() => {
    if (user) {
      setProjects(user);
    }
  }, [user]);

  return (
    <>
      {background && <Background />}
      {/* <header className="bg-indigo-400 h-[6vh]">
        <NavBar />
      </header> */}
      <aside className="bg-neutral-800 border-r">
        <SideBar />
      </aside>
      <main className="flex bg-neutral-700 w-full">
        <Outlet />
      </main>
    </>
  );
}
