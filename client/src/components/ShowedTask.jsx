import React from "react";

export default function ShowedTask({
  showedTask,
  project,
  handleLeaveTask,
}) {
  return (
    <div>
      <div>{showedTask.title}</div>
      <div>{showedTask.description}</div>
      <div>{project.title}</div>
      <button onClick={handleLeaveTask}>leave task</button>
    </div>
  );
}
