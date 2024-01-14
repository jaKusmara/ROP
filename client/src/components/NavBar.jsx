import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useContext/useAuthContext";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import Badge from "@mui/material/Badge";
import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function NavBar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickLogOut = () => {
    logout();
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
      <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
        <Avatar
          id="avatar-nav-menu"
          alt={user.user.username}
          src=""
          onClick={handleClick}
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
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
    </nav>
  );
}
