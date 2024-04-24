import { Link } from "react-router-dom"
import { useLeadsContext } from "../hooks/useLeadsContext"
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatRelative from 'date-fns/formatRelative'

// Function to shorten ObjectId
const objectIdToShortId = (objectId) => {
  const hexString = objectId.toString();
  return hexString.substring(22, 26);
}

const LeadAnswers = ({ lead }) => {
  const { dispatch } = useLeadsContext()
  const { userLG } = useAuthContext()

  const handleClick = async () => {
    if (!userLG) {
      return
    }

    const response = await fetch('/api/leads/' + lead._id, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${userLG.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: "DELETE_LEAD", payload: json})
    }
  }

    return (
        <div className="lead-body">
        <table border={0} cellSpacing={0}>
        <tbody>
        <tr>
          <td>{objectIdToShortId(lead._id)}</td> {/* Display the ObjectId */}
          <td>{lead.name}</td>
          <td>{lead.type}</td>
          <td>{lead.phonenumber}</td>
          <td>{lead.city}</td>
          <td>{lead.emailaddress}</td>
          <td>{formatRelative(new Date(lead.createdAt), 3, new Date())}</td>
          <td className="actionButtons">
            <Link to={`/view/${lead._id}`}><i className="fa-solid fa-eye"></i></Link>
            <button onClick={handleClick}><i className="fa-solid fa-trash"></i></button>
            <Link to={`/edit/${lead._id}`}><i className="fa-solid fa-pen-to-square"></i></Link>
          </td>
        </tr>
      </tbody>
        </table>
        </div>
    )
  }
  
  export default LeadAnswers
