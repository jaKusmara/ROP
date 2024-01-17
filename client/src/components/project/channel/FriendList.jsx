import React, { useEffect } from "react";
import { useChat } from "../../../hooks/useChat";
import { useIdContext } from "../../../hooks/useContext/useIdContext";
import { useAuthContext } from "../../../hooks/useContext/useAuthContext";
import { useChatContext } from "../../../hooks/useContext/useChatContext";
export default function FriendList() {
  const { getFriends, openChat } = useChat();
  const { state: chatContextState } = useChatContext();
  const { dispatch: idContextDisp } = useIdContext();
  const { user } = useAuthContext();

  useEffect(() => {
    getFriends(user);
  }, []);

  return (
    <>
      <nav>
        <input type="text" />
      </nav>
      <div>
        {chatContextState.friends &&
          chatContextState.friends.map((friend) => (
            <li
              onClick={() => {
                openChat(user, friend._id);
              }}
              key={friend._id}
            >
              {friend.firstname} {friend.surname}
            </li>
          ))}
      </div>
    </>
  );
}
