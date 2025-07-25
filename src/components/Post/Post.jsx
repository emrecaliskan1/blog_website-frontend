import { useEffect, useState } from 'react';
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
import { PostWithAuth } from '../../Services/HttpService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
 
    const {title,text,username,userId,postId,likes,createdAt} = props;
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

    const refreshComments = async () => {
        if (!postId) return;
        try {
            const res = await fetch(`${API_BASE_URL}/comments?postId=${postId}`);
            const result = await res.json();
            setIsLoaded(true);
            setCommentList(result);
        } catch (error) {
            setIsLoaded(true);
            setError(error);
        }
        setRefresh(false);
    };

    const saveLike = async () => {
        try {
            await PostWithAuth(`${API_BASE_URL}/likes`, {
                postId: postId,
                userId: localStorage.getItem("currentUser"),
            });
        } catch (err) {
            console.log(err);
        }
    };

    const deleteLike = async () => {
        if (!likeId) return;
        try {
            await fetch(`${API_BASE_URL}/likes/${likeId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": localStorage.getItem("tokenKey"),
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

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
            <Card className='post-card' sx={{width: 950,textAlign:'left',margin:'10px',position:'relative'}}>
                <span
                    style={{
                        position: 'absolute',
                        top: 16,
                        right: 24,
                        color: '#888',
                        fontSize: 13,
                        opacity: 0.7,
                        fontWeight: 500,
                        letterSpacing: 0.5,
                    }}
                    >
                    {createdAt ? new Date(createdAt).toLocaleString('tr-TR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                    }) : ''}
                </span>
            <CardHeader
                avatar={
                    <Link className='post-avatar-link' to={{pathname:'/users/' + userId}}>
                        <Avatar className='post-avatar' sx={{ bgcolor: red[500] ,background:'linear-gradient(45deg,#2196F3 30%,#21CBF3 90%)'}} aria-label="recipe">
                        {username?.charAt(0).toUpperCase() || ''}</Avatar>
                    </Link>
                }
                title={<span className="post-title">{title}</span>}
            />

            <CardContent className="post-content">

                <Typography variant="body2" >
                    {text}
                </Typography>

            </CardContent>

            <CardActions className="post-actions" disableSpacing>
                {disabled ?  
                <IconButton 
                    disabled
                    onClick={handleLike} 
                    aria-label="add to favorites">
                        <FavoriteIcon style={isLiked?{color:'red'} : null}/>

                        <span style={{ marginLeft: 6, fontWeight: 500, color: '#555', fontSize: 16 }}>
                            {likeCount}
                        </span>
                </IconButton>
                :
                <IconButton 
                    onClick={handleLike} 
                    aria-label="add to favorites">
                    <FavoriteIcon style={isLiked?{color:'red'} : null}/>
                     <span style={{ marginLeft: 6, fontWeight: 500, color: '#555', fontSize: 16 }}>
                        {likeCount}
                    </span>
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
                <Container fixed className='post-comments-container'>
                {error ? "error" : isLoaded ? commentList.map(comment=>(
                    <Comment  
                    key={comment.id}
                    userId={comment.userId} 
                    username={comment.username} 
                    text={comment.text}></Comment>
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