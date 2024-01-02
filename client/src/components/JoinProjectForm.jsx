import { useToggleFormContext } from "../hooks/useContext/useToggleForm";
import { useState } from "react";
import { useProject } from "../hooks/useProject";
import { useAuthContext } from "../hooks/useContext/useAuthContext";

export default function JoinProjectForm() {
  const [connectionString, setConnectionString] = useState("");
  const { joinProject } = useProject();
  const { user } = useAuthContext();
  const { setJoinProject, setBackground } = useToggleFormContext();

  const handleJoinClick = () => {
    joinProject(user, connectionString);
    setJoinProject(false);
    setBackground(false);
  };

  const handlecancelClick = () => {
    setBackground(false);
  };
  return (
    <div className="flex flex-col z-50 bg-gray-600">
      <input
        type="text"
        name="connectionString"
        placeholder="setConnectionString"
        value={connectionString}
        onChange={(e) => setConnectionString(e.target.value)}
      />
      <button onClick={handleJoinClick}>Join!</button>
      <button onClick={handlecancelClick}>Cancel</button>
    </div>
  );
}
