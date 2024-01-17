import React from "react";
import { Outlet } from "react-router-dom";
import { useChatContext } from "../hooks/useContext/useChatContext";
import FriendList from "../components/project/channel/FriendList";

export default function MessageLayout() {
  const { state: chatContextState } = useChatContext();
  return (
    <>
      <aside className="flex flex-col h-full w-1/6 bg-neutral-700">
        <FriendList />
      </aside>

      {chatContextState.chat && (
        <main className="flex flex-col h-full w-5/6 bg-neutral-500">
          <Outlet />
        </main>
      )}
    </>
  );
}
