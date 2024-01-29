import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useChatContext } from "../hooks/useContext/useChatContext";
import FriendList from "../components/home/messages/FriendList";

export default function MessageLayout() {
  const { state: chatContextState } = useChatContext();

  const [query, setQuery] = useState("");

  return (
    <>
      <aside className="inline-block w-[25%] h-full">
        <nav className="p-2 w-full">
          <input
            className="p-1 rounded-sm text-black  w-full"
            type="text"
            placeholder="Find a friend!"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </nav>
        <section className="overflow-auto h-[90%] ">
          <FriendList query={query} />
        </section>
      </aside>

      {chatContextState.chat && (
        <main className="flex flex-col h-full md:w-[75%] bg-neutral-500">
          <Outlet />
        </main>
      )}
    </>
  );
}
