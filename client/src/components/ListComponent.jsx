import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useToggleFormContext } from "../hooks/useContext/useToggleForm";
import TaskCard from "./project/TaskCard";

export default function ListComponent({ item }) {
  const { setBackground, setCreateTask } = useToggleFormContext();

  const handleCreateTask = () => {
    setBackground(true);
    setCreateTask(true);
    localStorage.setItem("list_id", JSON.stringify(item._id));
  };

  return (
    <div className="border px-2 mx-2 rounded-md bg-gray-800 h-fit w-80 whitespace-wrap break-all self-start">
      <nav className="flex flex-row">
        <AddIcon />
        <h2 className="w-full text-center">{item.title}</h2>
        <EditIcon />
      </nav>
      <div className="whitespace-wrap break-all max-h-96">
        {item.tasks_id &&
          item.tasks_id.map((task) => <TaskCard key={task._id} task={task} />)}
      </div>
    </div>
  );
}
