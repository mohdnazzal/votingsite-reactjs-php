import { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Typography, Box, CssBaseline, Menu, MenuItem } from '@mui/material';
import Face6Icon from '@mui/icons-material/Face6';
import {Helmet} from 'react-helmet';
import ListItemIcon from '@mui/material/ListItemIcon';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import Tooltip from '@mui/material/Tooltip';
import PollOptions from '../../components/common/User/PollOptions';
import PollSettings from '../../components/common/User/PollSettings';
import PollDeploy from '../../components/common/User/PollDeploy';
import PollsList from '../../components/common/User/PollsList';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [activeMenu, setActiveMenu] = useState('poll');
    const [activeSubMenu, setActiveSubMenu] = useState('createPoll'); // Initialize with the first submenu of 'poll'
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
      const isLoggedIn = localStorage.getItem("is_login") === "true";
  
      if (!isLoggedIn) {
        // Redirect to login page if not logged in
        navigate("/auth");
      }
    }, [navigate]);

    const toggleMenu = (menu) => {
        setActiveMenu(menu);
        // Automatically set the first submenu when switching main menu
        if (menu === 'poll') {
            setActiveSubMenu('createPoll');
        } else if (menu === 'polls') {
            setActiveSubMenu('viewAll');
        } else if (menu === 'analytics') {
            setActiveSubMenu('pollResults');
        }
    };

    const handleSubMenuClick = (submenu) => {
        setActiveSubMenu(submenu);
    };

    const handleProfileClick = (event) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleProfileClose = () => {
        setMenuAnchorEl(null);
        navigate("/auth/logout");

    };

    return (
        <>
         <Helmet>
          <meta charSet="utf-8" /> {/* Sets the character encoding for the document */}
          <title>Home Page</title> {/* Sets the title of the page */}
        </Helmet>

        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* Top Navbar */}
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6" noWrap component="div">
                        User Dashboard
                    </Typography>
                    <div>
                        <IconButton color="inherit" onClick={handleProfileClick}>
                            <Face6Icon />
                        </IconButton>
                        <Menu
                            anchorEl={menuAnchorEl}
                            open={Boolean(menuAnchorEl)}
                            onClose={handleProfileClose}
                        >
                            <MenuItem onClick={handleProfileClose}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>

            {/* Drawer Sidebar */}
            <Drawer
                variant="permanent"
                open
                sx={{
                    width: 240,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListItem button selected={activeMenu === 'poll'} onClick={() => toggleMenu('poll')}>
                            <ListItemText primary="Create New Poll" />
                        </ListItem>
                        <ListItem button selected={activeMenu === 'polls'} onClick={() => toggleMenu('polls')}>
                            <ListItemText primary="Polls" />
                        </ListItem>
                        <ListItem button selected={activeMenu === 'analytics'} onClick={() => toggleMenu('analytics')}>
                          <Tooltip title="Pro Only Feature" arrow>
                            <span>
                                <ListItem button disabled>
                                <ListItemText primary="Analytics" />
                                <ListItemIcon>
                                    <RocketLaunchIcon style={{ color: 'gold' }} />
                                </ListItemIcon>
                                </ListItem>
                            </span>
                          </Tooltip>                       
                     </ListItem>
                    </List>
                </Box>
            </Drawer>

            {/* Main Content Area */}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {/* Submenu based on activeMenu */}
                {activeMenu && (
                    <Box sx={{ backgroundColor: '#f5f5f5', p: 2, borderRadius: 1 }}>
                        <Typography variant="h6" gutterBottom>
                            {activeMenu === 'poll' && 'Poll Menu'}
                            {activeMenu === 'polls' && 'Polls Menu'}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            {activeMenu === 'poll' && (
                                <>
                                    <Typography variant="body1">
                                        <a href="#options" className="nav-link" onClick={() => handleSubMenuClick('createPoll')}>
                                            Options
                                        </a>
                                    </Typography>
                                    <Typography variant="body1">
                                        <a href="#settings" className="nav-link" onClick={() => handleSubMenuClick('settings')}>
                                            Settings
                                        </a>
                                    </Typography>
                                    <Typography variant="body1">
                                        <a href="#share" className="nav-link" onClick={() => handleSubMenuClick('deployShare')}>
                                            Deploy & Share
                                        </a>
                                    </Typography>
                                </>
                            )}
                            {activeMenu === 'polls' && (
                                <>
                                    <Typography variant="body1">
                                        <a href="#view" className="nav-link" onClick={() => handleSubMenuClick('viewAll')}>
                                            View All
                                        </a>
                                    </Typography>
                                </>
                            )}
                            {activeMenu === 'analytics' && (
                                <>
                                    <h3>Pro Only Features</h3>
                                </>
                            )}
                        </Box>
                    </Box>
                )}

                {/* Content based on activeSubMenu */}
                {activeSubMenu && (
                    <Box sx={{ mt: 4 }}>
                        {activeSubMenu === 'createPoll' && (
                            <div>
                                <Typography variant="h6">Poll Options</Typography>
                                <p>Fill in the details to create a new poll.</p>
                                <PollOptions/>

                            </div>
                        )}
                        {activeSubMenu === 'settings' && (
                            <div>
                                <Typography variant="h6">Poll Settings</Typography>
                                <p>Adjust the settings for your poll.</p>
                                <PollSettings/>
                            </div>
                        )}
                        {activeSubMenu === 'deployShare' && (
                            <div>
                                <Typography variant="h6">Deploy & Share</Typography>
                                <p>Get the link to share your poll and deploy it.</p>
                                <PollDeploy/>
                            </div>
                        )}
                        {activeSubMenu === 'viewAll' && (
                            <div>
                                <Typography variant="h6">View All Polls</Typography>
                                <p>Browse through all the existing polls.</p>
                                <PollsList/>
                            </div>
                        )}
                        {activeSubMenu === 'pollResults' && (
                            <div>
                                <Typography variant="h6">Subscription</Typography>
                                <p>Start with basic plan, only $9.99 per month!</p>
                            </div>
                        )}
                    </Box>
                )}
            </Box>
        </Box>
        </>


    );
}
