import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { AuthContextProvider } from './context/AuthContext.jsx'; // Adjust the import path

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
      </AuthContextProvider>
  </React.StrictMode>,
)
