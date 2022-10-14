import React, {useEffect, useState} from 'react';
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
import { Button } from '@mui/material';
import { School, DirectionsBus, AssignmentInd, AccountBalanceWallet, Discount,Settings, ArrowDropUp, ArrowDropDown  } from '@mui/icons-material';
import { theme } from '../Themesetup';
import { Link } from 'react-router-dom';
import './style.css';
import  Loader  from '../../Components/Loader/loader.js';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../actions/auth';


const drawerWidth = 240;

const menus = [
    {
        id : "student",
        icon :  AssignmentInd,
        text : 'Student',
        path : "/"
    },
    {
      id : "setting",
      icon : Settings,
      text : 'Setting',
      submenus : [
        {
          id : "busfees",
          icon : DirectionsBus,
          text : 'Bus Fees',
          path : "/busfees"
  
      },
      {
          id : "class",
          icon : School,
          text : 'Class',
          path : "/class"
      },
      {
        id : "discount",
        icon : Discount,
        text : 'Discount',
        path : "/discount"
    },
      {
          id : "academicfees",
          icon :  AccountBalanceWallet,
          text : 'Academic Fees',
          path : "/academic_fees"
      },
    ]
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

export default function MiniDrawer({auth, setAuth}) {

  const showLoader = useSelector((state)=> state.busfees.showLoading);

  const dispatch = useDispatch();

  console.log(showLoader);

  const [open, setOpen] = useState(false);
  const [selectid, setSelectid] = useState('');
  const [submenu, setSubmenu] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleLogout=()=>{
//     fetch('http://3.110.146.2/logout', {
//        method: 'PATCH', // or 'PUT'
//       //  mode: 'no-cors',
//       headers: {
//           'Content-Type': 'application/json',
//             },
// })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log('Success:', data);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });
      // setLoader(true);
      dispatch(signOut());
      // localStorage.removeItem("login");
      // setAuth(null);
      // if(setAuth(null)){
      //   setLoader(false);
      // }
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const selectedMenu = (id) => {
    setSelectid(id);
    setOpen(false);
  };

  useEffect ( () => {
    switch (window.location.pathname) {
      case "/":
       return setSelectid('student');
       case "/busfees":
        return setSelectid('busfees');
       case "/class":
        return setSelectid('class');
        case "/discount":
        return setSelectid('discount');
        case "/academic_fees":
        return setSelectid('academicfees');
      default:
        return setSelectid('student');
    }
  }, [selectid]);


  return (
    <ThemeProvider theme={theme}>

    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      { showLoader || loader && <Loader></Loader> }
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{'&.MuiToolbar-root':{paddingLeft: 4}}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{width:'100%'}}>
           SVS School
          </Typography>
          <div style={{width:'100%',textAlign: 'end'}}>
          <Button variant="outlined" sx={{color:'#fff', borderColor:'#fff'}} onClick={handleLogout}>Logout</Button>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer onMouseOver={handleDrawerOpen} onMouseLeave={handleDrawerClose}  variant="permanent" open={open}  
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
          <IconButton sx={{color : '#fff'}}>
            {theme.direction === 'rtl' ? <CloseIcon /> : <CloseIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menus.map((menu, index) => {
          
          return(
            <>
            { menu.path && 
            <ListItem onClick={ () => selectedMenu (menu.id) } className={ selectid === menu.id ? 'active' : ''} key={menu.id} disablePadding sx={{ display: 'block' }}>
            <Link to={ menu.path}>
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
          }
            {menu.id === "setting"
            &&
            <>
            <ListItem onClick={ () => setSubmenu(!submenu) } key={menu.id} disablePadding sx={{ display: 'block' }}>
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
                { !open &&
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color : '#fff'
                  }}
                >
                {submenu ? < ArrowDropUp /> : < ArrowDropDown />}
                </ListItemIcon>
                }
                <ListItemText primary={menu.text} sx={{ opacity: open ? 1 : 0 , color: '#fff', textDecoration: 'none' }} />
                { open && 
                <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color : '#fff'
                }}
              >
              {submenu ? < ArrowDropUp /> : < ArrowDropDown />}
              </ListItemIcon>
                }
              </ListItemButton>
            </ListItem>
            {submenu &&
            <>
            {menu.submenus.map((subm, index)=>{
              return (
                <>
                <ListItem onClick={ () => selectedMenu (subm.id) } className={ selectid === subm.id ? 'active' : ''} key={subm.id} disablePadding sx={{ display: 'block' }}>
                <Link to={ subm.path}>
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
                    {< subm.icon />}
                    </ListItemIcon>
                    <ListItemText primary={subm.text} sx={{ opacity: open ? 1 : 0 , color: '#fff', textDecoration: 'none' }} />
                  </ListItemButton>
                  </Link>
                </ListItem>
                </>
              )
             })}
             </>
             }
             </>
            }
            </>
          )})}
        </List>
      </Drawer>
    </Box>
    </ThemeProvider>
  );
}
