import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { Button, InputAdornment, OutlinedInput } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './PostForm.css'


function PostForm(props) {

    const {username,userId,refreshPosts} = props;
    const [text,setText] = useState('');
    const [title,setTitle] = useState('');
    const [isSent,setIsSent] = useState(false);
    const [open, setOpen] = React.useState(false);

    const savePost = async() => {
        try {
        const response = await fetch("http://localhost:8080/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : localStorage.getItem("tokenKey")
            },
            body: JSON.stringify({
                title: title,
                userId: userId,
                text: text,
            }),
        });

        if (response.ok) {
            await refreshPosts();
            setIsSent(true);
            setText('');
            setTitle('');
            handleClick();
        } else {
            console.log("Post işlemi başarısız");
        }
    } catch (err) {
        console.log(err);
    }
    }
    
    const handleSubmit = () => {
       savePost();
    }

    const handleTitle = (value) => {
        setTitle(value);
        setIsSent(false);
    }

    const handleText = (value) => {
        setText(value);
        setIsSent(false);
    }

    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };


  const action = (
    <React.Fragment>
      <Button color="inherit" size="large" onClick={handleClose}>
      </Button> 
      <IconButton
        size="large"
        aria-label="close"
        color="default"
        onClick={handleClose}
      >
        <CloseIcon fontSize="medium" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className='postForm-root'>
         <Snackbar
                open={open}
                autoHideDuration={1000}
                onClose={handleClose}
                message="Post is succesfull!"
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
         <div className='postContainer'>
            <Card className='postForm-card' sx={{width:1000,textAlign:'left',margin:'9px'}}>
            <CardHeader
                avatar={
                    <Link className='link' to={{pathname:'/users/' + userId}}>
                        <Avatar className="postForm-avatar" sx={{ bgcolor: red[500],background:'linear-gradient(45deg,#2196F3 30%,#21CBF3 90%)' }} aria-label="recipe">
                        {username.charAt(0).toUpperCase()}
                    </Avatar></Link>
                }
                title= {<OutlinedInput 
                    className="postForm-titleInput"
                    id='outlined_adorment-amount'
                    multiline
                    placeholder='Title'
                    inputProps={{maxLength : 30 }}
                    fullWidth
                    value = {title}
                    onChange={ (input) => handleTitle(input.target.value)}/>}
            />
            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {<OutlinedInput 
                    className="postForm-textInput"
                    id='outlined_adorment-amount'
                    multiline
                    placeholder='Text'
                    inputProps={{maxLength : 200 }}
                    fullWidth
                    value={text}
                    onChange={ (input) => handleText(input.target.value)}
                    endAdornment = {
                        <InputAdornment position='end'>
                            <Button
                            className="postForm-button"
                            variant='contained'
                            style={{background:'linear-gradient(45deg,#2196F3 30%,#21CBF3 90%)',
                                color : 'white' 
                            }}
                            onClick={handleSubmit}
                             >Post</Button>
                        </InputAdornment>
                    } />}
                </Typography>

            </CardContent>
          
        </Card>
    </div>
    </div>
  )
}




export default PostForm