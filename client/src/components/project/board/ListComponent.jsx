//ICONS
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

//HOOKS
import { useIdContext } from "../../../hooks/useContext/useIdContext";
import { useState } from "react";
import { useTask } from "../../../hooks/useTask";
import { useAuthContext } from "../../../hooks/useContext/useAuthContext";
import { useBoard } from "../../../hooks/useBoard";

//KOMPONENTS
import TaskCard from "./TaskCard";
import ListDropdownMenu from "./ListDropdownMenu";

export default function ListComponent({ list, tasks }) {
  const { editTitle } = useBoard();
  const { user } = useAuthContext();
  const { state: idState } = useIdContext();
  const { createTask: createTaskClick } = useTask();

  const [createTask, setCreateTask] = useState(false);
  const [editList, setEditList] = useState("");
  const [title, setTitle] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleEmitCreateTask = (v) => {
    setCreateTask(v);
  };

  return (
    <div className="rounded-md bg-neutral-700 h-fit md:w-72 md:px-2 md:py-1.5 shadow-lg shadow-neutral-800">
      <nav className="flex gap-x-2 items-center">
        <ListDropdownMenu
          idState={idState}
          user={user}
          list={list}
          createTaskBool={createTask}
          handleEmitCreateTask={handleEmitCreateTask}
        />
        {editList ? (
          <button
            className="hover:bg-blue-500 p-2 rounded shadow shadow-neutral-900 bg-neutral-800 md:p-0.5"
            onClick={() => {
              setEditList(!editList);
              editTitle(user, list._id, idState.board_id, newTitle);
            }}
          >
            <SaveIcon />
          </button>
        ) : (
          <button
            className="hover:bg-blue-500 p-2 rounded shadow shadow-neutral-900 bg-neutral-800 md:p-0.5"
            onClick={() => {
              setEditList(!editList);
              setNewTitle(list.title);
            }}
          >
            <EditIcon />
          </button>
        )}

        <h2 className="w-full text-center align-middle break-all md:text-base text-2xl">
          {editList ? (
            <input
              type="text"
              maxLength={30}
              name="New List Title"
              className="w-full p-1 text-black"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          ) : (
            list.title
          )}
        </h2>
      </nav>
      {createTask && (
        <div className="rounded-md md:rounded-sm break-all bg-neutral-800 m-4 p-3 shadow-xl grid gap-y-2 shadow shadow-neutral-900 md:p-1.5">
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            className="p-2 text-black rounded md:p-0.5 md:rounded-sm"
            value={title}
            maxLength={50}
            onChange={(e) => setTitle(e.target.value)}
          />

          <footer className="grid gap-x-2 grid-cols-2 rounded">
            <button
              onClick={() => {
                setDescription("");
                setTitle("");
                setCreateTask(!createTask);
                createTaskClick(user, list._id, idState.board_id, title, "");
              }}
              className="bg-purple-500 hover:bg-green-400 p-2 md:p-0.5 rounded"
            >
              Create!
            </button>
            <button
              onClick={() => {
                setCreateTask(!createTask);
              }}
              className="bg-red-500 hover:bg-red-400 p-2 md:p-0.5 rounded"
            >
              Cancel
            </button>
          </footer>
        </div>
      )}
      {tasks &&
        tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onClick={() => {
              console.log(true);
            }}
          />
        ))}
    </div>
  );
}
