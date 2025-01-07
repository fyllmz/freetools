
import React, { useState, useEffect } from "react";
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    IconButton,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Tabs,
    Tab,
    Chip,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LockIcon from "@mui/icons-material/Lock";
import ScanIcon from "@mui/icons-material/QrCodeScanner";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReportsIcon from "@mui/icons-material/Description";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";


const severityColors = {
    Medium: "orange",
    Critical: "purple",
};

const FreeTools = () => {
    const [open, setOpen] = useState(true);
    const [scanMenuOpen, setScanMenuOpen] = useState(false);
    const [scans, setScans] = useState([]);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const toggleScanMenu = () => {
        setScanMenuOpen(!scanMenuOpen);
    };


    const fetchScans = async () => {
        try {

            const response = await axios.post('http://localhost:5000/api/scan/list', {
                query: "cve",
                scan_parent_id: 1,
                min_score: 0,
                max_score: 10,
                page: 1,
                per_page: 30,
                tag_slug: "web_scan_tools",
                precondition_status: 2,
                scan_category_id: 1,
                token: "ercNkIcW6BNQ3VjE6F0SrG_MxbTIWdx72o9jjicvQ7wlQEuNrYuLWPDrVtNGxfjQn6wtH0vzhTcZCWaPlN8qQQ",
            });
            setScans(response.data.value.data);
        } catch (error) {
            console.error("Error fetching scan data:", error);
        }
    };
    const fetchLogs = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/scan/get-activity-logs', {
                slug: "slug",
                token: "ercNkIcW6BNQ3VjE6F0SrG_MxbTIWdx72o9jjicvQ7wlQEuNrYuLWPDrVtNGxfjQn6wtH0vzhTcZCWaPlN8qQQ",
            });
            console.log("Logs:", response.data.value);
        } catch (error) {
            console.error("Error fetching activity logs:", error);
        }
    };





    const startGroupScan = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/scan/start-group-scan', {
                asset: "s4e.io",
                category_ids: [1, 2, 3, 4, 5, 6, 7, 8],
                slug: "half-scan",
                token: "ercNkIcW6BNQ3VjE6F0SrG_MxbTIWdx72o9jjicvQ7wlQEuNrYuLWPDrVtNGxfjQn6wtH0vzhTcZCWaPlN8qQQ",
            });

            console.log('Response:', response.data);
            if (response.data.code === 200) {
                console.log('Scan started successfully:', response.data.value.slug);
            } else {
                console.error('Failed to start scan:', response.data.message);
            }
        } catch (error) {
            console.error('Error starting scan:', error.response ? error.response.data : error.message);
        }
    };

    const startSingleScan = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/scan/start-group-scan', {
                asset: "s4e.io",
                category_ids: [1, 2, 3, 4, 5, 6, 7, 8],
                slug: "half-scan",
                token: "ercNkIcW6BNQ3VjE6F0SrG_MxbTIWdx72o9jjicvQ7wlQEuNrYuLWPDrVtNGxfjQn6wtH0vzhTcZCWaPlN8qQQ",
            });

            console.log('Response:', response.data);
            if (response.data.code === 200) {
                console.log('Scan started successfully:', response.data.value.slug);
            } else {
                console.error('Failed to start scan:', response.data.message);
            }
        } catch (error) {
            console.error('Error starting scan:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchScans();
        startGroupScan();
        fetchLogs();
    }, []);

    return (

        <div style={{ backgroundColor: "white" }}>
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h4" sx={{ marginBottom: 3, textAlign: "left" }}>
                    Free Tools
                </Typography>


                <Box sx={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
                    <Tabs value={0} indicatorColor="primary" textColor="primary" sx={{ flex: 1 }}>
                        <Tab label="All" />
                        <Tab label="Asset Owner" />
                        <Tab label="Everyone" />
                        <Tab label="AI Scans" />
                    </Tabs>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
                    <TextField
                        variant="outlined"
                        placeholder="Search"
                        size="small"
                        sx={{ flex: 1, marginRight: 2 }}
                    />
                </Box>


                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Severity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {scans.map((scan, index) => (
                                <TableRow key={index}>
                                    <TableCell>{scan.name}</TableCell>
                                    <TableCell>{scan.mini_desc || scan.auto_desc}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={scan.score}
                                            sx={{
                                                backgroundColor: severityColors[scan.score > 5 ? 'Critical' : 'Medium'],
                                                color: "white",
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    );
};

export default FreeTools;
