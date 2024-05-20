import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.css' // Change mo into index.css if want mo mapunta sa old design
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
