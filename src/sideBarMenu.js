
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
import FreeTools from "./freeTools";


const severityColors = {
    Medium: "orange",
    Critical: "purple",
};

const SidebarMenu = () => {
    const [open, setOpen] = useState(true);
    const [scanMenuOpen, setScanMenuOpen] = useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const toggleScanMenu = () => {
        setScanMenuOpen(!scanMenuOpen);
    };


    return (
        <Box sx={{ display: "flex" }}>

            <Drawer
                variant="permanent"
                open={open}
                sx={{
                    width: open ? 240 : 70,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: open ? 240 : 70,
                        boxSizing: "border-box",
                        transition: "width 0.3s",
                    },
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2 }}>
                    {open && <img src="/assets/s4e.png" alt="s4eLogo" style={{ height: 40 }} />}
                    <IconButton onClick={toggleDrawer} sx={{ color: "gray" }}>
                        <MenuIcon />
                    </IconButton>
                </Box>

                <List>
                    <ListItem button>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        {open && <ListItemText primary="Dashboard" />}
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <LockIcon />
                        </ListItemIcon>
                        {open && <ListItemText primary="Asset Manager" />}
                    </ListItem>

                    <ListItem button onClick={toggleScanMenu}>
                        <ListItemIcon>
                            <ScanIcon />
                        </ListItemIcon>
                        {open && (
                            <>
                                <ListItemText primary="Scan Manager" />
                                {scanMenuOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </>
                        )}
                    </ListItem>
                    {scanMenuOpen && open && (
                        <Box sx={{ pl: 4 }}>
                            <ListItem button>
                                <ListItemText primary="Start Scan" />
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary="Scan Activities" />
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary="AI Based Scan Generator" />
                            </ListItem>
                        </Box>
                    )}

                    <Divider />

                    <ListItem button>
                        <ListItemIcon>
                            <ReportsIcon />
                        </ListItemIcon>
                        {open && <ListItemText primary="Outputs" />}
                    </ListItem>
                </List>

                <Box sx={{ mt: "auto", p: 2 }}>
                    {open && <Typography variant="caption" align="center">v3.6.0</Typography>}
                </Box>
            </Drawer>
            <FreeTools/>
        </Box>
    );
};

export default SidebarMenu;
