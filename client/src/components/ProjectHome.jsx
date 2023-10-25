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
  onCreateTask,
  handleLeaveProject,
  onHomeClick,
  sendLeaveData
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
          handleLeaveProject={handleLeaveProject}
          onHomeClick={onHomeClick}
          sendLeaveData={sendLeaveData}
        />
        {isProjectTasksOpen ? <Tasks projectTasks={projectTasks} onCreateTask={onCreateTask}/> : null}
        {isProjectDashboardOpen ? <ProjectDashboard /> : null}
      </div>
      <Outlet />
    </div>
  );
}

