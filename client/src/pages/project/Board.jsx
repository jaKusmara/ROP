import { useEffect, useState } from "react";
import { useToggleFormContext } from "../../hooks/useContext/useToggleForm";
import { useAuthContext } from "../../hooks/useContext/useAuthContext";
import { useBoardContext } from "../../hooks/useContext/useBoardContext";
import { useBoard } from "../../hooks/useBoard";
import socket from "../../utils/socekt";
import { useIdContext } from "../../hooks/useContext/useIdContext";
import { useTask } from "../../hooks/useTask";

import ListComponent from "../../components/project/board/ListComponent";
import AddIcon from "@mui/icons-material/Add";

export default function Board() {
  //const { setBackground, background, setCreateList:handleCreateList } = useToggleFormContext();
  const { state: board } = useBoardContext();
  const { user } = useAuthContext();
  const { createList: createListClick } = useBoard();
  const { state: idState } = useIdContext();
  const { error: listError, isLoading: listLoading } = useBoard();
  const { error: taskError, isLoading: taskIsLoading } = useTask();
  const [listTitle, setListTitle] = useState("");

  const [createList, setCreateList] = useState(false);

  const handleCreateList = () => {
    setCreateList(!createList);
  };

  return (
    <div className="flex flex-col h-full mx-auto">
      <nav className="mb-4">
        <button
          onClick={handleCreateList}
          className="bg-purple-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          {createList ? "Cancel" : "New List"}
        </button>
      </nav>
      {listLoading && <div>Loading...</div>}
      {listError && <div className="text-red-500">{listError}</div>}
      <div className="flex overflow-x-auto overflow-y-hidden h-full">
        <div className="flex flex-nowrap space-x-4">
          {createList && (
            <div className="flex bg-neutral-700 w-80 h-fit p-3 rounded">
              <input
                type="text"
                name="listTitle"
                value={listTitle}
                onChange={(e) => setListTitle(e.target.value)}
                className="p-2 w-full rounded text-black"
                placeholder="List name..."
              />
              <button
                onClick={() => {
                  createListClick(user, listTitle, idState.board_id);
                  setCreateList(!createList);
                  setListTitle("");
                }}
                className="bg-purple-500 p-2 ml-2 rounded"
              >
                <AddIcon />
              </button>
            </div>
          )}
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
