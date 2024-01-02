import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
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
    <div className="border px-2 mx-2 rounded-md bg-gray-800 h-fit">
      <nav className="flex flex-row">
        <h2 onClick={handleCreateTask}>+</h2>
        <h2 className="w-full text-center">{item.title}</h2>
        <span className="">
          <SettingsIcon />
        </span>
      </nav>
      {item.tasks_id &&
        item.tasks_id.map((task) => <TaskCard key={task._id} task={task} />)}
    </div>
  );
}
