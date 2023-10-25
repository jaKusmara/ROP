import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import SpaceDashboardRoundedIcon from "@mui/icons-material/SpaceDashboardRounded";

export default function SideMenu({
  onChatClick,
  onHomeClick,
  onCreateProjectClick,
  onAddProjectClick,
  isAddProjectClicked,
  userProjects,
  onOpenProjectClick,
  onJoinProjectClick,

}) {
  
  const handleCreateProject = () => {
    onAddProjectClick()
  }

  const handleJoinProject = () => {
    onJoinProjectClick()
  }




  return (
    <aside className="flex flex-col gap-y-3 p-2 w-[5%] bg-slate-500 items-center pt-4">
      <span className="cursor-pointer" onClick={onHomeClick}>
        <Link to={`/`}>
          <SpaceDashboardRoundedIcon />
        </Link>
      </span>
      <span className="cursor-pointer" onClick={onChatClick}>
        <Link to={`/chats/`}>Chats</Link>
      </span>
      <span className="flex flex-row justify-between">
        <div className="cursor-pointer items-end" onClick={onAddProjectClick}>
          +
          {isAddProjectClicked ? (
            <>
              <div onClick={handleCreateProject} className="absolute inset-0"></div>
              <ul className="absolute flex flex-col mt-2 bg-gray-700/95 p-2 rounded text-white">
                <li onClick={onCreateProjectClick} className="cursor-pointer opacity">
                  Create Project
                </li>
                <li onClick={handleJoinProject} className="cursor-pointer">
                  Join Project
                </li>
              </ul>
            </>
          ) : null}
        </div>
      </span>
      {userProjects.map((project) => (
    <li
      className="list-none"
      onClick={() => onOpenProjectClick(project._id, project.title)}
      key={project._id}
    >
      <Link to={`/project/${project.title}/${project._id}/dashboard`}>
        {project.title}
      </Link>
    </li>
  ))}
    </aside>
  );
}
