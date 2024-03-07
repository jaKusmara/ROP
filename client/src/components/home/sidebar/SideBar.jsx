import { useLogout } from "../../../hooks/useLogout";
import { NavLink } from "react-router-dom";
import { useSearch } from "../../../hooks/useSearch";
import { useSearchContext } from "../../../hooks/useContext/useSearchContext";
import { useAuthContext } from "../../../hooks/useContext/useAuthContext";

//COMPONENTS
import ProjectList from "./ProjectList";
import FooterSideBar from "./FooterSideBar";
import Search from "./Search";

//ICONS
import LogoutIcon from "@mui/icons-material/Logout";

import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { useChatContext } from "../../../hooks/useContext/useChatContext";

export default function SideBar() {
  const { logout } = useLogout();
  const { search } = useSearch();
  const { user } = useAuthContext();
  const { dispatch } = useChatContext();

  return (
    <>
      <NavLink
        className="py-9 text-center flex self-center items-center text-2xl"
        to={"/"}
      >
        <header>
          <p>Tasking</p>
        </header>
      </NavLink>
      <SearchBar />

      <nav className="text-2xl md:text-lg list-none p-2">
        <NavLink to={"/"}>
          <li className="p-3 hover:bg-neutral-800 rounded">Dashboard</li>
        </NavLink>
        <NavLink to={"messages"}>
          <li
          
            onClick={() => dispatch({ type: "SET_CHAT", payload: null })}
            className="p-3 hover:bg-neutral-800 rounded"
          >
            Messages
          </li>
        </NavLink>
      </nav>
      <hr />
      <section className="max-h-1/2 overflow-auto h-full p-2">
        <ProjectList />
      </section>
      <footer className="flex items-center p-2">
        <div className="flex flex-row w-full md:p-1 md:px-2 ">
          <FooterSideBar />
        </div>
        <LogoutIcon
          fontSize="large"
          className="hover:bg-neutral-800 rounded"
          onClick={() => {
            logout();
          }}
        />
      </footer>
    </>
  );
}
