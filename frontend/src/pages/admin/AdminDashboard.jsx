import React from 'react'
import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminNavbar from '../../components/admin/AdminNavbar'
import DashboardTabs from "../../components/admin/DashboardTabs"

const AdminDashboard = () => {

    return (
        <div className="flex">
            <AdminSidebar />
            <div>
                <AdminNavbar />
                <div className="p-1">
                    <DashboardTabs />
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard
