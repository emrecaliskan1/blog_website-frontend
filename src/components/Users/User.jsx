import { Avatar } from '@mui/material';
import React from 'react'
import { useParams } from 'react-router-dom'
import AvatarCard from '../Avatar/Avatar';
import UserActivity from './UserActivity';


function User() {

    const {userId} = useParams();


    return (
        <div style={{display:'flex'}}>User : {userId}
            <AvatarCard/>
            <UserActivity></UserActivity>
        
        </div>
        
    )
}

export default User