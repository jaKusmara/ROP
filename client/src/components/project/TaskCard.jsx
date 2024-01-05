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

  useEffect(() => {
    socket.on("tasks_refresh", (data) => {
      setSocketData(data);
    });

    if (state.taskId) {
      getTask(user, state.taskId);
      setBackground(!background);
      setShowTask(!showTask);
    }
  }, [user, state, socketData]);

  const handleOnTaskClick = () => {
    dispatch({ type: "SET_TASK_ID", payload: task._id });
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
