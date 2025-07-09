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


function PostForm(props) {

    const {userName,userId,refreshPosts} = props;
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
        UNDO
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
    <div>
         <Snackbar
                open={open}
                autoHideDuration={1000}
                onClose={handleClose}
                message="Post is succesfull!"
                action={action}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                 ContentProps={{
                    sx: {
                        background: '##7feb94',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        }
                    }}
                />
         <div className='postContainer'>
             <Card  sx={{width:1000,textAlign:'left',margin:'9px'}}>
            <CardHeader
                avatar={
                    <Link className='link' to={{pathname:'/users/' + userId}}><Avatar sx={{ bgcolor: red[500],background:'linear-gradient(45deg,#2196F3 30%,#21CBF3 90%)' }} aria-label="recipe">
                        {userName.charAt(0).toUpperCase()}
                    </Avatar></Link>
                }
                title= {<OutlinedInput 
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