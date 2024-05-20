import { useEffect, useMemo, useState } from "react"
import { useLeadsContext } from "../../hooks/useLeadsContext"
import { useAuthContext } from "../../hooks/useAuthContext"

// mui
import { Box, Typography, TextField, IconButton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import moment from 'moment'
import { Search as SearchIcon, GetApp as GetAppIcon } from '@mui/icons-material'


const LeadList = () => {
  const { tlLeads, dispatch: dispatchLeads } = useLeadsContext()
  const { userLG } = useAuthContext()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredLeads = tlLeads ? tlLeads.filter(lead =>
    Object.values(lead).some(
      value =>
        typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  ) : [];

  useEffect(() => {
    const fetchLeads = async () => {
      const response = await fetch('/api/leads/tl', {
        headers: { 'Authorization': `Bearer ${userLG.token}` },
      })
      const json = await response.json()

      if (response.ok) {
        dispatchLeads({ type: 'SET_TL-LEADS', payload: json })
      }
    }

    fetchLeads()
  }, [dispatchLeads, userLG])

  const exportData = () => {
    const exportLeads = filteredLeads.map(lead => ({
      Name: lead.name || '',
      Type: lead.type || '',
      'Phone Number': lead.phonenumber || '',
      'Street Address': lead.streetaddress || '',
      City: lead.city || '',
      Postcode: lead.postcode || '',
      'Email Address': lead.emailaddress || '',
      'Created At': lead.createdAt ? moment(lead.createdAt).format('MMM-D-YYYY') : '',
      Distributed: lead.updatedAt ? moment(lead.updatedAt).format('MMM-D-YYYY') : '',
      'Assigned To': lead.assignedTo || '',
      Id: lead._id || '',
    }));

    const csvRows = [
      Object.keys(exportLeads[0]).join(','),
      ...exportLeads.map(lead => Object.values(lead).map(val => `"${val}"`).join(','))
    ];

    const csvString = csvRows.join('\n');

    const blob = new Blob([csvString], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'leads.csv';
    link.click();
  };

  const columns = useMemo(() => [
    {
      field: 'name',
      headerName: 'Name',
      width: 400,
      headerClassName: 'bg-blue-gray text-white',
      cellClassName: 'bg-black-gray font-bold border-b border-gray-400'
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 150,
      headerClassName: 'bg-blue-gray text-white',
      cellClassName: 'bg-black-gray font-bold border-b border-gray-400'
    },
    {
      field: 'phonenumber',
      headerName: 'Phone Number',
      width: 180,
      headerClassName: 'bg-blue-gray text-white',
      cellClassName: 'bg-black-gray font-bold border-b border-gray-400',
      sortable: false,
      filterable: false
    },
    {
      field: 'emailaddress',
      headerName: 'Email Address',
      width: 280,
      headerClassName: 'bg-blue-gray text-white',
      cellClassName: 'bg-black-gray font-bold border-b border-gray-400'
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
      field: 'updatedAt',
      headerName: 'Distributed',
      width: 130,
      headerClassName: 'bg-blue-gray text-white',
      cellClassName: 'bg-black-gray font-bold border-b border-gray-400',
      renderCell: (params) =>
        moment(params.row.updatedAt).format('MMM-D-YYYY'),
    },
    {
      field: 'assignedTo',
      headerName: 'Assigned To',
      width: 230,
      headerClassName: 'bg-blue-gray text-white',
      cellClassName: 'bg-black-gray font-bold border-b border-gray-400'
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
        width: '100%',
      }}
    >
      <Typography variant="h3" component="h3" sx={{ textAlign: 'center', mt: 1, mb: 1 }}>
        Manage Leads
  </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => setSearchQuery('')}>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
        <IconButton onClick={exportData}>
          <GetAppIcon />
        </IconButton>
      </Box>
      <DataGrid
        columns={columns}
        rows={filteredLeads}
        getRowId={row => row._id}
        className="bg-blue-gray"
      />
    </Box>
  );
};

export default LeadList