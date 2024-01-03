import { useEffect, useState } from "react";
import { useProjectContext } from "../../hooks/useContext/useProjectContext";
import { useFetch } from "../../hooks/useFetch";
import { NavLink, useNavigate } from "react-router-dom";
import { useChannel } from "../../hooks/useChannel";
import { useAuthContext } from "../../hooks/useContext/useAuthContext";
import { useChat } from "../../hooks/useChat";

export default function SideBar() {
  const { user } = useAuthContext();
  const { state: project } = useProjectContext();
  const [channels, setChannels] = useState(null);
  const { getChannel } = useChannel();
  const {openChat} = useChat()

  const project_id = JSON.parse(localStorage.getItem("project_id"));
  const navigate = useNavigate()

  const {
    data: res,
    error,
    loading,
  } = useFetch(
    `http://localhost:5000/api/project/getAllProjectChannels?project_id=${project_id}`
  );

  useEffect(() => {
    if (res) {
      setChannels(res);
    }
  }, [res, error, loading]);

  const handleChannelClick = (channel_id) => {
    localStorage.setItem("c_id", JSON.stringify(channel_id));
    getChannel(user, channel_id);
    navigate(`channel/${channel_id}`)
  };

  const handleSettingsClicked = () => {
    navigate("settings")
  }

  return (
    <div className="flex flex-col max-w-80">
      <div>
        {project.data && project.data.title}
        {project.loading && project.loading}
      </div>
      <div>
        <NavLink to={`/project/${project_id}`}>Dashboard</NavLink>
      </div>
      <div>
        <NavLink to="tasks">Tasks</NavLink>
      </div>
      <div>Channels:</div>
      {channels &&
        channels.map((channel) => (
          <li
            onClick={() => handleChannelClick(channel._id)}
            key={channel._id}
            className="list-none"
          >
            {channel.title}
          </li>
        ))}

      {loading && loading}
      {error && error}
      <button onClick={handleSettingsClicked}>Settings</button>
    </div>
  );
}
