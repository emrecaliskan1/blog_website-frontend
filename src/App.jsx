import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Navbar from './components/UI/Navbar'
import Home from './components/Home/Home'
import User from './components/Users/User'
import RouteConfig from './routes/RouteConfig'

function App() {
  

  return (
    <>
      <Navbar></Navbar>
      <RouteConfig/>
     
    </>
  )
}

export default App
