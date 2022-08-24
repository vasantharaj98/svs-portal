import React, {useState} from 'react';
import { styled, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import CloseIcon from '@mui/icons-material/Close';
import ListItemText from '@mui/material/ListItemText';
import { School, DirectionsBus, AssignmentInd, AccountBalanceWallet } from '@mui/icons-material';
import { theme } from '../Themesetup';
import { Link } from 'react-router-dom';
import './style.css';


const drawerWidth = 240;

const menus = [
    {
        id : 1,
        icon : School,
        text : 'School',
        path : "/"

    },
    {
        id : 2,
        icon : DirectionsBus,
        text : 'Bus',
        path : "/bus"
    },
    {
        id : 3,
        icon : AssignmentInd,
        text : 'Student',
        path : "/student"
    },
    {
        id : 4,
        icon : AccountBalanceWallet,
        text : 'Fees',
        path : "/fees"
    }
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(10)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - 80px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {

  const [open, setOpen] = useState(false);
  const [selectindex, setSelectindex] = useState(0);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const selectedMenu = (index) => {
    setSelectindex(index);
    setOpen(false);
  };


  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{'&.MuiToolbar-root':{paddingLeft: 4}}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
           SVS School
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer  variant="permanent" open={open}  
      sx={{
        '& .MuiDrawer-paper': {
          background : '#000',
          color : '#fff',
          paddingRight: 1,
          paddingLeft: 1,
        },
      }}
      > 
        <DrawerHeader sx={{justifyContent : 'flex-start'}}>
          <IconButton onClick={handleDrawerClose} sx={{color : '#fff'}}>
            {theme.direction === 'rtl' ? <CloseIcon /> : <CloseIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menus.map((menu, index) => (
            <ListItem onClick={ () => selectedMenu (index) } className={ selectindex === index ? 'active' : ''} key={menu.id} disablePadding sx={{ display: 'block' }}>
              <Link to={menu.path}>
              <ListItemButton
                sx={{
                  minHeight: 70,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  marginBottom: 2
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color : '#fff'
                  }}
                >
                {< menu.icon />}
                </ListItemIcon>
                <ListItemText primary={menu.text} sx={{ opacity: open ? 1 : 0 , color: '#fff', textDecoration: 'none' }} />
              </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
    </ThemeProvider>
  );
}
