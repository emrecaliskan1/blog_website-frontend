import { Avatar, Button, CardContent, Input, InputAdornment, OutlinedInput } from '@mui/material';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Comment.css'
import './CommentForm.css'
import { PostWithAuth, RefreshToken } from '../../Services/HttpService';

function CommentForm(props) {

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
    PostWithAuth("http://localhost:8080/comments", {
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
            res.json()
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
  )
}

export default CommentForm