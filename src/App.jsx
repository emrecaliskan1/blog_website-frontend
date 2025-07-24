import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Navbar from './components/UI/Navbar'
import Home from './components/Home/Home'
import User from './components/Users/User'
import RouteConfig from './routes/RouteConfig'
import { useEffect, useState } from 'react'

function App() {
  
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("currentUser"));
  const [username, setUsername] = useState(localStorage.getItem("username"));

  useEffect(() => {
    setCurrentUser(localStorage.getItem("currentUser"));
    setUsername(localStorage.getItem("username"));
  }, []);

  return (
    <>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} username={username}></Navbar>
      <RouteConfig
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
      username={username}
      setUsername={setUsername}/>
     
    </>
  )
}

export default App
