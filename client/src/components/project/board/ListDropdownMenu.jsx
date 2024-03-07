//ICONS
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";

//HOOKS
import { useBoard } from "../../../hooks/useBoard";
import { useIdContext } from "../../../hooks/useContext/useIdContext";

export default function ListDropdownMenu({
  idState,
  user,
  list,
  createTaskBool,
  handleEmitCreateTask,
}) {
  const { deleteList } = useBoard();
  const { dispatch: idDispatch } = useIdContext();

  return (
    <div class="group">
      <button className="hover:bg-blue-500 p-2 rounded shadow shadow-neutral-900 bg-neutral-800 md:p-0.5">
        <ListIcon />
      </button>

      <div class="absolute hidden bg-neutral-600  p-1 mt-1 rounded-md group-hover:block">
        <button
          className="hover:bg-blue-500 block p-2 rounded shadow shadow-neutral-900 bg-neutral-800 md:p-0.5 mb-1"
          onClick={() => {
            handleEmitCreateTask(!createTaskBool);
            idDispatch({ type: "SET_LIST_ID", payload: list._id });
          }}
        >
          <AddIcon />
        </button>
        <button
          className="hover:bg-red-500 block p-2 rounded shadow shadow-neutral-900 bg-neutral-800 md:p-0.5"
          onClick={() => {
            deleteList(user, list._id, idState.board_id);
          }}
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}
