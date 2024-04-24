import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useUsersContext } from "../hooks/useUsersContext"
import { useAuthContext } from '../hooks/useAuthContext'
import { Link } from "react-router-dom"

const UpdateUserForm = () => {
  const { id } = useParams()
  const { userlgs, dispatch } = useUsersContext()
  const { userLG } = useAuthContext()

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    role: '',
    birthday: '',
    number: '',
    homeaddress: '',
    gender: ''
  })
  const [error, setError] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  useEffect(() => {
    // Fetch the user details based on the ID
    const userlg = userlgs.find(userlg => userlg._id === id)
    if (userlg) {
      setUserData({
        name: userlg.name,
        email: userlg.email,
        role: userlg.role,
        birthday: userlg.birthday,
        number: userlg.number,
        homeaddress: userlg.homeaddress,
        gender: userlg.gender
      })
    }
  }, [id, userlgs])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Send the updated user data to the backend for updating
    const response = await fetch(`/api/userLG/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userLG.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setError(null)
      setUserData("")
      setShowSuccessMessage(true)
      // Update the user in the local state
      dispatch({ type: 'UPDATE_USER', payload: json })
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
    {showSuccessMessage && <div className="success">Update Successfully!</div>}
    <Link to={`/viewuser/${userLG._id}`} className="back"><i className="fa-solid fa-arrow-left"></i></Link> 
      <div className="title">Update Profile</div>
        <div className="lead-details">
            <div className="input-box">
            <label className="details">Name:</label>
            <input 
                type="text" 
                name="name"
                value={userData.name}
                onChange={handleChange}
                placeholder="Name"
            />
            </div>
        
        <div className="input-box">
            <label className="details">Email:</label>
            <input 
                type="text"
                name="email"
                onChange={handleChange} 
                value={userData.email}
                placeholder="Email"
            /></div>

        <div className="input-box">
        <label className="details">Role:</label>
        <select
            name="role"
            value={userData.role}
            onChange={handleChange}
        >
            <option value="">--Choose One--</option>
            <option value="Lead Generation">Lead Generation</option>
            <option value="Telemarketer">Telemarketer</option>
            <option value="Team Leader">Team Leader</option>
        </select></div>

        <div className="input-box">
            <label className="details">Birthday:</label>
            <input 
                type="date"
                name="birthday"
                onChange={handleChange}
                value={userData.birthday}
                placeholder="Birthday"
            />
            </div>

        <div className="input-box">
            <label className="details">Phone Number:</label>
            <input 
                type="text"
                name="number"
                onChange={handleChange}
                value={userData.number}
                placeholder="Phone Number"
            /></div>
        
        <div className="input-box">
            <label className="details">Home Address:</label>
            <input 
                type="text"
                name="homeaddress" 
                onChange={handleChange}
                value={userData.homeaddress}
                placeholder="Home Address"
            /></div>

        <div className="input-box">
        <label className="details">Gender:</label>
        <select
            name="gender"
            value={userData.gender}
            onChange={handleChange}
        >
            <option value="">--Choose One--</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
        </select></div>
        
        <div className="input-box">
        <button className="submit">Update Profile</button>
        {error && <div className="error">{error}</div>}
      </div></div>
    </form>
  )
}

export default UpdateUserForm