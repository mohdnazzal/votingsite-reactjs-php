import { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Typography, Box, CssBaseline, Menu, MenuItem, useMediaQuery, Divider } from '@mui/material';
import Face6Icon from '@mui/icons-material/Face6';
import { Helmet } from 'react-helmet';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ListItemIcon from '@mui/material/ListItemIcon';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import Tooltip from '@mui/material/Tooltip';
import PollOptions from '../../components/common/User/PollOptions';
import PollSettings from '../../components/common/User/PollSettings';
import PollDeploy from '../../components/common/User/PollDeploy';
import PollsList from '../../components/common/User/PollsList';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

export default function Dashboard() {
    const [activeMenu, setActiveMenu] = useState('poll');
    const [activeSubMenu, setActiveSubMenu] = useState('createPoll');
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const navigate = useNavigate();
    const theme = createTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("is_login") === "true";
        if (!isLoggedIn) {
            navigate("/auth");
        }
    }, [navigate]);

    const toggleMenu = (menu) => {
        setActiveMenu(menu);
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

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <ThemeProvider theme={theme}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home Page</title>
            </Helmet>

            <Box sx={{ display: 'flex' }}>
                <CssBaseline />

                {/* Top Navbar */}
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        {isMobile && (
                            <IconButton color="inherit" onClick={toggleDrawer} edge="start">
                                <MenuIcon />
                            </IconButton>
                        )}
                        <Typography variant="h6" noWrap component="div">
                            User Dashboard
                        </Typography>
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
                    </Toolbar>
                </AppBar>

                {/* Sidebar Drawer */}
                <Drawer
                    variant={isMobile ? "temporary" : "permanent"}
                    open={!isMobile || drawerOpen}
                    onClose={toggleDrawer}
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
                <Box component="main" sx={{ flexGrow: 1, p: isMobile ? 1 : 3 }}>
                    <Toolbar />
                    {activeMenu && (
                        <Box sx={{ backgroundColor: '#f5f5f5', p: isMobile ? 1 : 2, borderRadius: 1 }}>
                            <Typography variant="h6" gutterBottom>
                                {activeMenu === 'poll' && 'Poll Menu'}
                                {activeMenu === 'polls' && 'Polls Menu'}
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
                                {activeMenu === 'poll' && (
                                    <>
                                        <Typography variant="body1">
                                            <a href="#options" onClick={() => handleSubMenuClick('createPoll')}>Options</a>
                                        </Typography>
                                        <Typography variant="body1">
                                            <a href="#settings" onClick={() => handleSubMenuClick('settings')}>Settings</a>
                                        </Typography>
                                        <Typography variant="body1">
                                            <a href="#share" onClick={() => handleSubMenuClick('deployShare')}>Deploy & Share</a>
                                        </Typography>
                                    </>
                                )}
                                {activeMenu === 'polls' && (
                                    <Typography variant="body1">
                                        <a href="#view" onClick={() => handleSubMenuClick('viewAll')}>View All</a>
                                    </Typography>
                                )}
                                {activeMenu === 'analytics' && <h3>Pro Only Features</h3>}
                            </Box>
                        </Box>
                    )}

                    {/* Content based on activeSubMenu */}
                    {activeSubMenu && (
                        <Box sx={{ mt: 4 }}>
                            {activeSubMenu === 'createPoll' && <PollOptions />}
                            {activeSubMenu === 'settings' && <PollSettings />}
                            {activeSubMenu === 'deployShare' && <PollDeploy />}
                            {activeSubMenu === 'viewAll' && <PollsList />}
                            {activeSubMenu === 'pollResults' && <div><Typography variant="h6">Subscription</Typography><p>Start with basic plan, only $9.99 per month!</p></div>}
                        </Box>
                    )}
                </Box>
            </Box>
        </ThemeProvider>
    );
}
