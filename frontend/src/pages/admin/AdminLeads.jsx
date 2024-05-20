import React from 'react'

// components
import LeadList from "../../components/admin/LeadList"
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminSidebar from "../../components/admin/AdminSidebar"


const AdminLeads = () => {

  return (
    <div className="flex">
      <AdminSidebar />
      <div>
          <AdminNavbar />
      <div className="p-7">        
          <LeadList />
      </div>
    </div>
    </div>
  )
}
  
  export default AdminLeads