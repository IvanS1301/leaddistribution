import React from 'react'

// components
import LeadDetails from "../../components/leadgen/LeadDetails"
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminSidebar from "../../components/admin/AdminSidebar"


const AdminLeads = () => {

    return (
        <div className="flex">
            <AdminSidebar />
            <div>
                <AdminNavbar />
                <div className="p-7">
                    <LeadDetails />
                </div>
            </div>
        </div>
    )
}

export default AdminLeads