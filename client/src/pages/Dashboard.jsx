import { useEffect, useState } from "react";
import { useBoardContext } from "../hooks/useContext/useBoardContext";
import { useTask } from "../hooks/useTask";
import { useAuthContext } from "../hooks/useContext/useAuthContext";
import TaskCard from "../components/home/TaskCard";
import { useProject } from "../hooks/useProject";

export default function Dashboard() {
  const { user } = useAuthContext();
  const { state: boardState } = useBoardContext();
  const { getUserTasks } = useTask();
  const { createProject, joinProject } = useProject();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [connString, setConnString] = useState("");

  useEffect(() => {
    getUserTasks(user);
  }, []);

  return (
    <>
      <section className="w-[75%] max-h-full overflow-auto">
        <h2 className="w-full text-4xl p-3">Your Tasks:</h2>
        <div className="grid grid-cols-4 max-w-full   flex-wrap md:gap-5 md:m-5">
          {boardState.tasks &&
            boardState.tasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
        </div>
      </section>

      <aside className="w-[25%] bg-neutral-950 flex flex-col justify-around">
        <div className="flex flex-col p-3 rounded gap-y-4 ">
          <h2 className="text-3xl text-center">Create Project</h2>
          <label className="text-xl">Project title</label>
          <input
            type="text"
            maxLength="50"
            className="w-full text-black rounded h-10 p-1"
            placeholder="Project title..."
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="text-xl" htmlFor="project-description">
            Project description
          </label>
          <textarea
            name=""
            maxLength="250"
            id="project-description"
            className="text-black w-full rounded block h-20 resize-none p-1"
            placeholder="Project description..."
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <button
            onClick={() => {
              createProject(user, title, desc);
            }}
            className="rounded bg-purple-500 p-1 py-2 text-xl md:text-base px-3 self-end"
          >
            Create Project
          </button>
        </div>
        <hr />
        <div className="flex flex-col p-3 rounded gap-y-4 ">
          <h2 className="text-3xl text-center">Join Project</h2>
          <label className="text-xl">Connection string</label>
          <input
            maxLength="50"
            placeholder="Connection string..."
            type="text"
            className="text-black rounded h-10 p-1"
            onChange={(e) => setConnString(e.target.value)}
          />
          <button
            onClick={() => {
              joinProject(user, connString);
            }}
            className="rounded bg-purple-500 p-1 py-2 text-xl md:text-base px-3  self-end"
          >
            Join Project
          </button>
        </div>
      </aside>
    </>
  );
}
