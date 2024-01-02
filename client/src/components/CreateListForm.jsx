import React, { useState } from "react";
import { useToggleFormContext } from "../hooks/useContext/useToggleForm";
import { useAuthContext } from "../hooks/useContext/useAuthContext";
import {useList} from "../hooks/useList"
import {useProjectContext} from "../hooks/useContext/useProjectContext"

export default function CreateListForm() {
  const { setBackground, setCreateList } = useToggleFormContext();
  const {createList} = useList()
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const {state} = useProjectContext()

  const handleClickCancelButton = () => {
    setCreateList(false);
    setBackground(false);
  };

  const handleClickCreateButton = () => {
    createList(user, title, state.project.board_id);
    setCreateList(false);
    setBackground(false);
  };

  return (
    <div className="create-list-form">
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleClickCreateButton}>Create</button>
      <button onClick={handleClickCancelButton}>Cancel</button>
    </div>
  );
}
