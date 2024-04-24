import { useEffect } from "react"
import { useUsersContext } from "../hooks/useUsersContext"

// components
import AllUserInfo from "../user components/AllUserInfo"

const UserHome = () => {
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
          {userlgs && userlgs.map((userlg) =>(
            <AllUserInfo key={userlg._id} userlg={userlg} />
          ))}
        </div>
      </div>
    )
  }
  
  export default UserHome