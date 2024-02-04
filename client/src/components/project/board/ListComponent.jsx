import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useToggleFormContext } from "../../../hooks/useContext/useToggleForm";

import { useIdContext } from "../../../hooks/useContext/useIdContext";
import { useState } from "react";
import { useTask } from "../../../hooks/useTask";
import { useAuthContext } from "../../../hooks/useContext/useAuthContext";
import SaveIcon from "@mui/icons-material/Save";
import { IdContext } from "../../../context/IdContext";
import TaskCard from "./TaskCard";

import DeleteIcon from "@mui/icons-material/Delete";
import { useBoard } from "../../../hooks/useBoard";

export default function ListComponent({ list, tasks }) {
  const { dispatch } = useIdContext();
  const { deleteList, editTitle } = useBoard();
  const { user } = useAuthContext();
  const { state: idState } = useIdContext();
  const [createTask, setCreateTask] = useState(false);
  const [editList, setEditList] = useState("");
  const [title, setTitle] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [description, setDescription] = useState("");
  const { createTask: createTaskClick } = useTask();

  return (
    <div className=" rounded-md bg-neutral-700 h-fit md:w-60 w-96 shadow-lg shadow-neutral-800">
      <nav className="flex gap-x-2 md:p-1 p-3">
        <button
          className="hover:bg-blue-500 p-2 rounded shadow shadow-neutral-900 bg-neutral-800 md:p-0.5"
          onClick={() => {
            setCreateTask(!createTask);
            dispatch({ type: "SET_LIST_ID", payload: list._id });
          }}
        >
          <AddIcon />
        </button>
        <button
          className="hover:bg-red-500 p-2 rounded shadow shadow-neutral-900 bg-neutral-800 md:p-0.5"
          onClick={() => {
            deleteList(user, list._id, idState.board_id);
          }}
        >
          <DeleteIcon />
        </button>
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
              name="new title"
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
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            name="description"
            className="p-2 text-black rounded md:p-0.5 md:rounded-sm"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <footer className="grid gap-x-2 grid-cols-2 rounded">
            <button
              onClick={() => {
                setDescription("");
                setTitle("");
                setCreateTask(!createTask);
                createTaskClick(
                  user,
                  list._id,
                  idState.board_id,
                  title,
                  description
                );
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
      {tasks && tasks.map((task) => <TaskCard key={task._id} task={task} />)}
    </div>
  );
}
