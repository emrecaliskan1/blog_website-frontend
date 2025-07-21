import React, { useEffect, useState ,forwardRef} from 'react'
import { useParams } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import Post from '../Post/Post';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PopUp(props) {

    const [open, setOpen] = React.useState(false);
    const [post, setPost] = useState();
    const {isOpen, postId, setIsOpen} = props;

    const getPost = () => {
        fetch("http://localhost:8080/posts/" + postId, {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem("tokenKey"),
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                setPost(result);
            },
            (error) => {
                console.log(error);
            }
        );
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setIsOpen(false);
    };

    useEffect(()=>{
        setOpen(isOpen)
    },[isOpen])
    

    useEffect(()=>{
        getPost();
    },[postId])

    return(
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        slots={{
          transition: Transition,
        }}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Close
            </Typography>
          </Toolbar>
        </AppBar>

        {post && (
            <Post 
                likes = {post.postLikes}
                postId={post.id} 
                userId={post.userId} 
                username={post.username || post.user?.username}
                title={post.title} 
                text={post.text} 
            />
        )}

      </Dialog>
    </React.Fragment>
    )
}


function UserActivity(props) {

    const [error,setError] = useState(null)
    const [isLoaded , setIsLoaded] = useState(false)
    const [rows,setRows] = useState([]);
    const {userId} = props;
    const [isOpen, setIsOpen] = useState();
    const [selectedPost, setSelectedPost] = useState();

    const handleNotification = (postId) => {
        setSelectedPost(postId);
        setIsOpen(true);
    };

    const getActivity = () => {
        fetch("http://localhost:8080/users/activity/" + userId,{
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : localStorage.getItem("tokenKey"),
            },
        })
        .then((res)=> res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setRows(result)
                console.log(result)
            },
            (error)=>{
                console.log(error)
                setIsLoaded(true)
                setError(error)
            }
        )
    }

    useEffect(() => {
        getActivity()
    },[])

    return (
    <div>
    {isOpen? <PopUp isOpen={isOpen} postId={selectedPost} setIsOpen={setIsOpen}/>: ""}
    <Paper  sx={{ width: '100%',}}>
      <TableContainer sx={{
                        maxHeight: 440,
                        minWidth: 100,
                        maxWidth: 800,
                        marginTop: 5,
                    }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                User Activity
            </TableRow>
          </TableHead>

          <TableBody>

             {rows.map((row, index) => {
                if (Array.isArray(row)) { 
                    return (
                        <Button onClick={() => handleNotification(row[1])} key={index} sx={{ width: '100%', padding: 0 }}>

                        <TableRow hover role="checkbox" tabIndex={-1}>
                            <TableCell align="right">
                                {row[2] + " " + row[0] + " your post"}
                            </TableCell>
                        </TableRow>

                        </Button>
                    );
                } else { 
                    return (
                        <Button onClick={() => handleNotification(row.id)} key={index} sx={{ width: '100%', padding: 0 }}>

                        <TableRow hover role="checkbox" tabIndex={-1}>
                            <TableCell align="right">
                            {row?.user?.username + " shared a post: " + row.title}
                            </TableCell>
                        </TableRow>

                        </Button>
                    );
                }
            })}
          </TableBody>

        </Table>
      </TableContainer>
    </Paper>
    </div>
    )
}

export default UserActivity