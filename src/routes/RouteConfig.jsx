import React from 'react'
import {Routes,Route, redirect, redirectDocument, Navigate} from "react-router-dom"
import Home from '../components/Home/Home'
import User from '../components/Users/User'
import Auth from '../components/Auth/Auth'

function RouteConfig() {

  const isLoggedIn = localStorage.getItem("currentUser") !== null;
  
  return (
    <Routes>
        <Route path='/' element={<Home></Home>}/>
        <Route path="/users/:userId" element={<User/>}/>
        <Route
          path="/auth"
          element={
            isLoggedIn ? <Navigate to="/" replace /> : <Auth />
          }
        />
    </Routes>
  )
}

export default RouteConfig