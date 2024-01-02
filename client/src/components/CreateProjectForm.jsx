import { useState } from "react";
import { useProject } from "../hooks/useProject";
import { useAuthContext } from "../hooks/useContext/useAuthContext";
import { useToggleFormContext } from "../hooks/useContext/useToggleForm";

export default function CreateProjectForm() {
  const [title, setTitle] = useState("");
  const { createProject } = useProject();
  const { user } = useAuthContext();
  const { setCreateProject, setBackground } = useToggleFormContext();

  const handleCreateClick = () => {
    createProject(user, title);
    setCreateProject(false)
    setBackground(false)
  };

  
  const handlecancelClick = () => {
    setBackground(false);
   };

  return (
    <div className="flex flex-col z-50 bg-gray-600">
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleCreateClick}>Create!</button>
      <button onClick={handlecancelClick}>Cancel</button>
    </div>
  );
}
