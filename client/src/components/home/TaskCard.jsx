//ROUTER
import { useNavigate } from "react-router-dom";

export default function TaskCard({ task }) {
  const navigate = useNavigate();
  return (
    <div className="bg-neutral-700 md:rounded flex flex-col md:gap-2 md:p-3 md:w md:h-56">
      <h2 className="font-bold text-2xl w-full">
        {task.title.substring(0, 26)}
      </h2>
      <h1 className="text-neutral-400 text-sm">
        {task.project_title}/{task.list_title}
      </h1>
      <section className="break-all h-full">
        {task.description.substring(0, 70)}
      </section>
      <footer className="self-end justify-items-end">
        <button
          className="rounded bg-purple-500 p-1 px-3"
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
