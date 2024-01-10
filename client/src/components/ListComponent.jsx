import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useToggleFormContext } from "../hooks/useContext/useToggleForm";
import TaskCard from "./project/TaskCard";
import { useBoardContext } from "../hooks/useContext/useBoardContext";
import { useEffect } from "react";
import { useTask } from "../hooks/useTask";
import { useAuthContext } from "../hooks/useContext/useAuthContext";
import { useIdContext } from "../hooks/useContext/useIdContext";

// ... (imports)

export default function ListComponent({ list, tasks }) {
  const { state: idState, dispatch } = useIdContext();
  const { user } = useAuthContext();
  const { getTasks } = useTask();
  const { setBackground, setCreateTask } = useToggleFormContext();

  const handleCreateTask = () => {
    setBackground(true);
    setCreateTask(true);
    dispatch({ type: "SET_LIST_ID", payload: list._id });
  };

  return (
    <div className="border px-2 mx-2 rounded-md bg-gray-800 h-fit w-80 whitespace-wrap break-all self-start">
      <nav className="flex flex-row">
        <button onClick={handleCreateTask}>
          <AddIcon />
        </button>
        <h2 className="w-full text-center">{list.title}</h2>
        <EditIcon />
      </nav>
      <div className="whitespace-wrap break-all max-h-96">
        {tasks && tasks.map((task) => <TaskCard key={task._id} task={task} />)}
      </div>
    </div>
  );
}
