import React, { useEffect, useState } from 'react'
import Post from '../Post/Post'
import { Alert, CircularProgress, Container } from '@mui/material';
import './Home.css'
import PostForm from '../Post/PostForm';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Home() {
   
    const [error,setError] = useState(null);
    const [isLoaded,setIsLoaded] = useState(false);
    const [postList,setPostList] = useState([]);

    useEffect(()=>{
        refreshPosts();
    },[])
    
    const refreshPosts = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/posts`);
            const result = await res.json();
            setIsLoaded(true);
            setPostList(result);
            console.log(result)
        } catch (error) {
            setIsLoaded(true);
            setError(error);
        }
    };

    if(error){
        return (
        <div style={{
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Alert severity="error" sx={{ fontSize: 18, borderRadius: 2, px: 4, py: 2 }}>
            Bir hata oluştu. Lütfen tekrar deneyin.
            </Alert>
      </div>
    );
    }

    else if(!isLoaded){
        return (
            <div style={{
                minHeight: "60vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
             }}>
            <CircularProgress size={60} thickness={5} sx={{ color: "#2a6078" }} />
        </div>
        )
    }

    else{
        const sortedPosts = [...postList].sort((a, b) => new Date(a.create_date) - new Date(b.create_date)).reverse();
        return(
            <div className='container'>
                {localStorage.getItem("currentUser")=== null ? "" :  
                    <PostForm userId = {localStorage.getItem("currentUser")} username={localStorage.getItem("username")} refreshPosts = {refreshPosts}/>} 
                {sortedPosts.map(post=>(     
                   <Post 
                        key={post.id} 
                        likes = {post.postLikes} 
                        postId={post.id} 
                        userId = {post.userId} 
                        username={post.username} 
                        title={post.title} 
                        text={post.text}
                        createdAt = {post.createdAt}
                   ></Post>        
                ))}
            </div>
        )
    }
  
}

export default Home