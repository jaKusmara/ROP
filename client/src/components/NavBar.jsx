import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useContext/useAuthContext";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import Badge from "@mui/material/Badge";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function NavBar() {
  const [dropDownAvatar, setDropDownAvatar] = useState(false);
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
      <div>
        <Badge color="secondary" badgeContent={5} max={999}>
          <NotificationsIcon />
        </Badge>
      </div>
      <Avatar
        id="avatar-nav-menu"
        alt={user.user.username}
        src=""
        onClick={handleClick}
      />
      <Menu
        id="avatar-nav-menu"
        aria-labelledby="avatar-nav-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>
          <h2>{user && user.user.email}</h2>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <h2>Profile</h2>
          <AccountCircleIcon />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <button
            onClick={handleClickLogOut}
            className="flex flex-row justify-between w-full"
          >
            <h2>Log out</h2>
            <LogoutIcon />
          </button>
        </MenuItem>
      </Menu>
      {dropDownAvatar && (
        <ul className="bg-white w-40 mt-2 p-2 relative rounded-md right-0 text-black">
          <li className="p-2 flex flex-row"></li>
          <li className="cursor-pointer hover:bg-gray-200 p-2 flex flex-row justify-between"></li>
          <li className="cursor-pointer hover:bg-gray-200 p-2 flex flex-row"></li>
        </ul>
      )}
    </nav>
  );
}
