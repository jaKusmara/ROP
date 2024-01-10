import { useState, useEffect } from "react";
import { useTask } from "../../hooks/useTask";
import { useAuthContext } from "../../hooks/useContext/useAuthContext";
import { useToggleFormContext } from "../../hooks/useContext/useToggleForm";
import { useIdContext } from "../../hooks/useContext/useIdContext";
import socket from "../../utils/socekt";

export default function TaskCard({ task }) {
  const { getTask } = useTask();
  const { user } = useAuthContext();
  const { state, dispatch } = useIdContext();
  const { setBackground, background, setShowTask, showTask } =
    useToggleFormContext();
  const [socketData, setSocketData] = useState(null);
  const [updateTask, setUpdateTask] = useState(null);

  useEffect(() => {
    socket.on("tasks_refresh", (data) => {
      setSocketData(data);
    });

    socket.on("task_refresh", (data) => {
      setUpdateTask(data);
    });
  }, [socketData]);

  useEffect(() => {
    if (state.task_id) {
      getTask(user, state.task_id);
    }
  }, [updateTask, user, state.task_id]);

  const handleOnTaskClick = () => {
    dispatch({ type: "SET_TASK_ID", payload: task._id });
    setBackground(!background);
    setShowTask(!showTask);
  };

  return (
    <div className="border rounded-md my-2 bg-gray-700 p-2">
      {task && (
        <div onClick={handleOnTaskClick}>
          <h2 className="text-center text-md">{task.title}</h2>
          <div className="text-sm">{task.description}</div>
        </div>
      )}
    </div>
  );
}
