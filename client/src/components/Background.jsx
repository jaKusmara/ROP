import { useToggleFormContext } from "../hooks/useContext/useToggleForm";

import CreateProjectForm from "./CreateProjectForm";
import JoinProjectForm from "./JoinProjectForm";
import Task from "./project/board/Task";

export default function Background() {
  const { createProject, joinProject, showTask } = useToggleFormContext();

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-100 w-full h-full">
      {joinProject ? <JoinProjectForm /> : null}
      {createProject ? <CreateProjectForm /> : null}
      {showTask ? <Task /> : null}
    </div>
  );
}
