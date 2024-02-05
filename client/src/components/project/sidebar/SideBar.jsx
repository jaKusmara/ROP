import { useEffect, useState } from "react";
import { useProjectContext } from "../../../hooks/useContext/useProjectContext";
import { useFetch } from "../../../hooks/useFetch";
import { NavLink, useNavigate } from "react-router-dom";
import { useChannel } from "../../../hooks/useChannel";
import { useAuthContext } from "../../../hooks/useContext/useAuthContext";
import { useIdContext } from "../../../hooks/useContext/useIdContext";
import { useChannelContext } from "../../../hooks/useContext/useChannelContext";
import { useChat } from "../../../hooks/useChat";
import ChannelList from "./ChannelList";

export default function SideBar() {
  const { state: idContext, dispatch } = useIdContext();
  const { state: channelState } = useChannelContext();
  const { user } = useAuthContext();
  const { state: project } = useProjectContext();

  const navigate = useNavigate();

  const handleSettingsClicked = () => {
    navigate("settings");
  };

  return (
    <>
      <div>{project.loading && project.loading}</div>
      <NavLink to={`/project/${idContext.project_id}`}>
        <li className="text-center p-3 hover:bg-neutral-500 rounded mx-2">
          Dashboard
        </li>
      </NavLink>{" "}
      <NavLink to="tasks">
        <li className="text-center p-3 hover:bg-neutral-500 rounded mx-2">
          Tasks
        </li>
      </NavLink>
      <section className="max-h-[80%] overflow-auto h-full p-2 my-5 mx-5 flex flex-col gap-y-3 ">
        <ChannelList />
      </section>
      <button
        className="text-center p-3 hover:bg-neutral-500 rounded mx-2"
        onClick={handleSettingsClicked}
      >
        Settings
      </button>
    </>
  );
}
