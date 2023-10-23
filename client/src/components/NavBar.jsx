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
        <nav className='flex bg-zinc-900 justify-end items-center space-x-3'>
              <SearchBar/>
              <Link to={`/`}><button className="w-[10vh] bg-black h-8 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#00089b] before:to-[rgb(105,155,184)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]" onClick={handleClick}>LogOut</button></Link>
        </nav>
    </>
  )
}
