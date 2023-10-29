import React from "react";

export default function ShowedTask({
  showedTask,
  projectTitle,
  handleLeaveTask,
}) {
  return (
    <div>
      <div>{showedTask.title}</div>
      <div>{showedTask.description}</div>
      <div>{projectTitle}</div>
      <button onClick={handleLeaveTask}>leave task</button>
    </div>
  );
}
