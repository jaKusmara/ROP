import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useContext/useAuthContext";
import avatar from "../assets/user.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";

export default function NavBar() {
  const [dropDownAvatar, setDropDownAvatar] = useState(false);
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClickLogOut = () => {
    logout();
  };

  const handleOnAvatarClick = () => {
    setDropDownAvatar(!dropDownAvatar);
  };

  return (
    <nav className="bg-neutral-900 flex justify-between items-center p-4">
      <h2>Tasking</h2>

      Search

      <div className="flex felx-col">
        <div className="bg-white rounded-full cursor-pointer">
          <img
            onClick={handleOnAvatarClick}
            src={avatar}
            alt="Avatar"
            width="50"
            className="rounded-full"
          />
        </div>
        {dropDownAvatar && (
          <ul className="bg-white w-40 mt-2 p-2 relative rounded-md right-0 text-black">
            <li className="p-2 flex flex-row">
              <h2>{user && user.user.email}</h2>
            </li>
            <li className="cursor-pointer hover:bg-gray-200 p-2 flex flex flex-row justify-between">
              <h2>Profile</h2>
              <AccountCircleIcon />
            </li>
            <li className="cursor-pointer hover:bg-gray-200 p-2 flex flex-row">
              <button onClick={handleClickLogOut} className="flex flex-row justify-between w-full">
                <h2>Log out</h2>
                <LogoutIcon />
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
