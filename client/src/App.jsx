import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useAuthContext } from "./hooks/useAuthContext";

import Dashboard from './pages/Dashboard'
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Test from "./pages/Test"

function App() {
  const { user } = useAuthContext();

  return (
     <div>
      <BrowserRouter>
        <Routes>

      
           
          <Route
            path="/"
            element={user ? <Dashboard /> : <Navigate to='/login'/>}
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
        
{/*
          <Route
            path="/"
            element={<Test/>}
          >
          </Route>*/}
        </Routes>
      </BrowserRouter>
     </div> 
  );
}

export default App;
