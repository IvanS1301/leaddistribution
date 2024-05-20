import React from 'react'


// components
import AdminSidebar from "../../components/admin/AdminSidebar"
import UserLists from "../../components/admin/UserLists"
import AdminNavbar from '../../components/admin/AdminNavbar'


const AdminUsers = () => {


  return (
    <div className="flex">
      <AdminSidebar />
      <div>
        <AdminNavbar />
        <div className="p-7">
          <UserLists />
        </div>
      </div>
    </div>
  )
}

export default AdminUsers