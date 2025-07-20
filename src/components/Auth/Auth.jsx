import { Button, FormControl, FormHelperText, Input, InputLabel } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Auth() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password,setPassword] = useState('');

    const handleUsername = (value) => {
        setUsername(value)
    }

    const handlePassword = (value) => {
        setPassword(value)
    }

    const handleButton = (path) => {
        sendRequest(path)
        setUsername("")
        setPassword("")
        if(path === 'login')
            navigate("/")
    }


    const sendRequest = (path) => {
         fetch("http://localhost:8080/auth/" + path,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({
                username : username,
                password:password,
            }),
         })
         .then((res)=>res.json())
         .then((result) => {localStorage.setItem("tokenKey",result.message)
                            localStorage.setItem("currentUser",result.userId)
                            localStorage.setItem("username",username)})
         .catch((err)=> console.log(err))
    }
    

  return (
    <div style={{marginTop:'60px',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <FormControl >
            <InputLabel>Username</InputLabel>
            <Input onChange={(i)=>handleUsername(i.target.value)}/>
            <InputLabel style={{top:80}}>Passsword</InputLabel>
            <Input onChange={(i)=>handlePassword(i.target.value)}/>
            
            <Button 
            variant='contained'
            style={{marginTop:60,background:'linear-gradient(45deg,#2196F3 30%, #21CBF3 90%)',color:'white'}}
            onClick={()=>handleButton("register")}
            >
                REGISTER
            </Button>
           
            <FormHelperText style={{margin:20}}>Are you already registered?</FormHelperText>
            
            <Button 
            variant='contained'
            style={{marginTop:-5,background:'linear-gradient(45deg,#2196F3 30%, #21CBF3 90%)',color:'white'}}
            onClick={()=>handleButton("login")}
            >
                LOGIN
            </Button>
        </FormControl>
    </div>
  )
}

export default Auth