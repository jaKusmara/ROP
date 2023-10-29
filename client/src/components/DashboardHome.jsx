import React from "react";
import { Link } from "react-router-dom";

import ProjectCard from './ProjectCard'

export default function DashboardHome({ userProjects, userTasks, onOpenProjectClick, onShowedTask }) {
  return (
    <div className="flex flex-col">
      <span>
        <h1>Your Projects</h1>
        <span className="flex flex-row">
          {userProjects.map((project) => (
            <li
              className="list-none"
              onClick={() => onOpenProjectClick(project._id, project.title)}
              key={project._id}
            >
              <Link to={`/project/${project.title}/${project._id}/dashboard`}>
              <ProjectCard project={project}/>
              </Link>
              
            </li>
          ))}
        </span>
      </span>
      <span>
        <h1>Your tasks</h1>
        <span>{userTasks.map((task) => (
            <li
              className="list-none"
              key={task._id}
              onClick={() => {onShowedTask(task._id, task.title)}}
            >
             {task.title}
              
            </li>
          ))}</span>
      </span>
    </div>
  );
}
