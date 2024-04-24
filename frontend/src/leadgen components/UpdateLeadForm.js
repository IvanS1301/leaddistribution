import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useLeadsContext } from "../hooks/useLeadsContext"
import { useAuthContext } from '../hooks/useAuthContext'
import { Link } from "react-router-dom"

const UpdateLeadForm = () => {
  const { id } = useParams()
  const { leads, dispatch } = useLeadsContext()
  const { userLG } = useAuthContext()

  const [leadData, setLeadData] = useState({
    name: '',
    type: '',
    phonenumber: '',
    streetaddress: '',
    city: '',
    postcode: '',
    emailaddress: ''
  })
  const [error, setError] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  useEffect(() => {
    // Fetch the lead details based on the ID
    const lead = leads.find(lead => lead._id === id)
    if (lead) {
      setLeadData({
        name: lead.name,
        type: lead.type,
        phonenumber: lead.phonenumber,
        streetaddress: lead.streetaddress,
        city: lead.city,
        postcode: lead.postcode,
        emailaddress: lead.emailaddress
      })
    }
  }, [id, leads])

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
      setLeadData("")
      setShowSuccessMessage(true)
      // Update the lead in the local state
      dispatch({ type: 'UPDATE_LEAD', payload: json })
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
    {showSuccessMessage && <div className="success">Update Successfully!</div>}
    <Link to={"/"} className="back"><i className="fa-solid fa-arrow-left"></i></Link> 
      <div className="title">Edit Lead</div>
        <div className="lead-details">
            <div className="input-box">
            <label className="details">Business Name:</label>
            <input 
                type="text" 
                name="name"
                value={leadData.name}
                onChange={handleChange}
                placeholder="Name"
            />
            </div>

        <div className="input-box">
        <label className="details">Type:</label>
        <select
            name="type"
            value={leadData.type}
            onChange={handleChange}
        >
            <option value="">--Choose One--</option>
            <option value="Warehouse">Warehouse</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Boutiques">Boutiques</option>
            <option value="Salon">Salon</option>
            <option value="Spa">Spa</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Hotel">Hotel</option>
            <option value="Gym">Gym</option>
            <option value="Automotive">Automotive</option>
            <option value="Cafe">Cafe</option>
            <option value="Brewery">Brewery</option>
            <option value="Pet Shops">Pet Shops</option>
            <option value="Laundry">Laundry</option>
            <option value="Clinic">Clinic</option>
        </select></div>

        <div className="input-box">
            <label className="details">Phone Number:</label>
            <input 
                type="text"
                name="phonenumber"
                onChange={handleChange} 
                value={leadData.phonenumber}
                placeholder="Phone Number"
            /></div>

        <div className="input-box">
            <label className="details">Street Address:</label>
            <input 
                type="text"
                name="streetaddress"
                onChange={handleChange}
                value={leadData.streetaddress}
                placeholder="Street Address"
            /></div>
        
        <div className="input-box">
            <label className="details">City:</label>
            <input 
                type="text"
                name="city" 
                onChange={handleChange}
                value={leadData.city}
                placeholder="City"
            /></div>

        <div className="input-box">
            <label className="details">Postcode:</label>
            <input 
                type="text"
                name="postcode"
                onChange={handleChange} 
                value={leadData.postcode}
                placeholder="Postcode"
            /></div>

        <div className="input-box">
            <label className="details">Email Address:</label>
            <input 
                type="text"
                name="emailaddress"
                onChange={handleChange}
                value={leadData.emailaddress}
                placeholder="Email Address"
            /></div>
        
        <div className="input-box">
        <button className="submit">Update</button>
        {error && <div className="error">{error}</div>}
      </div></div>
    </form>
  )
}

export default UpdateLeadForm
 




