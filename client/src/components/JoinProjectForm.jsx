import React, { useState } from "react";

export default function JoinProjectForm({
    onJoinProjectClick,
    sendDataToJoinProject
}) {

  const [connectionString, setConnectionString] = useState("");

  const handleSubmit = () => {
    const body = {
      connectionString
    }

    sendDataToJoinProject(body)
  }

  return (
    <div className="flex flex-col w-1/3 gap-y-4">
      <input
        type="text"
        name="connection string"
        placeholder="Project Title"
        value={connectionString}
        onChange={(e) => setConnectionString(e.target.value)}
      />
      <button onClick={onJoinProjectClick}>Cancel</button>
      <button onClick={handleSubmit}>Create Project</button>
    </div>
  );
}
