import { useLogout } from "../../../hooks/useLogout";

// TAILWIND COMPONENTS
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";

//COMPONENTS
import ProjectList from "./ProjectList";
import FooterSideBar from "./FooterSideBar";

//ICONS
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";

export default function SideBar() {
  const { logout } = useLogout();
  return (
    <>
      <header>
        <p>Tasking</p>
      </header>
      <Input variant="outlined" placeholder="Outlined" />

      <nav className="flex flex-col">
        <button>Dashboard</button>
        <button>Messages</button>
        <button>Notifications</button>
      </nav>

      <section>
        <ProjectList />
      </section>

      <Menu
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
      >
        <MenuHandler className="p-1 rounded-md m-3 flex flex-col hover:bg-zinc-800">
          <Button>
            <FooterSideBar />
          </Button>
        </MenuHandler>
        <MenuList className="w-36 p-1 bg-neutral-600 text-md border-zinc-400 text-white">
          <MenuItem>
            Settings <SettingsIcon />
          </MenuItem>
          <hr />
          <MenuItem onClick={() => logout()}>
            Logout <LogoutIcon />
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}
