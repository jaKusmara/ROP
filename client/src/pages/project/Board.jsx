import { useEffect, useState } from "react";
import { useToggleFormContext } from "../../hooks/useContext/useToggleForm";
import { useAuthContext } from "../../hooks/useContext/useAuthContext";
import { useBoardContext } from "../../hooks/useContext/useBoardContext";
import { useBoard } from "../../hooks/useBoard";
import socket from "../../utils/socekt";
import { useIdContext } from "../../hooks/useContext/useIdContext";
import { useTask } from "../../hooks/useTask";

import ListComponent from "../../components/ListComponent";

export default function Board() {
  const { setBackground, background, setCreateList } = useToggleFormContext();
  const { state: board } = useBoardContext();
  const { state: idState } = useIdContext();
  const { user } = useAuthContext();
  const { setLists, error: listError, isLoading: listLoading } = useBoard();
  const { getTasks, error: taskError, isLoading: taskIsLoading } = useTask();
  const [socketData, setSocketData] = useState(null);

  const board_id = JSON.parse(localStorage.getItem("board_id"));
  console.log(idState);
  useEffect(() => {
    setSocketData(null);
    setLists(user, board_id);
  }, [user, board_id, socketData]);

  useEffect(() => {
    socket.emit("join_board", board_id);

    socket.on("tasks_refresh", (data) => {
      setSocketData(data);
    });

    return () => {
      socket.emit("leave_board", board_id);
      socket.off("join_board");
    };
  }, [board_id]);

  const handleCreateTask = () => {
    setBackground(!background);
    setCreateList(true);
  };

  useEffect(() => {
    if (idState.board_id) {
      getTasks(user, idState.board_id);
    }
  }, [idState.board_id]);

  return (
    <div className="flex flex-col h-full mx-auto">
      <nav className="mb-4">
        <button
          onClick={handleCreateTask}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          New List
        </button>
      </nav>
      {listLoading && <div>Loading...</div>}
      {listError && <div className="text-red-500">{listError}</div>}
      <div className="flex overflow-x-auto overflow-y-hidden max-w-screen-2xl">
        <div className="flex flex-nowrap space-x-4">
          {board.lists &&
            board.lists.map((list) => {
              const filteredTasks = board.tasks.filter(
                (task) => task.list_id === list._id
              );

              console.log(filteredTasks);

              return (
                <ListComponent
                  key={list._id}
                  list={list}
                  tasks={filteredTasks}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
