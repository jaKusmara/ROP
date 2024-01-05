import { useState, useEffect } from "react";
import { useTask } from "../../hooks/useTask";
import { useAuthContext } from "../../hooks/useContext/useAuthContext";
import { useToggleFormContext } from "../../hooks/useContext/useToggleForm";
import { useIdContext } from "../../hooks/useContext/useIdContext";

export default function TaskCard({ task }) {
  const [taskId, setTaskId] = useState(null);
  const { getTask } = useTask();
  const { user } = useAuthContext();
  const { state, dispatch } = useIdContext();
  const { setBackground, background, setShowTask, showTask } =
    useToggleFormContext();

  useEffect(() => {
    if (taskId) {
      dispatch({ type: "SET_TASK_ID", payload: taskId });
      setBackground(!background);
      setShowTask(!showTask);
    }

    if (state.taskId) {
      console.log(state);
      getTask(user, state.taskId);
    }
    
    setTaskId(null);
  }, [user, taskId, state]);

  const handleOnTaskClick = () => {
    setTaskId(task._id);
    console.log(taskId);
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
