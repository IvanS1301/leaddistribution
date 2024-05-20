import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/leadgen/Home'
import Navbar from './components/leadgen/Navbar' // gamitin mo lang to once gusto mo mag-login as LeadGen or Tele para makapag-logout ka
import AddForm from './pages/leadgen/AddForm'
import EditForm from './pages/leadgen/EditForm'
import ReadForm from './pages/leadgen/ReadForm'
import LoginLG from './pages/leadgen/LoginLG'
import SignupLG from './pages/leadgen/SignupLG'
import AgentHome from './pages/agent/AgentHome'
import AGEditForm from './pages/agent/AGEditForm'
import AGReadForm from './pages/agent/AGReadForm'
import AdminLeads from './pages/admin/AdminLeads'
import AdminUsers from './pages/admin/AdminUsers'
import AdminDashboard from './pages/admin/AdminDashboard'
import ReadLead from './pages/admin/ReadLead'
import AssignPage from './pages/admin/AssignPage'
import ReadUserInfo from './pages/profile/ReadUserInfo'
import EditUserInfo from './pages/profile/EditUserInfo'

function App() {
  const { userLG } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar /> // Remove if necessary
        <div className="pages">
          <Routes>
            <Route path="/" element={userLG ? (
              userLG.role === "Lead Generation" ? <Home /> : (
                userLG.role === "Telemarketer" ? <AgentHome /> :
                  userLG.role === "Team Leader" ? <AdminDashboard /> : <Navigate to="/loginLG" />
              )
            ) : <Navigate to="/loginLG" />} />

            <Route path="/add" element={userLG ? <AddForm /> : <Navigate to="/loginLG" />} />
            <Route path="/edit/:id" element={userLG ? <EditForm /> : <Navigate to="/loginLG" />} />
            <Route path="/agentedit/:id" element={userLG ? <AGEditForm /> : <Navigate to="/loginLG" />} />
            <Route path="/view/:id" element={userLG ? <ReadForm /> : <Navigate to="/loginLG" />} />
            <Route path="/agentview/:id" element={userLG ? <AGReadForm /> : <Navigate to="/loginLG" />} />
            <Route path="/useredit/:id" element={userLG ? <EditUserInfo /> : <Navigate to="/loginLG" />} />
            <Route path="/AdminLeads" element={userLG ? <AdminLeads /> : <Navigate to="/loginLG" />} />
            <Route path="/viewuser/:id" element={userLG ? <ReadUserInfo /> : <Navigate to="/loginLG" />} />
            <Route path="/AdminUsers" element={userLG ? <AdminUsers /> : <Navigate to="/loginLG" />} />
            <Route path="/TLview/:id" element={userLG ? <ReadLead /> : <Navigate to="/loginLG" />} />
            <Route path="/TLedit/:id" element={userLG ? <AssignPage /> : <Navigate to="/loginLG" />} />

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
