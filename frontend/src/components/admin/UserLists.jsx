import { useEffect, useMemo } from "react"
import { useUsersContext } from "../../hooks/useUsersContext"

// mui
import { Box, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import moment from 'moment'


const UserLists = () => {
  const { userlgs, dispatch: dispatchUsers } = useUsersContext()

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/userLG')
      const json = await response.json()

      if (response.ok) {
        dispatchUsers({ type: 'SET_USERS', payload: json })
      }
    }

    fetchUsers()
  }, [dispatchUsers])

  // Custom rendering function for boolean values
  const renderBooleanCell = (params) => {
    return (
      <div className="flex items-center h-full ml-4">
        {params.value ? (
          <div className="w-3 h-3 rounded-full bg-green-500"></div> // Green circle for true
        ) : (
            <div className="w-3 h-3 rounded-full bg-red-500"></div> // Red circle for false
          )}
      </div>
    );
  };

  // Custom rendering function for gender
  const renderGenderCell = (params) => {
    if (!params.value) {
      return null // If gender value is empty, return null (or render something else)
    }
    return (
      <div className="flex items-center h-full mr-3 mb-4">
        <div className={params.value === 'Male' ? 'flex items-center justify-center bg-blue-800 text-white text-center rounded-full w-20 h-6' : 'flex items-center justify-center bg-pink-600 text-white text-center rounded-full w-20 h-6'}>
          {params.value}
        </div>
      </div>
    );
  };

  const columns = useMemo(() => [
    {
      field: 'name',
      headerName: 'Name',
      width: 140,
      headerClassName: 'bg-blue-gray text-white',
      cellClassName: 'bg-black-gray font-bold border-b border-gray-400'
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 210,
      headerClassName: 'bg-blue-gray text-white',
      cellClassName: 'bg-black-gray font-bold border-b border-gray-400'
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 160,
      headerClassName: 'bg-blue-gray text-white',
      cellClassName: 'bg-black-gray font-bold border-b border-gray-400'
    },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 100,
      headerClassName: 'bg-blue-gray text-white',
      cellClassName: 'bg-black-gray font-bold border-b border-gray-400',
      renderCell: renderGenderCell
    },
    {
      field: 'number',
      headerName: 'Phone Number',
      width: 150,
      headerClassName: 'bg-blue-gray text-white',
      cellClassName: 'bg-black-gray font-bold border-b border-gray-400',
      sortable: false,
      filterable: false
    },
    {
      field: 'birthday',
      headerName: 'Birthday',
      width: 130,
      headerClassName: 'bg-blue-gray text-white',
      cellClassName: 'bg-black-gray font-bold border-b border-gray-400',
      renderCell: (params) =>
        moment(params.row.birthday).format('MMM-D-YYYY'),
    },
    {
      field: 'homeaddress',
      headerName: 'Home Address',
      width: 130,
      headerClassName: 'bg-blue-gray text-white',
      cellClassName: 'bg-black-gray font-bold border-b border-gray-400'
    },
    {
      field: 'isActive',
      headerName: 'Active',
      width: 90,
      headerClassName: 'bg-blue-gray text-white',
      cellClassName: 'bg-black-gray font-bold border-b border-gray-400',
      renderCell: renderBooleanCell
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 130,
      headerClassName: 'bg-blue-gray text-white',
      cellClassName: 'bg-black-gray font-bold border-b border-gray-400',
      renderCell: (params) =>
        moment(params.row.createdAt).format('MMM-D-YYYY'),
    },
    {
      field: '_id',
      headerName: 'Id',
      width: 230,
      headerClassName: 'bg-blue-gray text-white',
      cellClassName: 'bg-black-gray font-bold border-b border-gray-400'
    },
  ], [])

  return (
    <Box
      sx={{
        height: 450,
        width: '100%'
      }}
    >
      <Typography
        variant='h3'
        component='h3'
        sx={{ textAlign: 'center', mt: 3, mb: 3 }}
      >
        Manage Users
        </Typography>
      <DataGrid
        columns={columns}
        rows={userlgs}
        getRowId={row => row._id}
        className="bg-blue-gray"
      />
    </Box>
  )
}

export default UserLists
