import { NavLink } from "react-router-dom";
import { useProjectContext } from "../hooks/useContext/useProjectContext";
import { useProject } from "../hooks/useProject";
import { useAuthContext } from "../hooks/useContext/useAuthContext";
import { useEffect, useState } from "react";
import {
  TEDropdown,
  TEDropdownToggle,
  TEDropdownMenu,
  TEDropdownItem,
} from "tw-elements-react";
import { useToggleFormContext } from "../hooks/useContext/useToggleForm";

export default function SideBar() {
  const { user } = useAuthContext();
  const { state } = useProjectContext();
  const { setProjects, error, isLoading } = useProject();
  const [sideDropdown, setSideDropdown] = useState(false);

  const { setCreateProject, setJoinProject, setBackground, background } =
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
      <div className="flex flex-col">
        <span>
          <NavLink to="/">Dashboard</NavLink>
        </span>
        <span>
          <NavLink to="messages">Messages</NavLink>
        </span>
      </div>
      <div>
        <div className="flex flex-col border-t p-1">
          <span className="flex flex-row justify-between">
            <h2 className="text-lg font-semibold">Projects</h2>
            <button
              onClick={handlePlusClick}
              className="flex items-center whitespace-nowrap px-3 py-1.5 text-xs font-medium uppercase leading-normal text-white shadow-sm transition duration-150 ease-in-out"
            >
              +
            </button>
          </span>

          {sideDropdown ? (
            <ul className="">
              <li>
                <NavLink>
                  <button
                    onClick={handleCreateProject}
                    className="block w-full min-w-sm cursor-pointer whitespace-nowrap bg-transparent px-4 py-2 text-sm text-left font-normal pointer-events-auto text-gray-700 hover:bg-gray-100 active:text-gray-800 active:bg-gray-100 focus:bg-gray-100 focus:text-gray-800 focus:outline-none active:no-underline dark:text-gray-200 dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:active:bg-gray-600"
                  >
                    Create Project
                  </button>
                </NavLink>
              </li>
              <li>
                <NavLink>
                  <button
                    onClick={handleJoinProject}
                    className="block w-full min-w-sm cursor-pointer whitespace-nowrap bg-transparent px-4 py-2 text-sm text-left font-normal pointer-events-auto text-gray-700 hover:bg-gray-100 active:text-gray-800 active:bg-gray-100 focus:bg-gray-100 focus:text-gray-800 focus:outline-none active:no-underline dark:text-gray-200 dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:active:bg-gray-600"
                  >
                    Join Project
                  </button>
                </NavLink>
              </li>
            </ul>
          ) : null}
        </div>
        <div className="flex flex-col list-none mt-2">
          {error && <div className="text-red-500">{error}</div>}
          {isLoading && <div className="text-gray-500">Loading...</div>}
          {state &&
            state.projects.map((project) => (
              <li key={project._id}>
                <NavLink to={`project/${project._id}`}>{project.title}</NavLink>
              </li>
            ))}
        </div>
      </div>
    </>
  );
}
