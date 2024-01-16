import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useContext/useAuthContext";


export default function NavBar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

 

  return (
    <nav className="bg-neutral-900 flex justify-between items-center p-4">
      <h2>Tasking</h2>
      Search
      <div>
        <Badge color="secondary" badgeContent={5} max={999}>
          <NotificationsIcon />
        </Badge>
      </div>
      
    </nav>
  );
}
