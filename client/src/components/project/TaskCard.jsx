import React from "react";

export default function TaskCard({ task }) {

  return (
    <div className="border rounded-md my-2 bg-gray-700 p-2">
      {task && (
        <div>
          <h2 className="text-center text-md">{task.title}</h2>
          <div className="text-sm">{task.description}</div>
        </div>
      )}
    </div>
  );
}
