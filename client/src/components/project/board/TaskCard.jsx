import { useState, useEffect } from "react";
import { useTask } from "../../../hooks/useTask";
import { useAuthContext } from "../../../hooks/useContext/useAuthContext";
import { useToggleFormContext } from "../../../hooks/useContext/useToggleForm";
import { useIdContext } from "../../../hooks/useContext/useIdContext";
import socket from "../../../utils/socekt";

export default function TaskCard({ task }) {
  const { getTask } = useTask();
  const { user } = useAuthContext();
  const { state, dispatch } = useIdContext();
  const { task: toggleTask, setTask: setToggleTask } = useToggleFormContext();
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



  return (
    <div className="rounded-md break-all  bg-neutral-800 m-4 p-3 shadow-lg shadow-neutral-900">
      {task && (
        <div
          onClick={() => {
            dispatch({ type: "SET_TASK_ID", payload: task._id });
            setToggleTask(!toggleTask);
          }}
        >
          <h2 className="md:text-base text-lg">{task.title}</h2>
          
        </div>
      )}
    </div>
  );
}
