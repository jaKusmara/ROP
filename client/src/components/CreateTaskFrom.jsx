import { useState } from "react";
import { useAuthContext } from "../hooks/useContext/useAuthContext";
import { useToggleFormContext } from "../hooks/useContext/useToggleForm";
import { useTask } from "../hooks/useTask";
import { useBoard } from "../hooks/useBoard";
import { useIdContext } from "../hooks/useContext/useIdContext";

export default function CreateTaskFrom() {
  const { state: idState } = useIdContext();
  const { setLists } = useBoard();
  const { user } = useAuthContext();
  const { createTask } = useTask();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { setBackground, setCreateTask } = useToggleFormContext();

  const handleCreateTask = async () => {
    createTask(
      user,
      idState.list_id,
      idState.board_id,
      title,
      description
    );
    setBackground(false);
    setCreateTask(false);

    setLists(user, idState.board_id);
  };
  const handleCancel = () => {
    setBackground(false);
    setCreateTask(false);
  };

  return (
    <div className="absolute flex flex-col">
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
