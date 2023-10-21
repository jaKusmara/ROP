import React from "react";

export default function ({ onChatClick, onHomeClick, onCreateProjectClick, onAddProjectClick, isAddProjectClicked }) {

  return (
    <div className="flex w-1/5 bg-slate-500 flex-col">
      <div className="flex flex-col gap-y-2 p-2" >
        <span className="cursor-pointer" onClick={onHomeClick}>Home</span>
        <span className="cursor-pointer" onClick={onChatClick}>Chats</span>
        <span className="flex flex-row justify-between ">
          <h1>Project</h1>
          <div className="cursor-pointer" onClick={onAddProjectClick}>
            +
            {isAddProjectClicked ? (
              <>
              <div onClick={onAddProjectClick} className="absolute inset-0"></div>
              <ul className="absolute felx flex-col mt-2 bg-gray-700/95 p-2 rounded text-white">
                <li onClick={onCreateProjectClick} className="cursor-pointer opacity">Create Project</li>
                <li className="cursor-pointer">Join Project</li>
              </ul></>
            ) : null}
          </div>
        </span>
      </div>
    </div>
  );
}
