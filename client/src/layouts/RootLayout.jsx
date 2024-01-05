import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Background from "../components/Background";
import { useToggleFormContext } from "../hooks/useContext/useToggleForm";

export default function RootLayout() {
  const { background } = useToggleFormContext();

  return (
    <div className="max-h-screen max-w-screen">
      {background && <Background />}
      <header className="bg-indigo-400 h-[6vh]">
        <NavBar />
      </header>
      <section className="flex h-[92vh]">
        <aside className="w-96 bg-neutral-800 border-r">
          <SideBar />
        </aside>
        <main className="flex-1 bg-neutral-700">
          <Outlet />
        </main>
      </section>
    </div>
  );
}
