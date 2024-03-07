import { Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useContext/useAuthContext";
import { useChannel } from "../hooks/useChannel";
import { useIdContext } from "../hooks/useContext/useIdContext";
import { useBoard } from "../hooks/useBoard";
import { useTask } from "../hooks/useTask";
import socket from "../utils/socekt";
import { useProject } from "../hooks/useProject";

import SideBar from "../components/project/sidebar/SideBar";
import { useBoardContext } from "../hooks/useContext/useBoardContext";
import { useProjectContext } from "../hooks/useContext/useProjectContext";
import { useChannelContext } from "../hooks/useContext/useChannelContext";

export default function ProjectLayout() {
  const { user } = useAuthContext();
  const { project_id } = useParams();

  const { getProjectChannels } = useChannel();
  const { setProject } = useProject();

  const { setLists, error: listError, isLoading: listLoading } = useBoard();
  const { getTasks, error: taskError, isLoading: taskIsLoading } = useTask();

  const [socketData, setSocketData] = useState(null);
  const [updateTask, setUpdateTask] = useState(null);

  const { state: idState, dispatch: idDispatch } = useIdContext();
  const { dispatch: listContextDisp } = useBoardContext();
  const { dispatch: projectDispatch } = useProjectContext();
  const { dispatch: channelDispatch } = useChannelContext();

  //PREMAZANIE

  useEffect(() => {
    listContextDisp({ type: "SET_LISTS", payload: [] });
    listContextDisp({ type: "TASKS_LISTS", payload: [] });
    listContextDisp({ type: "SET_PARTICIPANTS", payload: [] });
    projectDispatch({ type: "SET_PROJECT", payload: null });
    channelDispatch({ type: "SET_CHANNELS", payload: null });
  }, []);

  //PROJECT && CHANNELS

  useEffect(() => {
    if (project_id && user) {
      idDispatch({ type: "SET_PROJECT_ID", payload: project_id });
      setProject(user, project_id);
      getProjectChannels(user, project_id);
    }
  }, [user, project_id]);


  //TASKS

  useEffect(() => {
    if (idState.board_id) {
      getTasks(user, idState.board_id);
    }
  }, [idState.board_id, socketData, updateTask]);

  //SOCKET

  useEffect(() => {
    setSocketData(null);
    if (idState.board_id) {
      setLists(user, idState.board_id);
    }
  }, [user, idState.board_id, socketData]);

  useEffect(() => {
    socket.emit("join_board", idState.board_id);

    socket.on("task_refresh", (data) => {
      setUpdateTask(data);
    });

    socket.on("tasks_refresh", (data) => {
      setSocketData(data);
    });

    return () => {
      socket.emit("leave_board", idState.board_id);
      socket.off("join_board");
    };
  }, [idState.board_id]);

  return (
    <>
      <aside className="border-r w-[15%] flex flex-col text-xl list-none my-3">
        <SideBar />
      </aside>

      <main className="w-[85%] p-4 overflow-auto">
        <Outlet />
      </main>
    </>
  );
}
