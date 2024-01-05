import { NavLink } from "react-router-dom";
import { useProjectContext } from "../hooks/useContext/useProjectContext";
import { useProject } from "../hooks/useProject";
import { useAuthContext } from "../hooks/useContext/useAuthContext";
import { useEffect, useState } from "react";
import { useToggleFormContext } from "../hooks/useContext/useToggleForm";

export default function SideBar() {
  const { user } = useAuthContext();
  const { state } = useProjectContext();
  const { setProjects, error, isLoading } = useProject();
  const [sideDropdown, setSideDropdown] = useState(false);

  const { setCreateProject, setJoinProject, setBackground } =
    useToggleFormContext();

  useEffect(() => {
    setProjects(user);
  }, [user]);

  const handleCreateProject = () => {
    setBackground(true);
    setSideDropdown(!sideDropdown);
    setCreateProject(true);
  };

  const handleJoinProject = () => {
    setBackground(true);
    setSideDropdown(!sideDropdown);
    setJoinProject(true);
  };

  const handlePlusClick = () => {
    setSideDropdown(!sideDropdown);
  };

  return (
    <>
      <div className="flex flex-col text-white">
        <NavLink
          to="/"
          className="sidebar-link hover:bg-gray-700 py-2 px-4 rounded-md"
        >
          Dashboard
        </NavLink>
        <NavLink
          to="messages"
          className="sidebar-link hover:bg-gray-700 py-2 px-4 rounded-md"
        >
          Messages
        </NavLink>
      </div>
      <div>
        <div className="flex flex-col border-t p-1">
          <span className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Projects</h2>
            <button
              onClick={handlePlusClick}
              className="btn-plus bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full transition duration-300 ease-in-out"
            >
              +
            </button>
          </span>

          {sideDropdown && (
            <ul className="dropdown-list">
              <li>
                <button
                  onClick={handleCreateProject}
                  className="dropdown-item"
                >
                  Create Project
                </button>
              </li>
              <li>
                <button
                  onClick={handleJoinProject}
                  className="dropdown-item"
                >
                  Join Project
                </button>
              </li>
            </ul>
          )}
        </div>
        <div className="flex flex-col list-none mt-2">
          {error && <div className="text-red-500">{error}</div>}
          {isLoading && <div className="text-gray-500">Loading...</div>}
          {state &&
            state.projects.map((project) => (
              <NavLink
                key={project._id}
                to={`project/${project._id}`}
                className="sidebar-link hover:bg-gray-700 py-2 px-4 rounded-md"
              >
                {project.title}
              </NavLink>
            ))}
        </div>
      </div>
    </>
  );
}
