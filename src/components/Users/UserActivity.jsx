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
import './UserActivity.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PopUp(props) {

    const [open, setOpen] = React.useState(false);
    const [post, setPost] = useState();
    const {isOpen, postId, setIsOpen} = props;

    const getPost = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/posts/${postId}`, {
                method: "GET",
                headers: {
                    "Authorization": localStorage.getItem("tokenKey"),
                    "Content-Type": "application/json"
                }
            });
            const result = await res.json();
            setPost(result);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=>{
            getPost();
        },[postId])

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
    
    return(
        <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
            
        </Button>
        <Dialog
            BackdropProps={{
                style: { backgroundColor: "rgba(0,0,0,0.4)" }
            }}
            PaperProps={{
            className: "user-activity-modal-paper"
            }}
            maxWidth="sm"
            fullWidth
            open={open}
            onClose={handleClose}
            slots={{
            transition: Transition,
            }}
        >
            <AppBar 
                position="static"
                sx={{ backgroundColor: "#2a6078", borderRadius: "16px 16px 0 0" }}
                elevation={0}
            >
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

            <div style={{ padding: 24, minWidth: 350, maxWidth: 600 }}>
                    {post && (
                        <Post
                            likes={post.postLikes}
                            postId={post.id}
                            userId={post.userId}
                            username={post.username || post.user?.username}
                            title={post.title}
                            text={post.text}
                        />
                    )}
                </div>

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
        fetch(`${API_BASE_URL}/users/activity/${userId}`,{
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
            },
            (error)=>{
                setIsLoaded(true)
                setError(error)
            }
        )
    }

    useEffect(() => {
        getActivity()
    },[])

    return (
    <div className="user-activity-root">
    {isOpen? <PopUp isOpen={isOpen} postId={selectedPost} setIsOpen={setIsOpen}/>: ""}
    <Paper className="user-activity-table-paper">
      <TableContainer sx={{
                        maxHeight: 440,
                        minWidth: 100,
                        maxWidth: 800,
                        marginTop: 5,
                    }}
                    className="user-activity-table-container">
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableCell
                align="center"
                colSpan={1}
                style={{
                    fontWeight: 700,
                    fontSize: 22,
                    color: "#3846ab",
                    background: "#f4f7fb",
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    letterSpacing: 1.2,
                    padding: "24px 0 18px 0"
                }}
            >
                <span style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <span style={{marginRight: 8}}>📝</span>
                    User Activity
                </span>
            </TableCell>
          </TableHead>

          <TableBody>
             {rows
                .sort((a, b) => {
                const dateA = Array.isArray(a) ? new Date(a[3]) : new Date(a.createdAt);
                const dateB = Array.isArray(b) ? new Date(b[3]) : new Date(b.createdAt);
                return dateB - dateA;
                })
            .map((row, index) => {
                if (Array.isArray(row)) {
                    return (
                        <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={index}
                            onClick={() => handleNotification(row[1])}
                            sx={{ cursor: "pointer" }}
                        >
                        <TableCell align="center">
                            <div style={{ display: 'flex', justifyContent: 'center',position:'relative', alignItems: 'center' , width:'100%'}}>
                                <span>{(row[2] || "Someone") + " " + (row[0] || "liked") + " your post"}</span>
                                <span style={{ 
                                    position:'absolute',
                                    color: '#888', 
                                    fontSize: 12, 
                                    opacity: 0.7,
                                    marginLeft: 16 
                                }}>
                                {row[3] ? new Date(row[3]).toLocaleString('tr-TR', {
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                }) : ''}
                                </span>
                            </div>
                        </TableCell>
                        </TableRow>
                   );
                    } else { 
                        return (
                         <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={index}
                            onClick={() => handleNotification(row.id)}
                            sx={{ cursor: "pointer" }}
                        >
                        <TableCell align="center">
                            <div style={{ display: 'flex', justifyContent: 'center',width:'100%', alignItems: 'center',position:'relative' }}>
                                <span>{(row?.user?.username || row?.username || "Someone") + " shared a post: " + (row.title || "Untitled")}</span>
                                <span style={{ 
                                    color: '#888', 
                                    fontSize: 12, 
                                    opacity: 0.7,
                                    marginLeft:20
                                }}>
                                {row.createdAt ? new Date(row.createdAt).toLocaleString('tr-TR', {
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                }) : ''}
                                </span>
                            </div>
                         </TableCell>
                        </TableRow>
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