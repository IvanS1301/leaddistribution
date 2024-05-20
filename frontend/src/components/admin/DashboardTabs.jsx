import { Box, Button, Typography } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { PeopleOutlined, ContactsOutlined } from "@mui/icons-material";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentIcon from '@mui/icons-material/Assignment';

import Header from '../Chart/Header';
import StatBox from '../Chart/StatBox';
import ProgressCircle from "../Chart/ProgressCircle";

import { useEffect } from "react"
import { useLeadsContext } from "../../hooks/useLeadsContext"
import { useAuthContext } from "../../hooks/useAuthContext"

const DashboardTabs = () => {
    const { inventory, recentBookings, dispatch } = useLeadsContext()
    const { userLG } = useAuthContext()

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await fetch('/api/leads/inventory', {
                    headers: { 'Authorization': `Bearer ${userLG.token}` },
                });
                const json = await response.json();

                if (response.ok) {
                    dispatch({ type: 'SET_INVENTORY', payload: json });
                } else {
                    console.error('Failed to fetch inventory:', json.error);
                }
            } catch (error) {
                console.error('Error fetching inventory:', error);
            }
        };

        const fetchBookings = async () => {
            try {
                const response = await fetch('/api/leads/recent-bookings', {
                    headers: { 'Authorization': `Bearer ${userLG.token}` },
                });
                const json = await response.json();

                if (response.ok) {
                    dispatch({ type: 'SET_BOOKINGS', payload: json });
                } else {
                    console.error('Failed to fetch bookings:', json.error);
                }
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchInventory();
        fetchBookings();
    }, [dispatch, userLG]);

    if (!inventory || !recentBookings) {
        return <div>Loading...</div>;
    }

    const bookedCount = inventory.callDispositionCounts.Booked


    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

                <Box>
                    <Button
                        sx={{
                            backgroundColor: "#3e4396",
                            color: "#e0e0e0",
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                    >
                        <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                        Download Reports
          </Button>
                </Box>
            </Box>

            {/* GRID & CHARTS */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                {/* ROW 1 */}
                <Box
                    gridColumn="span 3"
                    backgroundColor="#141b2d"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={inventory.numberOfLeads}
                        subtitle="Total Leads"
                        progress="0.75"
                        increase="+14%"
                        icon={
                            <ContactsOutlined
                                sx={{ color: "#4cceac", fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor="#141b2d"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={inventory.numberOfUsers}
                        subtitle="Total Users"
                        progress="0.50"
                        increase="+21%"
                        icon={
                            <PeopleOutlined
                                sx={{ color: "#4cceac", fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor="#141b2d"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={inventory.numberOfAssignedLeads}
                        subtitle="Assigned Leads"
                        progress="0.30"
                        increase="+5%"
                        icon={
                            <AssignmentTurnedInIcon
                                sx={{ color: "#4cceac", fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor="#141b2d"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={inventory.numberOfUnassignedLeads}
                        subtitle="Available Leads"
                        progress="0.80"
                        increase="+43%"
                        icon={
                            <AssignmentIcon
                                sx={{ color: "#4cceac", fontSize: "26px" }}
                            />
                        }
                    />
                </Box>

                {/* ROW 2 */}

                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor="#1F2A40"
                    overflow="auto"
                >
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom={`4px solid #141b2d`}
                        colors="#e0e0e0"
                        p="15px"
                    >
                        <Typography color="#e0e0e0" variant="h5" fontWeight="600">
                            Recent Bookings
            </Typography>
                    </Box>
                    {recentBookings.map((booking) => (
                        <Box
                            key={booking._id}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`4px solid #141b2d`}
                            p="15px"
                        >
                            <Box>
                                <Typography color="#e0e0e0">
                                    {booking.telemarketerName}
                                </Typography>
                            </Box>
                            <Box color="#e0e0e0">{booking.leadName}</Box>
                            <Box
                                backgroundColor="#4cceac"
                                p="5px 10px"
                                borderRadius="4px"
                            >
                                {booking.callDisposition}
                            </Box>
                        </Box>
                    ))}
                </Box>

                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor="#1F2A40"
                    p="30px"
                >
                    <Typography variant="h5" fontWeight="600">
                        Booked
          </Typography>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mt="25px"
                    >
                        <ProgressCircle size="125" progress={bookedCount} />
                        <Typography
                            variant="h5"
                            color="#4cceac"
                            sx={{ mt: "15px" }}
                        >
                            {bookedCount} booked generated
            </Typography>
                        <Typography>Includes extra misc expenditures and costs</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default DashboardTabs
