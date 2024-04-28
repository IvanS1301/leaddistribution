import { useEffect } from "react"
import { useUsersContext } from "../hooks/useUsersContext"

// components
import UserFields from "../admin components/UserFields"
import UserLists from "../admin components/UserLists"
import Sidebar from '../admin components/Sidebar'

const AdminUsers = () => {
  const { userlgs, dispatch } = useUsersContext()

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/userLG')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_USERS', payload: json})
      }
    }

    fetchUsers()
  }, [dispatch])

    return (
      <div className="home">
      <div className="home-title">Welcome!</div>
        <div className="leads">
        <Sidebar />
        <UserFields />
          {userlgs && userlgs.map((userlg) =>(
            <UserLists key={userlg._id} userlg={userlg} />
          ))}
        </div>
      </div>
    )
  }
  
  export default AdminUsers