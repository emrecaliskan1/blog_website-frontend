import { Avatar, CardContent,  InputAdornment, OutlinedInput } from '@mui/material';
import { Link } from 'react-router-dom';
import './Comment.css'

function Comment(props) {

  const {text,userId,username} = props;

  return (
    <CardContent className='comment'>

        <OutlinedInput
          disabled
          id='outlined_adorment-amount'
          multiline
          inputProps={{maxLength : 200 }}
          fullWidth
          value={text}
          startAdornment={
            <InputAdornment position='start'>

              <Link className='link' to={{pathname:"/users/"+userId}}>
                
                <Avatar aria-label="recipe" className='small'>
                  {username.charAt(0).toUpperCase()}
                </Avatar>

              </Link>
              
            </InputAdornment>
        } style={{color:"black",backgroundColor:'white'}}
        ></OutlinedInput>

    </CardContent>
  )
}

export default Comment