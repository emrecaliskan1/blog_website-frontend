import React from 'react'
import { Link } from 'react-router-dom'
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



function Navbar() {

  let userId = 11;

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
          <Link className='link' to={{pathname:'/users/' + userId}}>User</Link>
        </Toolbar>
      </AppBar>
    </Box>
      
    </div>
  )


}

export default Navbar