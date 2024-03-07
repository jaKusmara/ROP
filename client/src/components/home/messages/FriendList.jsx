import React, { useEffect } from "react";
import { useChat } from "../../../hooks/useChat";
import { useIdContext } from "../../../hooks/useContext/useIdContext";
import { useAuthContext } from "../../../hooks/useContext/useAuthContext";
import { useChatContext } from "../../../hooks/useContext/useChatContext";

import { List, ListItem } from "@material-tailwind/react";

export default function FriendList({ query }) {
  const { getFriends, openChat } = useChat();
  const { state: chatContextState } = useChatContext();
  const { dispatch: idContextDisp } = useIdContext();
  const { user } = useAuthContext();

  useEffect(() => {
    getFriends(user);
  }, [user]);

  const filteredFriends =
    chatContextState.friends &&
    chatContextState.friends.filter(
      (friend) =>
        friend.firstname.toLowerCase().includes(query.toLowerCase()) ||
        friend.surname.toLowerCase().includes(query.toLowerCase())
    );

  return (
    <List className="text-xl p-3">
      {query
        ? filteredFriends.map((friend) => (
            <ListItem
              className="flex"
              key={friend._id}
              onClick={() => {
                openChat(user, friend._id);
              }}
            >
              <img width="40" src={friend.avatar} alt={friend.username} />
              <p className="ml-3">{friend.firstname}</p>{" "}
              <p className="ml-3">{friend.surname}</p>
            </ListItem>
          ))
        : chatContextState.friends &&
          chatContextState.friends.map((friend) => (
            <ListItem
              className="flex "
              key={friend._id}
              onClick={() => {
                openChat(user, friend._id);
              }}
            >
              {friend.avatar && (
                <img width="40" src={friend.avatar} alt={friend.username} />
              )}
              <p className="ml-3">{friend.firstname}</p>{" "}
              <p className="ml-3">{friend.surname}</p>
            </ListItem>
          ))}
    </List>
  );
}
