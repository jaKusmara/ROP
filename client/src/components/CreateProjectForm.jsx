import React, { useState } from "react";

export default function CreateProjectForm({onCreateProjectClick}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col w-1/3 gap-y-4">
      <input
        type="text"
        name="title"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        name="description"
        placeholder="Project Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={onCreateProjectClick}>Cancel</button>
    </div>
  );
}
