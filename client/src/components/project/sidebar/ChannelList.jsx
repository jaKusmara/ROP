import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useChannelContext } from "../../../hooks/useContext/useChannelContext";
import { useIdContext } from "../../../hooks/useContext/useIdContext";

export default function ChannelList() {
  const { state: idContext, dispatch } = useIdContext();
  const { state: channelState } = useChannelContext();

  const navigate = useNavigate();

  const handleChannelClick = (channel_id) => {
    dispatch({ type: "SET_CHANNEL_ID", payload: channel_id });
    navigate(`channel/${channel_id}`);
  };

  return (
    <>
      {channelState.channels &&
        channelState.channels.map((channel) => (
          <li
            onClick={() => handleChannelClick(channel._id)}
            key={channel._id}
            className="list-none cursor-pointer hover:bg-neutral-500 rounded p-2 "
          >
            # {channel.title}
          </li>
        ))}
    </>
  );
}
