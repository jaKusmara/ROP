import { useState } from "react";
import { useAuthContext } from "../hooks/useContext/useAuthContext";
import { useToggleFormContext } from "../hooks/useContext/useToggleForm";
import { useTask } from "../hooks/useTask";
import { useTaskContext } from "../hooks/useContext/useTaskContext";
import { useList } from "../hooks/useList";

export default function CreateTaskFrom() {
  const { setLists } = useList();
  const { user } = useAuthContext();
  const { createTask } = useTask();
  const [title, setTitle] = useState("");
  const { state } = useTaskContext();
  const [description, setDescription] = useState("");
  const { setBackground, setCreateTask } = useToggleFormContext();

  const handleCreateTask = async () => {
    const list_id = JSON.parse(localStorage.getItem("list_id"));
    await createTask(user, list_id, title, description);
    setBackground(false);
    setCreateTask(false);
    const board_id = JSON.parse(localStorage.getItem("board_id"));
    setLists(user, board_id);
  };

  const handleCancel = () => {
    setBackground(false);
    setCreateTask(false);
  };

  return (
    <div className="flex flex-col">
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

      <button onClick={handleCreateTask}>create task</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
}
