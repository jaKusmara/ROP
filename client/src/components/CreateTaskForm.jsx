import React, { useState } from "react";
import { createTask } from "../controllers/taskController/createTask";

export default function CreateTaskForm({
  onCreateTaskClick,
  sendDataToCreateTask,
  projectId,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateTask = async () => {
    const newTaskData = {
      title,
      description,
      project_id: projectId,
    };
    sendDataToCreateTask(newTaskData)
  };
  

  return (
    <div>
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        name="description"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={onCreateTaskClick}>cancel</button>
      <button onClick={handleCreateTask}>create task</button>
    </div>
  );
}
