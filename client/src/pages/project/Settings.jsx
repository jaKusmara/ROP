import { useProject } from "../../hooks/useProject";
import { useAuthContext } from "../../hooks/useContext/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useChannelContext } from "../../hooks/useContext/useChannelContext";
import { useState } from "react";
import { useIdContext } from "../../hooks/useContext/useIdContext";
import { useChannel } from "../../hooks/useChannel";

export default function Settings() {
  const { state: channelContext } = useChannelContext();
  const { state: idContext } = useIdContext();
  const { user } = useAuthContext();
  const { leaveProject, deleteProject } = useProject();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const { createChannel } = useChannel();

  const handleLeaveProjectClick = () => {
    leaveProject(user, idContext.project_id);
    navigate("/");
  };

  const handleDeleteProjectClick = () => {
    deleteProject(user, idContext.project_id);
    navigate("/");
  };

  const handleOnClick = () => {
    createChannel(user, idContext.project_id, title);
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
      <hr />
      <section>
        <nav>
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={handleOnClick}>Create Channel</button>
        </nav>
        {channelContext.channels &&
          channelContext.channels.map((channel) => (
            <div key={channel._id}>{channel.title}</div>
          ))}
      </section>
    </div>
  );
}
