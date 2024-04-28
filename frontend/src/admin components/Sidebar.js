import { Link } from 'react-router-dom'
import { useLogoutLG } from '../hooks/useLogoutLG'
import { useAuthContext } from '../hooks/useAuthContext'

const Sidebar = () => {
    const { logoutLG } = useLogoutLG()
    const { userLG } = useAuthContext()

    const handleClick = () => {
        logoutLG()
}

return (
    <nav className="sidebar">
        <header>
            <div className="image-text">
            <span className="image">
            <Link to="/"><img src={process.env.PUBLIC_URL + '/chromagen.png'} alt="Chromagen Logo"/></Link>
            </span>
            </div>

            <i className="fa-solid fa-chevron-right"></i>
        </header>

            <div className="menu">
                <div className="item">
                    <Link to="/"><i className="fas fa-qrcode icon"></i>Dashboard</Link>
                </div>
                <div className="item">
                    <Link to="/AdminUsers"><i className="fas fa-link icon"></i>Users</Link>
                </div>
                <div className="item">
                    <Link to="/AdminLeads"><i className="fas fa-stream"></i>Leads</Link>
                </div>
                <div className="item">
                    <Link to="/AdminReports"><i className="fas fa-calendar-week"></i>Reports</Link>
                </div>
                <div className="item">
                    <Link to="#"><i className="far fa-question-circle"></i>About</Link>
                </div>
                <div className="item">
                    <Link to="#"><i className="fas fa-sliders-h"></i>Service</Link>
                </div>
                <div className="item">
                    <Link to="#"><i className="far fa-envelope"></i>Contact</Link>
                </div>
                <div className="item">
                    {userLG && (
                        <Link to={`/viewuser/${userLG._id}`}><i className="fas fa-user"></i>Profile</Link>
                        )}
                    </div>
                <div className="item">
                    {userLG && (
                            <button className="signout" onClick={handleClick}><i class="fa-solid fa-right-from-bracket"></i>Sign Out</button>
                        )}
                    </div>
            </div>
        
    </nav>
)
}

export default Sidebar
