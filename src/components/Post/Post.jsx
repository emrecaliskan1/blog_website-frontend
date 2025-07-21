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
import { Container, setRef } from '@mui/material';
import Comment from '../Comment/Comment';
import CommentForm from '../Comment/CommentForm';
import { PostWithAuth } from '../../Services/HttpService';

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
 
    const {title,text,username,userId,postId,likes} = props;
    const [expanded, setExpanded] = useState(false);
    const [refresh,setRefresh] = useState(false);
    const [error,setError] = useState(null);
    const [isLoaded,setIsLoaded] = useState(false);
    const [postList,setPostList] = useState([]);
    const [commentList,setCommentList] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount,setLikeCount] = useState(likes.length || 0);
    const [likeId,setLikeId] = useState(null);
    let disabled = localStorage.getItem("currentUser") === null ? true : false

    const setCommentRefresh = () => {
        setRefresh(true)
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
        refreshComments();
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
        if(!isLiked){
            saveLike();
            setLikeCount(likeCount + 1 );
        }
        else{
            deleteLike();
            setLikeCount(likeCount -1);
        }
    }

    const checkLikes = () => {
        var likeControl = likes.find((like => ""+like.userId === localStorage.getItem("currentUser")));
        if(likeControl != null){
            setLikeId(likeControl.id);
            setIsLiked(true);
        }
            
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
        setRefresh(false)
    }

    const saveLike = () => {
        PostWithAuth("http://localhost:8080/likes",{
            postId : postId,
            userId : localStorage.getItem("currentUser"),
        })
        //.then((res) => res.json())
        .catch((err) => console.log(err))
    }

    const deleteLike = () => {
        fetch("http://localhost:8080/likes/"+ likeId,{
            method : "DELETE",
            headers : {
                "Authorization" : localStorage.getItem("tokenKey"),
            }
        })
        .catch((err)=>console.log(err))
    }

    useEffect(() => {
        if (expanded) {
            refreshComments();
        }
    }, [refresh]);


    useEffect(()=> {
        checkLikes()
    },[])

    
    return(
        <div className='postContainer'>
             <Card  sx={{width: 950,textAlign:'left',margin:'10px'}}>
            <CardHeader
                avatar={
                    <Link className='link' to={{pathname:'/users/' + userId}}>
                        <Avatar sx={{ bgcolor: red[500] ,background:'linear-gradient(45deg,#2196F3 30%,#21CBF3 90%)'}} aria-label="recipe">
                        {username?.charAt(0).toUpperCase() || ''}</Avatar>
                    </Link>
                }
                title={title}
            />

            <CardContent>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {text}
                </Typography>

            </CardContent>

            <CardActions disableSpacing>
            {disabled ?  <IconButton 
            disabled
            onClick={handleLike} 
            aria-label="add to favorites">
                <FavoriteIcon style={isLiked?{color:'red'} : null}/>
                <IconButton>
                    {likeCount}
                </IconButton>
            </IconButton>
            :
            <IconButton 
            onClick={handleLike} 
            aria-label="add to favorites">
                <FavoriteIcon style={isLiked?{color:'red'} : null}/>
                <IconButton>
                    {likeCount}
                </IconButton>
            </IconButton> }

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
                <Comment  userId={comment.userId} username={comment.username} text={comment.text}></Comment>
               )) : "Loading"}

               {disabled ? "" : 
               <CommentForm userId={localStorage.getItem("currentUser")} username={localStorage.getItem("username")} postId={postId} setCommentRefresh={setCommentRefresh}></CommentForm>}
            </Container>

        </Collapse>

        </Card>
    </div>
    )
    
   
}

export default Post