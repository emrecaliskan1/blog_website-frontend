import React, { useEffect, useState } from 'react'
import Post from '../Post/Post'
import { Container } from '@mui/material';
import './Home.css'
import PostForm from '../Post/PostForm';

function Home() {
   
    const [error,setError] = useState(null);
    const [isLoaded,setIsLoaded] = useState(false);
    const [postList,setPostList] = useState([]);

    useEffect(()=>{
        refreshPosts();
    },[])
    
    const refreshPosts = () => {
        fetch("http://localhost:8080/posts")
        .then(res=>res.json())
        .then(
            (result) => {
                setIsLoaded(true)
                setPostList(result)
            },
            (error) => {
                setIsLoaded(true)
                setError(error)}
        )
    }

    if(error){
        return <div>Error</div>
    }

    else if(!isLoaded){
        return <div>Loading</div>
    }

    else{
        return(
            <div className='container'>
                {localStorage.getItem("currentUser")=== null ? "" :  
                    <PostForm userId = {localStorage.getItem("currentUser")} userName={localStorage.getItem("username")} refreshPosts = {refreshPosts}/>} 
               {postList.map(post=>(     
                   <Post likes = {post.postLikes} postId={post.id} userId = {post.userId} userName={post.userName} title={post.title} text={post.text}
                   ></Post>        
                ))}
            </div>
        )
    }
  
}

export default Home