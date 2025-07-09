import { Avatar, Button, CardContent, Input, InputAdornment, OutlinedInput } from '@mui/material';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './Comment.css'

function CommentForm(props) {

  const {userId,userName,postId} = props;
  const [text,setText] = useState('');

// const saveComment = async () => {
//   fetch("http://localhost:8080/comments",{
//     method:"POST",
//     headers:{
//       "Content-Type" : "application/json",
//     },
//     body:JSON.stringify({
//       postId:postId,
//       userId:userId,
//       text:text
//     }),
//   })
//   .then((res)=>res.json())
//   .catch((err)=>console.log(err))

//   }
  
const saveComment = async () => {
  try {
    const res = await fetch("http://localhost:8080/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        postId: postId,
        text: text,
      }),
    });

    if (!res.ok) {
      const text = await res.text(); // JSON değilse logla
      throw new Error("Hata: " + text);
    }

    const data = await res.json(); // artık güvenli
    console.log("Yorum başarıyla eklendi:", data);
  } catch (err) {
    console.log("Yorum eklenirken hata:", err.message);
  }
};


  const handleSubmit = () => {
      saveComment();
      setText('');
  }

  const handleChange = (value) => {
    setText(value)
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
                {userName.charAt(0).toUpperCase()}
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