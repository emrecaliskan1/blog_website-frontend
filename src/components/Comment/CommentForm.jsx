import { Avatar, Button, CardContent, Input, InputAdornment, OutlinedInput } from '@mui/material';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './Comment.css'
import './CommentForm.css'
import { PostWithAuth, RefreshToken } from '../../Services/HttpService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function CommentForm(props) {

  const [open, setOpen] = useState(false);
  const {userId,username,postId,setCommentRefresh} = props;
  const [text,setText] = useState('');
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("tokenKey")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("username")
    localStorage.removeItem("refreshKey")
    navigate("/auth")
  }
  
  const saveComment =  () => {
    PostWithAuth(`${API_BASE_URL}/comments`, {
      postId: postId,
      userId: userId,
      text: text,
    })
    .then((res) => {
            if(!res.ok) {
                RefreshToken()
                .then((res) => { if(!res.ok) {
                    Logout();
                } else {
                   return res.json()
                }})
                .then((result) => {
                    console.log(result)

                    if(result != undefined){
                        localStorage.setItem("tokenKey",result.accessToken);
                        saveComment();
                        setCommentRefresh();
                    }})
                .catch((err) => {
                    console.log(err)
                })
            } else 
            res.json().then(()=>handleSuccess())
        })
          .catch((err) => {
            console.log(err)
          })
    }


  const handleSubmit = () => {
      saveComment();
      setText('');
      setCommentRefresh();
  }

  const handleChange = (value) => {
    setText(value);
  }

  const handleSuccess = () => {
    setOpen(true);
    setText('');
    setCommentRefresh();
  };

  const handleClose = (reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="large"
        aria-label="close"
        color="default"
        onClick={handleClose}>
        <CloseIcon fontSize="medium" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
    <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        message="Comment is succesfull!"
        action={action}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        ContentProps={{
          sx: {
            background: 'linear-gradient(90deg, #59e1a6ff 0%, #399166ff 100%)',
            color: 'white',
            fontWeight: 600,
            fontSize: '16px',
            borderRadius: '12px',
            boxShadow: '0 4px 24px 0 rgba(46, 96, 120, 0.13)',
            px: 3,
            py: 2,
            letterSpacing: 1,
            border: '2px solid #eaf6f9ff'
          }
        }}
      />

    <CardContent className='comment'>
        
        <OutlinedInput
        id='outlined_adorment-amount'
        multiline
        inputProps={{maxLength : 200 }}
        fullWidth 
        onChange={(i)=> handleChange(i.target.value)}
        startAdornment={
         <InputAdornment position='start'>
            
            <Link className='link' to={{pathname:"/users/"+userId}}>
              
              <Avatar aria-label="recipe" className='small'>
                {username.charAt(0).toUpperCase()}
              </Avatar>

            </Link>

          </InputAdornment>
        } 

        endAdornment = {
          <InputAdornment position='end' >

            <Button
                variant='contained'
                className='commentForm-button'
                onClick={handleSubmit}>
                Comment
            </Button>

          </InputAdornment>
        }
        value={text}
        style={{color:"black",backgroundColor:'white'}}
        ></OutlinedInput>

    </CardContent>
    </>
  )
}

export default CommentForm