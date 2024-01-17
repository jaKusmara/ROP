//ROUTER
import { useNavigate } from "react-router-dom";

//TAILWIND COMPONENTS
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function TaskCard({ task }) {
  const navigate = useNavigate();
  return (
    <div className="bg-zinc-500 h-52 w-52 rounded p-2 flex flex-col ">
      <h2 className="font-bold text-2xl">{task.title}</h2>
      <h1 className="text-zinc-600 text-sm">
        {task.project_title}/{task.list_title}
      </h1>
      <section>{task.description}</section>
      <footer className="self-end justify-items-end">
        <button
          className="rounded bg-violet-950 p-1"
          onClick={() => {
            navigate(`project/${task.project_id}/tasks`);
          }}
        >
          Show
        </button>
      </footer>
    </div>
  );
}
