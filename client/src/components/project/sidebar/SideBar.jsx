import { useEffect, useState } from "react";
import { useProjectContext } from "../../../hooks/useContext/useProjectContext";
import { useFetch } from "../../../hooks/useFetch";
import { NavLink, useNavigate } from "react-router-dom";
import { useChannel } from "../../../hooks/useChannel";
import { useAuthContext } from "../../../hooks/useContext/useAuthContext";
import { useIdContext } from "../../../hooks/useContext/useIdContext";
import { useChannelContext } from "../../../hooks/useContext/useChannelContext";
import { useChat } from "../../../hooks/useChat";

export default function SideBar() {
  const { state: idContext, dispatch } = useIdContext();
  const { state: channelState } = useChannelContext();
  const { user } = useAuthContext();
  const { state: project } = useProjectContext();
  const [channels, setChannels] = useState(null);
  const { getChannel } = useChannel();

  const navigate = useNavigate();

  const handleChannelClick = (channel_id) => {
    dispatch({ type: "SET_CHANNEL_ID", payload: channel_id });
    navigate(`channel/${channel_id}`);
  };

  const handleSettingsClicked = () => {
    navigate("settings");
  };

  return (
    <div className="flex flex-col max-w-80">
      <div>
        {project.project && <div>{project.project.title}</div>}
        {project.data && project.data.title}
        {project.loading && project.loading}
      </div>
      <div>
        <NavLink to={`/project/${idContext.project_id}`}>Dashboard</NavLink>
      </div>
      <div>
        <NavLink to="tasks">Tasks</NavLink>
      </div>
      <div>Channels:</div>
      {channelState.channels &&
        channelState.channels.map((channel) => (
          <li
            onClick={() => handleChannelClick(channel._id)}
            key={channel._id}
            className="list-none"
          >
            {channel.title}
          </li>
        ))}

      {/* {loading && loading} */}
      {/* {error && error} */}
      <button onClick={handleSettingsClicked}>Settings</button>
    </div>
  );
}
