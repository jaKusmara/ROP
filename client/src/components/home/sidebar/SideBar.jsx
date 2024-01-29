import { useLogout } from "../../../hooks/useLogout";
import { NavLink } from "react-router-dom";
import { useSearch } from "../../../hooks/useSearch";
import { useSearchContext } from "../../../hooks/useContext/useSearchContext";
import { useAuthContext } from "../../../hooks/useContext/useAuthContext";
import { useToggleFormContext } from "../../../hooks/useContext/useToggleForm";

// TAILWIND COMPONENTS
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Input,
  List,
  ListItem,
} from "@material-tailwind/react";

//COMPONENTS
import ProjectList from "./ProjectList";
import FooterSideBar from "./FooterSideBar";
import Search from "./Search";

//ICONS
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import LoginIcon from "@mui/icons-material/Login";

import { useEffect, useState } from "react";

export default function SideBar() {
  const { logout } = useLogout();
  const { search } = useSearch();
  const { user } = useAuthContext();

  const {
    background,
    setBackground,
    createProject,
    setCreateProject,
    joinProject,
    setJoinProject,
  } = useToggleFormContext();
  const { state: searchState } = useSearchContext();

  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query) {
      search(user, query);
    }
  }, [query]);

  return (
    <>
      <NavLink
        className="py-5 text-center flex self-center items-center text-2xl"
        to={"/"}
      >
        <header>
          <p>Tasking</p>
        </header>
      </NavLink>
      <div className="relative">
        <input
          type="text"
          className="mx-2 max-w-full text-black p-1"
          placeholder="Search..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        {searchState.query && query ? (
          <Search query={searchState.query} />
        ) : null}
      </div>

      <nav>
        <ul>
          <NavLink to={"/"}>
            <li>Dashboard</li>
          </NavLink>
          <NavLink to={"messages"}>
            <li>Messages</li>
          </NavLink>
        </ul>
      </nav>
      <hr />
      <h2>Projects:</h2>
      <section className="max-h-1/2 overflow-auto h-full">
        <ProjectList />
      </section>
      <footer>
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
          <MenuList className="w-[14%] p-1 ml-1 bg-neutral-600 text-md border-zinc-400 text-white flex flex-col gap-y-2">
            <MenuItem
              onClick={() => {
                setBackground(!background), setCreateProject(!createProject);
              }}
            >
              Add project
              <AddIcon />
            </MenuItem>
            <MenuItem
              onClick={() => {
                setBackground(!background), setJoinProject(!joinProject);
              }}
            >
              Join project <LoginIcon />
            </MenuItem>
            <MenuItem>
              Settings
              <SettingsIcon />
            </MenuItem>
            <hr />
            <MenuItem onClick={() => logout()}>
              Logout <LogoutIcon />
            </MenuItem>
          </MenuList>
        </Menu>
      </footer>
    </>
  );
}
