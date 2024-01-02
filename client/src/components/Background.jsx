import { useToggleFormContext } from "../hooks/useContext/useToggleForm";

import CreateTaskFrom from "./CreateTaskFrom";
import CreateListForm from "./CreateListForm";
import CreateProjectForm from "./CreateProjectForm";
import JoinProjectForm from "./JoinProjectForm";

export default function Background() {
  const { createTask, createList, createProject, joinProject } =
    useToggleFormContext();

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-0">
      {createTask ? <CreateTaskFrom /> : null}
      {createList ? <CreateListForm /> : null}
      {joinProject ? <JoinProjectForm /> : null}
      {createProject ? <CreateProjectForm /> : null}
    </div>
  );
}
