import { useEffect } from "react";
import { useBoardContext } from "../hooks/useContext/useBoardContext";
import { useTask } from "../hooks/useTask";
import { useAuthContext } from "../hooks/useContext/useAuthContext";
import TaskCard from "../components/home/TaskCard";

export default function Dashboard() {
  const { user } = useAuthContext();
  const { state: boardState } = useBoardContext();
  const { getUserTasks } = useTask();

  useEffect(() => {
    getUserTasks(user);
  }, []);

  return (
    <>
      <div className="flex flex-row">
        {boardState.tasks &&
          boardState.tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
      </div>
    </>
  );
}
