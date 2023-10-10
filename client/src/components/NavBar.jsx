import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';
import SearchBar from './SearchBar'

export default function NavBar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout()
  }
  
  return (
    <>
      <div>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <SearchBar/>
              <button onClick={handleClick}>LogOut</button>
            </div>
          )}
        {!user && (
          <div>
            <Link to="/login">LogIn</Link>
            <Link to="/signup">SignUp</Link>
          </div>
        )}
        </nav>
      </div>
    </>
  )
}
