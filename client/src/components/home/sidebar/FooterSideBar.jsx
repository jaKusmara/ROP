import { useAuthContext } from "../../../hooks/useContext/useAuthContext";

import Avatar from "@mui/material/Avatar";

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export default function FooterSideBar() {
  const { user } = useAuthContext();

  const avatarTitle = `${user.user.firstname} ${user.user.surname}`;

  return (
    <div className="flex flex-row w-full md:p-1 md:px-5">
      <Avatar {...stringAvatar(avatarTitle)} />

      <p className="self-center ml-4">
        {user.user.firstname} {user.user.surname}
      </p>
    </div>
  );
}
