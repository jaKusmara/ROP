import { useState, useEffect } from "react";
import { useTask } from "../../hooks/useTask";
import { useAuthContext } from "../../hooks/useContext/useAuthContext";
import { useToggleFormContext } from "../../hooks/useContext/useToggleForm";

export default function TaskCard({ task }) {
  const [taskId, setTaskId] = useState(null);
  const { getTask } = useTask();
  const { user } = useAuthContext();
  const { setBackground, background, setShowTask, showTask } =
    useToggleFormContext();

  useEffect(() => {
    if (taskId) {
      getTask(user, taskId);
      setBackground(!background);
      setShowTask(!showTask);
    }
    setTaskId(null);
  }, [user, taskId]);

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
