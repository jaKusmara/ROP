// SearchResults Component
import { useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useChatContext } from "../../../hooks/useContext/useChatContext";
import { useChat } from "../../../hooks/useChat";
import { useAuthContext } from "../../../hooks/useContext/useAuthContext";

export default function Search({ query }) {
  const { user } = useAuthContext();
  const { getFriends, addFriend, removeFriend } = useChat();
  const { state: friendsState } = useChatContext();

  useEffect(() => {
    getFriends(user);
  }, []);

  const FriendButton = ({ isFriend, person_id }) => (
    <button
      className={`rounded p-1 ${
        isFriend ? "bg-red-500" : "bg-green-500"
      } text-white`}
      onClick={() =>
        isFriend ? removeFriend(user, person_id) : addFriend(user, person_id)
      }
    >
      {isFriend ? <PersonRemoveIcon /> : <PersonAddIcon />}
    </button>
  );

  return (
    <div className="absolute top-full left-0 mt-2 w-full bg-white text-black p-4 border border-gray-300 rounded-md shadow-md">
      <ul className="w-full flex flex-col gap-y-3">
        {query.map((result) =>
          result._id !== user.user._id ? (
            <li key={result._id} className="flex items-center justify-between">
              <div className="flex items-center">
                <img width="40" src={result.avatar} alt={result.username} />
                <p className="text-sm ml-2">
                  {result.firstname} {result.surname}
                </p>
              </div>
              <FriendButton
                isFriend={
                  friendsState.friends &&
                  friendsState.friends.some(
                    (friend) => friend._id === result._id
                  )
                }
                person_id={result._id}
              />
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
}
