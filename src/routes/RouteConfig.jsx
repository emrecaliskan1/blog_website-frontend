import React from 'react'
import {Routes,Route, redirect, redirectDocument, Navigate} from "react-router-dom"
import Home from '../components/Home/Home'
import User from '../components/Users/User'
import Auth from '../components/Auth/Auth'

function RouteConfig({currentUser,setCurrentUser,username,setUsername}) {

  const isLoggedIn = localStorage.getItem("currentUser") !== null;
  
  return (
    <Routes>
        <Route path='/' element={<Home currentUser={currentUser} username={username}></Home>}/>
        <Route path="/users/:userId" element={<User/>}/>
        <Route
          path="/auth"
          element={
            isLoggedIn ? <Navigate to="/" replace /> : <Auth setCurrentUser={setCurrentUser} setUsername={setUsername}/>
          }
        />
    </Routes>
  )
}

export default RouteConfig