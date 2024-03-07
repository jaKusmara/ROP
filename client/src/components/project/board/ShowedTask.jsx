import React from "react";
import { useToggleFormContext } from "../../../hooks/useContext/useToggleForm";
import { useBoardContext } from "../../../hooks/useContext/useBoardContext";
import { useState, useEffect } from "react";

import { HexColorPicker } from "react-colorful";

//ICONS
import { SmallCloseIcon } from "@chakra-ui/icons";
import DescriptionIcon from "@mui/icons-material/Description";
import LabelIcon from "@mui/icons-material/Label";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import BookIcon from "@mui/icons-material/Book";
import DeleteIcon from "@mui/icons-material/Delete";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import InputIcon from "@mui/icons-material/Input";

import { useTask } from "../../../hooks/useTask";
import { useAuthContext } from "../../../hooks/useContext/useAuthContext";

import { useIdContext } from "../../../hooks/useContext/useIdContext";

import socket from "../../../utils/socekt";

export default function ShowedTask() {
  const { user } = useAuthContext();
  const { task: toggleTask, setTask: setToggleTask } = useToggleFormContext();
  const { state: taskState } = useBoardContext();
  const {
    addLabel,
    deleteLabel,
    moveTask,
    updateTask,
    joinTask,
    leaveTask,
    getTaskParticipants,
  } = useTask();

  const { state: idState } = useIdContext();

  const [toggleAddLabel, setAddLabel] = useState(false);
  const [color, setColor] = useState("#aabbcc");

  const [label, setLabel] = useState("");

  const [toggleMove, setToggleMove] = useState(false);

  const [toggleEdit, setToggleEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [socketUpdateTask, setUpdateTask] = useState(null);

  useEffect(() => {
    socket.on("task_refresh", (data) => {
      setUpdateTask(data);
    });

    return () => {
      socket.off("tasks_refresh");
    };
  });

  useEffect(() => {
    if (taskState.task) {
      getTaskParticipants(user, idState.task_id);
    }
  }, [user, idState.task_id, socketUpdateTask]);

  console.log(taskState);

  return (
    <>
      {taskState.task && (
        <div className="flex fixed inset-0 justify-center items-center">
          <div className="bg-neutral-800 flex flex-row rounded h-[80%] w-[60%] ">
            <section className="w-[75%] h-full">
              <main className="h-[50%] max-w-full">
                {toggleEdit ? (
                  <div className="m-3">
                    <textarea
                      type="text"
                      maxLength={50}
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      placeholder="Label..."
                      className="w-full rounded text-white bg-neutral-700 h-fit resize-none p-1.5 text-2xl"
                    />
                  </div>
                ) : (
                  taskState.task.title && (
                    <h2 className="md:m-2 md:text-2xl break-all h-[15%] break-after">
                      {taskState.task.title}
                    </h2>
                  )
                )}

                <div className="flex flex-col text-2xl   p-4">
                  <nav className="flex flex-row items-center">
                    <DescriptionIcon />
                    <h2 className="ml-5">Description</h2>
                  </nav>
                  {toggleEdit ? (
                    <div className="m-3 h-[50%]">
                      <textarea
                        type="text"
                        maxLength={500}
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        placeholder="Description..."
                        className="w-full h-full rounded text-white bg-neutral-700  resize-none p-1.5 text-base"
                      />
                    </div>
                  ) : (
                    taskState.task.description && (
                      <div className="h-[50%] break-all border-none  rounded text-white bg-neutral-700 overflow-auto resize-none p-1.5 text-base">
                        {taskState.task.description}
                      </div>
                    )
                  )}
                </div>
              </main>

              <div className=" h-[40%] p-2">
                <nav className="flex flex-row items-center text-2xl">
                  <LabelIcon />
                  <h2 className="ml-5">Labels</h2>
                </nav>
                <div className="overflow-auto max-h-[80%] flex flex-wrap gap-2">
                  {taskState.task.labels &&
                    taskState.task.labels.map((label) => (
                      <div
                        style={{ backgroundColor: label.color }}
                        key={label._id}
                        className="md:p-1 md:px-1.5 rounded flex flex-row justify-between items-center gap-x-2"
                      >
                        <SmallCloseIcon
                          onClick={() => {
                            deleteLabel(user, taskState.task._id, label._id);
                          }}
                          className="bg-black opacity-50 rounded cursor-pointer"
                        />
                        <p>{label.text}</p>
                      </div>
                    ))}
                </div>
              </div>
            </section>
            <aside className="w-[25%] rounded-r flex flex-col h-full bg-neutral-700">
              <ul className="list-none flex flex-col gap-y-1 text-center mt-1.5 h-full">
                {toggleEdit ? (
                  <li
                    onClick={() => {
                      setToggleEdit(!toggleEdit);
                      updateTask(
                        user,
                        taskState.task._id,
                        title,
                        description,
                        taskState.task.board_id
                      );
                    }}
                    className="hover:bg-green-500 bg-green-600 rounded p-1 mx-1.5 cursor-pointer"
                  >
                    <SaveIcon />
                    Save
                  </li>
                ) : (
                  <li
                    onClick={() => {
                      setToggleEdit(!toggleEdit);
                      setTitle(taskState.task.title);
                      setDescription(taskState.task.description);
                    }}
                    className="hover:bg-blue-700 rounded p-1 mx-1.5 cursor-pointer"
                  >
                    <EditIcon />
                    Edit
                  </li>
                )}
                {taskState.participants.includes(user.user._id) ? (
                  <button
                    className="hover:bg-red-600 rounded p-1 mx-1.5 cursor-pointer"
                    onClick={() => {
                      leaveTask(user, taskState.task._id, taskState.board_id);
                    }}
                  >
                    <ExitToAppIcon />
                    Leave Task
                  </button>
                ) : (
                  <button
                    className="hover:bg-purple-500 rounded p-1 mx-1.5 cursor-pointer"
                    onClick={() => {
                      joinTask(user, taskState.task._id, taskState.board_id);
                    }}
                  >
                    <InputIcon />
                    Join Task
                  </button>
                )}

                <li
                  onClick={() => {
                    setAddLabel(false);
                    setToggleMove(!toggleMove);
                  }}
                  className="hover:bg-blue-700 rounded p-1 mx-1.5 cursor-pointer"
                >
                  <TrendingFlatIcon />
                  Move
                </li>
                <li
                  onClick={() => {
                    setAddLabel(!toggleAddLabel);
                    setLabel("");
                  }}
                  className="hover:bg-blue-700 rounded p-1 mx-1.5 cursor-pointer"
                >
                  <BookIcon />
                  Add Label
                </li>
                <li className="hover:bg-red-600 rounded p-1 mx-1.5 cursor-pointer">
                  <DeleteIcon />
                  Delete
                </li>
              </ul>
              {toggleMove && (
                <>
                  <h2 className="text-lg ml-2">Move to:</h2>
                  <div className="h-full list-none flex flex-col text-center max-h-[50%] overflow-auto">
                    {taskState.lists &&
                      taskState.lists.map((list) => (
                        <li
                          onClick={() => {
                            moveTask(
                              user,
                              taskState.task._id,
                              list._id,
                              taskState.board_id
                            );
                          }}
                          key={list._id}
                          className="hover:bg-blue-700 rounded p-1 mx-1.5 cursor-pointer"
                        >
                          {list.title}
                        </li>
                      ))}
                  </div>
                </>
              )}
              {toggleAddLabel && (
                <div className="flex flex-col gap-y-2 md:m-2">
                  <input
                    type="text"
                    maxLength={20}
                    onChange={(e) => {
                      setLabel(e.target.value);
                    }}
                    placeholder="Label..."
                    className="w-full rounded p-1 text-black"
                  />
                  <div className="flex max-w-full ">
                    <HexColorPicker color={color} onChange={setColor} />
                  </div>

                  <footer className="w-full flex flex-row gap-x-3">
                    <button
                      onClick={() => {
                        addLabel(user, taskState.task._id, label, color);
                        setAddLabel(!toggleAddLabel);
                      }}
                      className="w-full hover:bg-green-400 p-2 rounded shadow shadow-neutral-900 bg-green-500 md:p-0.5"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        setAddLabel(!toggleAddLabel);
                      }}
                      className="w-full hover:bg-red-400 p-2 rounded shadow shadow-neutral-900 bg-red-500 md:p-0.5"
                    >
                      Cancel
                    </button>
                  </footer>
                </div>
              )}

              <button
                onClick={() => {
                  setToggleTask(!toggleTask);
                }}
                className="m-2 hover:bg-blue-500 p-2 rounded shadow shadow-neutral-900 bg-purple-500 md:p-0.5 "
              >
                Cancel
              </button>
            </aside>
          </div>
        </div>
      )}
    </>
  );
}
