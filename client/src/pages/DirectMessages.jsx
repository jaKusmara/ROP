import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import Chat from "../components/Chat";
import { useChat } from "../hooks/useChat";
import { useAuthContext } from "../hooks/useContext/useAuthContext";
import GroupIcon from "@mui/icons-material/Group";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export default function DirectMessages() {
  const { user } = useAuthContext();
  const [friends, setFriends] = useState(null);
  const [friend, setFriend] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { openChat, error, isLoading } = useChat();

  const {
    data: fetchedFriends,
    error: fetchError,
    loading,
  } = useFetch(`http://localhost:5000/api/friend/allUserFriends`);

  const handleFriendClick = (f) => {
    setFriend(f);
    setIsChatOpen(true);
    openChat(user, f._id);
  };

  const handleChatBack = () => {
    setIsChatOpen(false);
  };

  useEffect(() => {
    if (fetchedFriends) {
      setFriends(fetchedFriends);
    }
  }, [fetchedFriends, fetchError, loading]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-row h-full">
        <div className="flex flex-col w-[30%]">
          <nav className="flex flex-row justify-between h-[7%] p-2">
            <GroupIcon />
            <EmojiPeopleIcon />
            <input type="text" placeholder="Find your friend!" className="rounded"/>
            <PersonAddIcon />
          </nav>
          {fetchError && (
            <div>
              <p>Error Message: {fetchError.message}</p>
            </div>
          )}
          {loading && <div>Loading...</div>}
          {friends &&
            friends.map((friend) => (
              <span
                onClick={() => handleFriendClick(friend)}
                className="flex flex-row list-none"
                key={friend._id}
              >
                <li>{friend.firstname}</li>
                <li>{friend.surname}</li>
              </span>
            ))}
        </div>

        {isChatOpen ? (
          <Chat friend={friend} handleChatBack={handleChatBack} />
        ) : null}
      </div>
    </div>
  );
}
