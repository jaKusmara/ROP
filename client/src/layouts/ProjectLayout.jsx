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

export default function ProjectLayout() {
  const { user } = useAuthContext();
  const { getProjectChannels } = useChannel();
  const { state: idState, dispatch: idDispatch } = useIdContext();
  const { setProject } = useProject();
  const { setLists, error: listError, isLoading: listLoading } = useBoard();
  const { getTasks, error: taskError, isLoading: taskIsLoading } = useTask();

  const [socketData, setSocketData] = useState(null);
  const [updateTask, setUpdateTask] = useState(null);

  const { project_id } = useParams();

  useEffect(() => {
    if (project_id && user) {
      idDispatch({ type: "SET_PROJECT_ID", payload: project_id });
      setProject(user, project_id);
    }
  }, [project_id]);

  useEffect(() => {
    if (user && idState.project_id) {
      getProjectChannels(user, idState.project_id);
    }
  }, []);

  useEffect(() => {
    if (user && idState.project_id) {
      getProjectChannels(user, idState.project_id);
    }
  }, [user, idState.project_id]);

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

  useEffect(() => {
    if (idState.board_id) {
      getTasks(user, idState.board_id);
    }
  }, [idState.board_id, socketData, updateTask]);

  return (
    <>
      <aside className="border-r w-1/6 text-lg">
        <SideBar />
      </aside>

      <main className="w-5/6 p-4">
        <Outlet />
      </main>
    </>
  );
}
