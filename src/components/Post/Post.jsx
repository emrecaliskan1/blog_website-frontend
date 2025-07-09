import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import { Link } from 'react-router-dom';
import './Post.css'
import { Container } from '@mui/material';
import Comment from '../Comment/Comment';
import CommentForm from '../Comment/CommentForm';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Post(props) {
 
    const {title,text,userName,userId,postId} = props;
    const [expanded, setExpanded] = React.useState(false);
    const [liked,setLiked] = useState(false);

    const [error,setError] = useState(null);
    const [isLoaded,setIsLoaded] = useState(false);
    const [postList,setPostList] = useState([]);
    const [commentList,setCommentList] = useState([]);
    const isInitialMount = useRef(true);

    const handleExpandClick = () => {
        setExpanded(!expanded);
        refreshComments();
    };

    const handleLike = () => {
        setLiked(!liked);
    }

    const refreshComments = () => {
        if (!postId) return;
        fetch("http://localhost:8080/comments?postId="+postId)
        .then(res=>res.json())
        .then(
            (result) => {
                setIsLoaded(true)
                setCommentList(result)
            },
            (error) => {
                setIsLoaded(true)
                setError(error)}
        )
    }

    useEffect(() => {
        if (expanded) {
            refreshComments();
            console.log(commentList);
        }
    }, [expanded]);

    
    return(
        <div className='postContainer'>
             <Card  sx={{width: 950,textAlign:'left',margin:'10px'}}>
            <CardHeader
                avatar={
                    <Link className='link' to={{pathname:'/users/' + userId}}><Avatar sx={{ bgcolor: red[500] ,background:'linear-gradient(45deg,#2196F3 30%,#21CBF3 90%)'}} aria-label="recipe">
                        {userName.charAt(0).toUpperCase()}
                    </Avatar></Link>
                }
                title={title}
            />
            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {text}
                </Typography>

            </CardContent>
            <CardActions disableSpacing>

            <IconButton onClick={handleLike} aria-label="add to favorites">
                <FavoriteIcon style={liked?{color:'red'} : null}/>
            </IconButton>

            <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            >
            <InsertCommentIcon />
            </ExpandMore>

        </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
            
            <Container fixed className='container'>
               {error ? "error" : isLoaded ? commentList.map(comment=>(
                <Comment  userId={1} userName={"USER"} text={comment.text}></Comment>
               )) : "Loading"}
               <CommentForm userId={11} userName={"USER"} postId={postId}></CommentForm>
            </Container>

        </Collapse>

        </Card>
    </div>
    )
    
   
}

export default Post