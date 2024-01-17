import { useEffect, useState } from "react";
import { useToggleFormContext } from "../../hooks/useContext/useToggleForm";
import { useAuthContext } from "../../hooks/useContext/useAuthContext";
import { useBoardContext } from "../../hooks/useContext/useBoardContext";
import { useBoard } from "../../hooks/useBoard";
import socket from "../../utils/socekt";
import { useIdContext } from "../../hooks/useContext/useIdContext";
import { useTask } from "../../hooks/useTask";

import ListComponent from "../../components/project/board/ListComponent";

export default function Board() {
  const { setBackground, background, setCreateList } = useToggleFormContext();
  const { state: board } = useBoardContext();
  const { error: listError, isLoading: listLoading } = useBoard();
  const { error: taskError, isLoading: taskIsLoading } = useTask();

  const handleCreateTask = () => {
    setBackground(!background);
    setCreateList(true);
  };

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
              return (
                <ListComponent
                  key={list._id}
                  list={list}
                  tasks={filteredTasks}
                  error={taskError}
                  isLoading={taskIsLoading}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
