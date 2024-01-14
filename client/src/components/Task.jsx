import { useState, useEffect } from "react";
import ShowLabels from "./ShowLabels";
import { useBoardContext } from "../hooks/useContext/useBoardContext";
import { useToggleFormContext } from "../hooks/useContext/useToggleForm";
import { useTask } from "../hooks/useTask";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import LabelIcon from "@mui/icons-material/Label";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useAuthContext } from "../hooks/useContext/useAuthContext";
import { useIdContext } from "../hooks/useContext/useIdContext";
import avatar from "../assets/user.png";
import socket from "../utils/socekt";
import MoveTask from "./MoveTask";

export default function Task() {
  const { state } = useBoardContext();
  const { state: idState } = useIdContext();
  const { user } = useAuthContext();
  const { background, setBackground, showTask, setShowTask } =
    useToggleFormContext();
  const {
    updateTask,
    getTaskParticipants,
    deleteTask,
    leaveTask,
    joinTask,
    isLoading,
    error,
  } = useTask();
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [labels, setLabels] = useState(false);
  const [move, setMove] = useState(false);

  const [socketData, setSocketData] = useState();
  const [updateTaskSocket, setUpdateTask] = useState();

  const taskTitle = state.task ? state.task.title : "";
  const taskDescription = state.task ? state.task.description : "";

  useEffect(() => {
    socket.on("tasks_refresh", (data) => {
      setSocketData(data);
    });

    socket.on("task_refresh", (data) => {
      setUpdateTask(data);
    });

    return () => {
      socket.off("tasks_refresh");
    };
  });

  useEffect(() => {
    getTaskParticipants(user, idState.task_id);
  }, [user, idState.task_id, updateTaskSocket]);

  const handleOnCancelClick = () => {
    setBackground(!background);
    setShowTask(!showTask);
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
    setEditedTitle(taskTitle);
    setEditedDescription(taskDescription);
  };

  const handleSaveClick = () => {
    updateTask(
      user,
      idState.task_id,
      editedTitle,
      editedDescription,
      idState.board_id
    );
    setEditMode(!editMode);
  };

  const handleJoinTask = () => {
    joinTask(user, idState.task_id, idState.board_id);
  };

  const handleLeaveTask = () => {
    leaveTask(user, idState.task_id, idState.board_id);
  };

  const handleDeleteTask = () => {
    deleteTask(user, idState.task_id, idState.board_id);
    setBackground(!background);
    setShowTask(!showTask);
  };

  const handleOnLabels = () => {
    setLabels(!labels);
  };

  const handleMove = () => {
    setMove(!move);
  };

  return (
    <div className="w-full h-full flex flex-row">
      <div className="flex flex-col h-96 w-96 bg-gray-600 break-all p-4 space-x-4">
        <div className="flex flex-row">
          <section className="flex flex-col flex-1">
            {isLoading && <div className="text-white">Loading...</div>}
            {error && <div className="text-red-500">Error: {error}</div>}
            {state.task && (
              <div>
                {editMode ? (
                  <>
                    <input
                      type="text"
                      className="mb-2 p-2 rounded-md w-full"
                      placeholder="Task Title"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <textarea
                      className="mb-2 p-2 rounded-md w-full"
                      placeholder="Task Description"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <h2 className="text-white text-xl font-semibold mb-2">
                      {state.task.title}
                    </h2>
                    <div className="text-white">{state.task.description}</div>
                  </>
                )}
              </div>
            )}
          </section>

          <nav className="flex flex-col items-end justify-start space-y-2">
            {editMode ? (
              <button className="text-white" onClick={handleSaveClick}>
                Save
                <SaveIcon />
              </button>
            ) : (
              <button className="text-white" onClick={handleEditClick}>
                Edit
                <EditIcon />
              </button>
            )}
            {state.participants.includes(user.user._id) ? (
              <button onClick={handleLeaveTask}>
                Leave Task <LogoutIcon />
              </button>
            ) : (
              <button onClick={handleJoinTask}>
                Join Task <ControlPointIcon />
              </button>
            )}

            <button className="" onClick={handleOnLabels}>
              Labels <LabelIcon />
            </button>

            <button className="" onClick={handleMove}>
              Move <ArrowForwardIcon />
            </button>

            <button className="text-white" onClick={handleDeleteTask}>
              Delete Task <DeleteIcon />
            </button>
            <button className="text-white" onClick={handleOnCancelClick}>
              Cancel
            </button>
          </nav>
        </div>
        <footer>
          <ul className="mt-4">
            {isLoading && <div>loading...</div>}
            {state.participants &&
              state.participants.map((participant) => (
                <li key={participant} className="mr-2">
                  <img
                    src={avatar}
                    alt="User Avatar"
                    className="w-6 h-6 rounded-full"
                  />
                </li>
              ))}
          </ul>
        </footer>
      </div>
      {labels ? <ShowLabels /> : null}
      {move ? <MoveTask/> : null}
    </div>
  );
}
