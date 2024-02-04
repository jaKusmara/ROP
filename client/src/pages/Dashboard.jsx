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
      <h2 className="w-full text-4xl p-3">Your Tasks:</h2>
      <div className="grid grid-cols-4 max-w-full max-h-full overflow-auto flex-wrap md:gap-5 md:m-5">
        {boardState.tasks &&
          boardState.tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
      </div>
    </>
  );
}
