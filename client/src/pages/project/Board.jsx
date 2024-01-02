import { useEffect, useState } from "react";
import { useToggleFormContext } from "../../hooks/useContext/useToggleForm";
import { useAuthContext } from "../../hooks/useContext/useAuthContext";
import { useListContext } from "../../hooks/useContext/useListContext";
import { useList } from "../../hooks/useList";
import socket from "../../utils/socekt";

import ListComponent from "../../components/ListComponent";

export default function Board() {
  const { setBackground, background, setCreateList } = useToggleFormContext();
  const { state: list } = useListContext();
  const { user } = useAuthContext();
  const { setLists, error: listError, isLoading: listLoading } = useList();
  const [socketData, setSocketData] = useState(null)

  const board_id = JSON.parse(localStorage.getItem("board_id"));

  useEffect(() => {
    setSocketData(null)
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

  return (
    <div className="flex flex-col h-full max-w-full">
      <nav>
        <button onClick={handleCreateTask}>New List</button>
      </nav>
      {listLoading && <div>Loading...</div>}
      {listError && listError}
      <div className="flex overflow-x-auto w-[90%]">
        {list.lists &&
          list.lists.map((item) => (
            <ListComponent key={item._id} item={item} />
          ))}
      </div>
    </div>
  );
}
