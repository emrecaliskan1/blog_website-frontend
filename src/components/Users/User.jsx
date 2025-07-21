import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AvatarCard from '../Avatar/Avatar';
import UserActivity from './UserActivity';
import { GetWithAuth } from '../../Services/HttpService';


function User() {

    const {userId} = useParams();
    const [user,setUser] = useState();

    const getUser =() => {
        GetWithAuth("http://localhost:8080/users/" +userId)
        .then((res)=>res.json())
        .then(
            (result) => {
                console.log(result)
                setUser(result.payload)
            },
            (err)=>{
                console.log(err)
            }
        )
    }

    useEffect(()=>{
        getUser()
    },[])


    return (
        <div style={{display:'flex'}}>User : {userId}
            {user? <AvatarCard userId={userId} username={user.username} />: ""}

            {localStorage.getItem("currentUser") == userId 
            ? <UserActivity userId={userId}></UserActivity>
            : ""}
        
        </div>
        
    )
}

export default User 