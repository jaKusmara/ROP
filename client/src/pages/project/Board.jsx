import { useEffect } from "react";
import { useToggleFormContext } from "../../hooks/useContext/useToggleForm";
import { useAuthContext } from "../../hooks/useContext/useAuthContext";
import { useListContext } from "../../hooks/useContext/useListContext";
import { useList } from "../../hooks/useList";

import ListComponent from "../../components/ListComponent";

export default function Board() {
  const { setBackground, background, setCreateList } = useToggleFormContext();
  const { state: list } = useListContext();
  const { user } = useAuthContext();
  const { setLists, error: listError, isLoading: listLoading } = useList();

  const board_id = JSON.parse(localStorage.getItem("board_id"));

  useEffect(() => {
    setLists(user, board_id);
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
      <div className="flex overflow-x-auto w-[90%]">
        {list.lists &&
          list.lists.map((item) => (
            <ListComponent key={item._id} item={item} />
          ))}
      </div>
    </div>
  );
}
