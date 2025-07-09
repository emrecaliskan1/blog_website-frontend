import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from '../components/Home/Home'
import User from '../components/Users/User'

function RouteConfig() {
  return (
    <Routes>
        <Route path='/' element={<Home></Home>}/>
        <Route path="/users/:userId" element={<User/>}/>
    </Routes>
  )
}

export default RouteConfig