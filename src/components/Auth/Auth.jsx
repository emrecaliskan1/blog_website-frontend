import { Alert, Button, FormControl, FormHelperText, Input, InputLabel, TextField } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {PostWithoutAuth } from '../../Services/HttpService';
import './Auth.css'

function Auth({setCurrentUser,setUsername}) {

    const navigate = useNavigate();
    const [username, setUsernameLocal] = useState('');
    const [password,setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleUsername = (value) => {
        setUsernameLocal(value)
    }

    const handlePassword = (value) => {
        setPassword(value)
    }

    const handleButton = (path) => {
        if (!username.trim() || !password.trim()) {
            setErrorMessage("Username and password cannot be empty!");
            return;
        }
        sendRequest(path)
        setUsernameLocal("")
        setPassword("")
    }


    const sendRequest = (path) => {
        PostWithoutAuth("http://localhost:8080/auth/" + path,{
            username : username,
            password:password,
        })
         .then((res)=>res.json())
         .then((result) => {
                if (result.accessToken) {
                    localStorage.setItem("tokenKey", result.accessToken)
                    localStorage.setItem("refreshKey", result.refreshToken)
                    localStorage.setItem("currentUser", result.userId)
                    localStorage.setItem("username", username)
                    if (setCurrentUser) setCurrentUser(result.userId)
                    if (setUsername) setUsername(username)
                    setErrorMessage("")
                    if (path === 'login') navigate("/")
                } else {
                    setErrorMessage(result.message || "Username or password is incorrect!");
                }
            })
         .catch(() => {
                setErrorMessage("An error occurred. Please try again.");
            })
    }
    

  return (
    <div className='auth-root'>
        <FormControl className="auth-form">

            {errorMessage && (
                    <Alert severity="error" className="auth-error" >
                        {errorMessage}
                    </Alert>
                )}

              <TextField
                className="auth-input"
                label="Username"
                variant="outlined"
                value={username}
                onChange={(i) => handleUsername(i.target.value)}
                margin="normal"
                fullWidth
            />
            <TextField
                className="auth-input"
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(i) => handlePassword(i.target.value)}
                margin="normal"
                fullWidth
            />
            
            <Button 
                variant='contained'
                className="auth-button"
                onClick={()=>handleButton("register")}>
                REGISTER
            </Button>
           
            <FormHelperText className="auth-helper">Are you already registered?</FormHelperText>
            
            <Button 
            variant='contained'
            className="auth-button"
            onClick={()=>handleButton("login")}>
                LOGIN
            </Button>

        </FormControl>
    </div>
  )
}

export default Auth