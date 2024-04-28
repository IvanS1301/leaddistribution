import { useEffect } from "react"
import { useLeadsContext } from "../hooks/useLeadsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import LeadFields from "../admin components/LeadFields"
import ListOfLeads from "../admin components/ListOfLeads"
import Sidebar from '../admin components/Sidebar'

const AdminLeads = () => {
  const { tlLeads, dispatch } = useLeadsContext()
  const { userLG } = useAuthContext()

  useEffect(() => {
    const fetchLeads = async () => {
      const response = await fetch('/api/leads/tl', {
        headers: {'Authorization': `Bearer ${userLG.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_TL-LEADS', payload: json})
      }
    }

    fetchLeads()
  }, [dispatch, userLG])

    return (
      <div className="home">
      <div className="home-title">Welcome!</div>
        <div className="leads">
        <Sidebar />
        <LeadFields />
          {tlLeads && tlLeads.map((lead) =>(
            <ListOfLeads key={lead._id} lead={lead} />
          ))}
        </div>
      </div>
    )
  }
  
  export default AdminLeads
