import { useProject } from "../../hooks/useProject";
import { useAuthContext } from "../../hooks/useContext/useAuthContext";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const { user } = useAuthContext();
  const { leaveProject, deleteProject } = useProject();
  const navigate = useNavigate();
  const project_id = JSON.parse(localStorage.getItem("project_id"));

  const handleLeaveProjectClick = () => {
    leaveProject(user, project_id);
    navigate("/");
  };

  const handleDeleteProjectClick = () => {
    deleteProject(user, project_id);
    navigate("/");
  };

  return (
    <div>
      <button
        onClick={handleLeaveProjectClick}
        className="p-1 bg-red-600 rounded-md"
      >
        Leave Project
      </button>
      <button
        onClick={handleDeleteProjectClick}
        className="p-1 bg-red-600 rounded-md"
      >
        Delete Project
      </button>
    </div>
  );
}
