import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AvatarCard from '../Avatar/Avatar';
import UserActivity from './UserActivity';
import { GetWithAuth } from '../../Services/HttpService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


function User() {

    const {userId} = useParams();
    const [user,setUser] = useState();

    // const getUser =() => { 
    //     GetWithAuth(`${API_BASE_URL}/users/${userId}`)
    //     .then((res)=>res.json())
    //     .then(
    //         (result) => {
    //             console.log(result)
    //             setUser(result.payload)
    //         },
    //         (err)=>{
    //             console.log(err)
    //         }
    //     )
    // }

    const getUser = async () => { 
    try {
        const res = await GetWithAuth(`${API_BASE_URL}/users/${userId}`);
        const result = await res.json();
        setUser(result.payload);
    } catch (err) {
        console.log(err);
    }
}

    useEffect(()=>{
        getUser()
    },[])


    return (
        <div style={{display:'flex'}}>
            {user? <AvatarCard userId={userId} username={user.username} />: ""}

            {localStorage.getItem("currentUser") == userId 
            ? <UserActivity userId={userId}></UserActivity>
            : ""}
        
        </div>
        
    )
}

export default User 