import { useState } from "react";
import { useTaskContext } from "../hooks/useContext/useTaskContext";
import { useToggleFormContext } from "../hooks/useContext/useToggleForm";
import { useTask } from "../hooks/useTask";
import EditIcon from "@mui/icons-material/Edit";
import { useAuthContext } from "../hooks/useContext/useAuthContext";
import { useIdContext } from "../hooks/useContext/useIdContext";

export default function Task() {
  const { state } = useTaskContext();
  const { state: idState, dispatch } = useIdContext();
  const { user } = useAuthContext();
  const { background, setBackground, showTask, setShowTask } =
    useToggleFormContext();
  const { updateTask, isLoading, error } = useTask();
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  const taskTitle = state.task ? state.task.title : "";
  const taskDescription = state.task ? state.task.description : "";

  const handleOnCancelClick = () => {
    setBackground(!background);
    setShowTask(!showTask);
  };

  const handleEditClick = () => {
    setEditMode(true);
    setEditedTitle(taskTitle);
    setEditedDescription(taskDescription);
  };

  const handleSaveClick = () => {
    const board_id = JSON.parse(localStorage.getItem("board_id"));
    updateTask(user, idState.taskId, editedTitle, editedDescription, board_id);
    setEditMode(false);
  };

  return (
    <div className="flex flex-col h-96 w-96 bg-gray-600 break-all">
      {isLoading && <div className="text-white">Loading...</div>}
      {error && <div className="text-red-500">Error: {error}</div>}
      {state.task && (
        <div className="p-4">
          {editMode ? (
            <>
              <input
                type="text"
                className="w-full mb-4 p-2 bg-gray-800 text-white"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <textarea
                className="w-full mb-4 p-2 bg-gray-800 text-white"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            </>
          ) : (
            <>
              <h2 className="text-xl mb-2">{state.task.title}</h2>
              <div className="text-gray-300">{state.task.description}</div>
            </>
          )}
          <button
            className="bg-gray-800 text-white py-2 px-4 mt-2 mr-2 hover:bg-gray-700"
            onClick={handleOnCancelClick}
          >
            Cancel
          </button>
          {!editMode && (
            <EditIcon
              className="text-white cursor-pointer"
              onClick={handleEditClick}
            />
          )}
          {editMode && (
            <button
              className="bg-blue-500 text-white py-2 px-4 mt-2 hover:bg-blue-400"
              onClick={handleSaveClick}
            >
              Save
            </button>
          )}
        </div>
      )}
    </div>
  );
}
