import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useLeadsContext } from "../../hooks/useLeadsContext"
import { useUsersContext } from "../../hooks/useUsersContext"
import { useAuthContext } from '../../hooks/useAuthContext'
import { Link } from "react-router-dom"

const AssignLead = () => {
  const { id } = useParams()
  const { tlLeads, dispatch } = useLeadsContext()
  const { userlgs, dispatch: userdispatch } = useUsersContext()
  const { userLG } = useAuthContext()

  const [leadData, setLeadData] = useState({
    assignedTo: ''
  })

  const [error, setError] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/userLG')
      const json = await response.json()

      if (response.ok) {
        userdispatch({type: 'SET_USERS', payload: json})
      }
    }

    fetchUsers()
  }, [userdispatch])


  useEffect(() => {
    // Fetch the lead details based on the ID
    const lead = tlLeads.find(lead => lead._id === id)
    if (lead) {
      setLeadData({
        assignedTo: lead.assignedTo
      })
    }
  }, [id, tlLeads])

  const handleChange = (e) => {
    const { name, value } = e.target
    setLeadData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Send the updated lead data to the backend for updating
    const response = await fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(leadData),
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
      setShowSuccessMessage(true)
      // Update the lead in the local state
      dispatch({ type: 'UPDATE_TL-LEAD', payload: json })
    } 
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
    {showSuccessMessage && <div className="success">Assigned Successfully!</div>}
    <Link to={"/"} className="back"><i className="fa-solid fa-arrow-left"></i></Link> 
      <div className="title">Assign Lead</div>
        <div className="lead-details">

        <div className="input-box">
        <label className="details">Assign To:</label>
        <select
            name="assignedTo"
            value={leadData.assignedTo}
            onChange={handleChange}
            required
        >
            <option value="">Select User</option>
            {userlgs && userlgs.map((userlg) => (
              <option key={userlg._id} value={userlg._id}>
                {userlg.name}
              </option>
            ))}
        </select></div>

        <div className="input-box">
        <button className="submit">Submit</button>
        {error && <div className="error">{error}</div>}
      </div>

        </div>
    </form>
  )
}

export default AssignLead