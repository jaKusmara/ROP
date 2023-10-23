import React from "react";
import { Outlet, useParams } from "react-router-dom";

import ProjectSideMenu from "./ProjectSideMenu";
import Tasks from "./Tasks";
import ProjectDashboard from "./ProjectDashboard";

export default function ProjectHome({
  onShowProjectTasks,
  isProjectTasksOpen,
  onShowProjectDashboard,
  isProjectDashboardOpen,
  projectTasks,
  getTasks,
  onCreateTask,
}) {
  const { projectId, projectTitle } = useParams();

  return (
    <div className="relative z-0 flex flex-col h-full w-full">
      <div className="relative flex h-full">
        <ProjectSideMenu
          projectTitle={projectTitle}
          projectId={projectId}
          onShowProjectTasks={onShowProjectTasks}
          onShowProjectDashboard={onShowProjectDashboard}
          getTasks={getTasks}  // Ensure getTasks is passed to ProjectSideMenu
        />
        {isProjectTasksOpen ? <Tasks projectTasks={projectTasks} onCreateTask={onCreateTask} /> : null}
        {isProjectDashboardOpen ? <ProjectDashboard /> : null}
      </div>
      <Outlet />
    </div>
  );
}

