import React from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@mui/material';
import './Navbar.css'
import { blue, orange } from '@mui/material/colors';
import { LockOpen } from '@mui/icons-material';



function Navbar({currentUser,setCurrentUser,username}) {

  let navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("tokenKey")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("username")
    localStorage.removeItem("refreshKey")
    if(setCurrentUser)
      setCurrentUser(null)
    //navigate("/auth")
  }

  return (
    <div> 
      <Box className='nav' sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor:'#3846ab'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link className='link' to="/">Home</Link>
          </Typography>

          <Typography variant='h6'>
           {currentUser == null ? <Link className='link' to={{pathname:'/auth'}}>Login/Register</Link> 
           : 
            <div> <IconButton onClick={Logout}><LockOpen></LockOpen></IconButton>
          <Link className='link' to={`/users/${currentUser}`}>Profile</Link> 
            </div>}
          </Typography>

        </Toolbar>
      </AppBar>
    </Box>
      
    </div>
  )


}

export default Navbar