import React from 'react'
import { Link } from "react-router-dom"


// Function to shorten ObjectId
const objectIdToShortId = (objectId) => {
  const hexString = objectId.toString();
  return hexString.substring(16, 26);
}

const AllUserInfo = ({ userlg }) => {
  
 
    return (
        <div className="ViewForm">
        <form className="view">
        <Link to={"/"} className="back"><i className="fa-solid fa-arrow-left"></i></Link>
        <div className="view-details">
          <h4>{userlg.name}</h4>
          <p><strong>Role: </strong>{userlg.role}</p>
          <p><strong>Employee ID: </strong>{objectIdToShortId(userlg._id)}</p>
          <p><strong>Birthday: </strong>{userlg.birthday}</p>
          <p><strong>Phone Number: </strong>{userlg.number}</p>
          <p><strong>Email: </strong>{userlg.email}</p>
          <p><strong>Address: </strong>{userlg.homeaddress}</p>
          <Link to={`/viewuser/${userlg._id}`}>View</Link>
          <Link to={`/useredit/${userlg._id}`}>Update</Link>
          </div>
        </form>
        </div>
    )
  }
  
  export default AllUserInfo
