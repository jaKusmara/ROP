import { Outlet, useParams } from "react-router-dom";
import { useProject } from "../hooks/useProject";
import SideBar from "../components/project/SideBar";
import { useAuthContext } from "../hooks/useContext/useAuthContext";
import { useEffect } from "react";

export default function ProjectLayout() {
  const { user } = useAuthContext();
  const { setProject } = useProject();
  const { project_id } = useParams();

  useEffect(() => {
    setProject(user, project_id);
  }, [user, project_id]);

  localStorage.setItem("project_id", JSON.stringify(project_id));

  return (
    <div className="flex flex-row h-full">
      <aside className="flex flex-col h-full bg-neutral-700 w-[15%]">
        <SideBar />
      </aside>
      <main className="flex flex-col h-full bg-neutral-500 w-[95%]">
        <Outlet />
      </main>
    </div>
  );
}
