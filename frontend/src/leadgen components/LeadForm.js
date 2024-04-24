import { useState } from 'react'
import { Link } from "react-router-dom"
import { useLeadsContext } from "../hooks/useLeadsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const LeadForm = () => {
  const { dispatch } = useLeadsContext()
  const { userLG } = useAuthContext()
  
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [phonenumber, setPhonenumber] = useState('')
  const [streetaddress, setStreetaddress] = useState('')
  const [city, setCity] = useState('')
  const [postcode, setPostcode] = useState('')
  const [emailaddress, setEmailaddress] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!userLG) {
      setError('You must be logged in')
      return
    }

    const lead = {name, type, phonenumber, streetaddress, city, postcode, emailaddress}
    
    const response = await fetch('/api/leads', {
      method: 'POST',
      body: JSON.stringify(lead),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userLG.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setError(null)
      setName('')
      setType('')
      setPhonenumber('')
      setStreetaddress('')
      setCity('')
      setPostcode('')
      setEmailaddress('')
      setEmptyFields([])
      setShowSuccessMessage(true)
      console.log('new lead added:', json)
      dispatch({type: 'CREATE_LEAD', payload: json})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}>
    {showSuccessMessage && <div className="success">New lead added!</div>}
    <Link to={"/"} className="back"><i className="fa-solid fa-arrow-left"></i></Link> 
      <div className="title">Add New Lead</div>
      <div className="lead-details">
      <div className="input-box">
      <label className="details">Name:</label>
      <input 
        type="text" 
        onChange={(e) => setName(e.target.value)} 
        value={name}
        placeholder="Name"
        className={emptyFields.includes('name') ? 'error' : ''}
      /></div>
    
    <div className="input-box">
      <label className="details">Type:</label>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className={emptyFields.includes('type') ? 'error' : ''}
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
        onChange={(e) => setPhonenumber(e.target.value)} 
        value={phonenumber}
        placeholder="Phone Number"
        className={emptyFields.includes('phonenumber') ? 'error' : ''}
      /></div>

    <div className="input-box">
      <label className="details">Street Address:</label>
      <input 
        type="text" 
        onChange={(e) => setStreetaddress(e.target.value)} 
        value={streetaddress}
        placeholder="Street Address"
        className={emptyFields.includes('streetaddress') ? 'error' : ''}
      /></div>

    <div className="input-box">
      <label className="details">City:</label>
      <input 
        type="text" 
        onChange={(e) => setCity(e.target.value)} 
        value={city}
        placeholder="City"
        className={emptyFields.includes('city') ? 'error' : ''}
      /></div>

    <div className="input-box">
      <label className="details">Postcode:</label>
      <input 
        type="text" 
        onChange={(e) => setPostcode(e.target.value)} 
        value={postcode}
        placeholder="Postcode"
        className={emptyFields.includes('postcode') ? 'error' : ''}
      /></div>

    <div className="input-box">
      <label className="details">Email Address:</label>
      <input 
        type="text"
        onChange={(e) => setEmailaddress(e.target.value)} 
        value={emailaddress}
        placeholder="Email Address"
        className={emptyFields.includes('emailaddress') ? 'error' : ''}
      /></div>

    <div className="input-box">
      <button className="submit">Submit</button>
      {error && <div className="error">{error}</div>}
      </div></div>
    </form>
  )
}

export default LeadForm