import React, {useState} from "react";
import { Link } from "react-router-dom";

import TaskIcon from "@mui/icons-material/Task";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import AssessmentIcon from "@mui/icons-material/Assessment";

export default function ProjectSideMenu({
  projectTitle,
  projectId,
  onShowProjectTasks,
  onShowProjectDashboard,
  handleLeaveProject,
  onHomeClick,
  sendLeaveData
}) {

  const handleTasksClick = () => {
    onShowProjectTasks();
  };

  const handleLeaveClick = () => {
    handleLeaveProject()
    onHomeClick()
  }

  return (
    <aside className="flex flex-col gap-y-3 p-2 w-1/5 bg-slate-400 items-center pt-4">
      <span>{projectTitle}</span>
      <div onClick={onShowProjectDashboard}>
        <Link to={`/project/${projectTitle}/${projectId}/dashboard`}>
          <AssessmentIcon />
          Dashboard
        </Link>
      </div>
      <div onClick={handleTasksClick}>
        <Link to={`/project/${projectTitle}/${projectId}/tasks`}>
          <TaskIcon />
          Tasks
        </Link>
      </div>
      <div>
        <GroupIcon />
        Members
      </div>
      
      <div>channels</div>
      <span>
        <button onClick={handleLeaveClick}><Link to={`/`}>Leave Project</Link></button>
<div>
        <SettingsIcon />
        Settings
      </div>
      </span>
    </aside>
  );
}
