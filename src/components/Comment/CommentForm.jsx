import { Avatar, Button, CardContent, Input, InputAdornment, OutlinedInput } from '@mui/material';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './Comment.css'
import { PostWithAuth } from '../../Services/HttpService';

function CommentForm(props) {

  const {userId,username,postId,setCommentRefresh} = props;
  const [text,setText] = useState('');
  
  const saveComment = async () => {
    PostWithAuth("http://localhost:8080/comments",{
      postId:postId,
      userId:userId,
      text:text,
    })
    .then((res)=>res.json())
    .catch((err)=>console.log(err))
  };

  const handleSubmit = () => {
      saveComment();
      setText('');
      setCommentRefresh();
  }

  const handleChange = (value) => {
    setText(value);
  }

  return (

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
                style={{background:'linear-gradient(45deg,#2196F3 30%,#21CBF3 90%)',
                color : 'white' 
                }}
                onClick={handleSubmit}>
                Comment
            </Button>

          </InputAdornment>
        }
        value={text}
        style={{color:"black",backgroundColor:'white'}}
        ></OutlinedInput>

    </CardContent>
  )
}

export default CommentForm