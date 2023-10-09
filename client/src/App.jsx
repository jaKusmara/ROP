import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useAuthContext } from "./hooks/useAuthContext";

import Home from './pages/Home'
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function App() {
  const { user } = useAuthContext();

  return (
     <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <Home/> : <Navigate to='/login'/>}
          />
          <Route
            path="/login"
            element={!user ? <Login/> : <Navigate to='/'/>}
          />
          <Route
            path="/signup"
            element={!user ? <Signup/> : <Navigate to='/'/>}
          />
          <Route/>
        </Routes>
      </BrowserRouter>
     </> 
  );
}

export default App;
