import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './leadgen pages/Home'
import AgentHome from './agent pages/AgentHome'
import Navbar from './leadgen components/Navbar'
import AddForm from './leadgen pages/AddForm'
import EditForm from './leadgen pages/EditForm'
import AGEditForm from './agent pages/AGEditForm'
import ReadForm from './leadgen pages/ReadForm'
import AGReadForm from './agent pages/AGReadForm'
import LoginLG from './leadgen pages/LoginLG'
import SignupLG from './leadgen pages/SignupLG'
import EditUserInfo from './user pages/EditUserInfo'
import UserHome from './user pages/UserHome'
import ReadUserInfo from './user pages/ReadUserInfo'

function App() {
  const { userLG } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={userLG ? (
                userLG.role === "Lead Generation" ? <Home /> : (
                userLG.role === "Telemarketer" ? <AgentHome /> : <Navigate to="/loginLG" />
              )
            ) : <Navigate to="/loginLG" />} />

            <Route path="/add" element={<AddForm />} />
            <Route path="/edit/:id" element={<EditForm />} />
            <Route path="/agentedit/:id" element={<AGEditForm />} />
            <Route path="/view/:id" element={<ReadForm />} />
            <Route path="/agentview/:id" element={<AGReadForm />} />
            <Route path="/useredit/:id" element={<EditUserInfo />} />
            <Route path="/userhome" element={<UserHome />} />
            <Route path="/viewuser/:id" element={<ReadUserInfo />} />

            {/* Login Route */}
            <Route path="/loginLG" element={!userLG ? <LoginLG /> : <Navigate to="/" />} />

            {/* Signup Route */}
            <Route path="/signupLG" element={!userLG ? <SignupLG /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App