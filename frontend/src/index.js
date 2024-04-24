import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { LeadsContextProvider } from './context/LeadsContext'
import { AuthContextProvider } from './context/AuthContext'
import { UsersContextProvider } from './context/UsersContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <UsersContextProvider>
        <LeadsContextProvider>
              <App />
        </LeadsContextProvider>
      </UsersContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
