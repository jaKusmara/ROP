import React from "react";
import { useBoardContext } from "../../../hooks/useContext/useBoardContext";
import { useTask } from "../../../hooks/useTask";
import { useAuthContext } from "../../../hooks/useContext/useAuthContext";
import { useIdContext } from "../../../hooks/useContext/useIdContext";

export default function MoveTask() {
  const { user } = useAuthContext();
  const { moveTask } = useTask();
  const { state: board } = useBoardContext();
  const { state: idState } = useIdContext();
  const handleMove = async (list_id) => {
    console.log(list_id);
    if (user) {
      await moveTask(user, idState.task_id, list_id, idState.board_id);
    }
  };
  console.log(board.lists);
  return (
    <ul className="relative bg-gray-800 h-fit p-4 flex flex-col">
      {board.lists.map((list) => (
        <button key={list._id} onClick={() => handleMove(list._id)}>
          {list.title}
        </button>
      ))}
    </ul>
  );
}
