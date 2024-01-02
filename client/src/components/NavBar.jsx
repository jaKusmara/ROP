import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useContext/useAuthContext";
import { useEffect } from "react";

export default function NavBar() {
  const { logout } = useLogout();
  const {user} = useAuthContext()

  const handleClickLogOut = () => {
    logout();
  };
  
  return (
    <nav className="bg-neutral-900 flex flex-row list-none justify-between h-full items-center">
      <li>Home</li>
      <li>test</li>
      <li>{user && user.user.email}</li>
      <button onClick={handleClickLogOut}>log out</button>
    </nav>
  );
}
