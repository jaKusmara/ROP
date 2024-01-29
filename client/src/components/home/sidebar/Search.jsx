// TAILWIND COMPONENTS
import { Avatar, button } from "@material-tailwind/react";

import { useEffect } from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

import { useChatContext } from "../../../hooks/useContext/useChatContext";
import { useChat } from "../../../hooks/useChat";
import { useAuthContext } from "../../../hooks/useContext/useAuthContext";

export default function ({ query }) {
  const { user } = useAuthContext();
  const { getFriends, addFriend, removeFriend } = useChat();
  const { state: friendsState } = useChatContext();

  useEffect(() => {
    getFriends(user);
  }, []);

  const FriendButton = ({ isFriend, person_id }) => (
    <button
      className={`rounded p-0.5 ${isFriend ? "bg-red-500" : "bg-green-500"}`}
      onClick={() =>
        isFriend ? removeFriend(user, person_id) : addFriend(user, person_id)
      }
    >
      {isFriend ? <PersonRemoveIcon /> : <PersonAddIcon />}
    </button>
  );

  return (
    <div className="absolute flex bg-white text-black p-4 mt-3 rounded text-xl w-60 sm:max-w-60">
      <ul className="w-full flex flex-col gap-y-3">
        {query.map((query) => (
          <li key={query._id} className="flex flex-row justify-between">
            <p>
              <AccountCircleIcon />
            </p>
            <p>{query.firstname} </p>
            <p>{query.surname}</p>
            <FriendButton
              isFriend={
                friendsState.friends &&
                friendsState.friends.some((friend) => friend._id === query._id)
              }
              person_id={query._id}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
