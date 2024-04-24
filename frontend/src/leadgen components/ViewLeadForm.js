import React from 'react'
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom'
import { useLeadsContext } from "../hooks/useLeadsContext"

const ViewLeadForm = () => {
  const { id } = useParams()
  const { leads } = useLeadsContext()

  // Find the lead with the specified ID
  const lead = leads.find(lead => lead._id === id)

  if (!lead) {
    return <div>Loading...</div>
  }

  return (
    <div className="ViewForm">
        <form className="view">
        <Link to={"/"} className="back"><i className="fa-solid fa-arrow-left"></i></Link>
        <div className="view-details">
          <h4>Company Details</h4>
          <p><strong>Business Name: </strong>{lead.name}</p>
          <p><strong>Type: </strong>{lead.type}</p>
          <p><strong>Phone Number: </strong>{lead.phonenumber}</p>
          <p><strong>Street Address: </strong>{lead.streetaddress}</p>
          <p><strong>City: </strong>{lead.city}</p>
          <p><strong>Postcode: </strong>{lead.postcode}</p>
          <p><strong>Email Address: </strong>{lead.emailaddress}</p>
          </div>
        </form>
        </div>
  )
}

export default ViewLeadForm