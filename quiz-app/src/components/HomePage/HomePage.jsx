import React from 'react'
import './HomePage.css'
import { useNavigate } from 'react-router-dom'
const HomePage = () => {
  const navigate = useNavigate();
  const handleRegisterClick =()=>{
    navigate("/register")
  }
  const handleLoginClick =()=>{
navigate("/login")
  }
  return (
    <div className='home_page'>
   <div className="center-content">
    <h1>Quiz App</h1>
    <button onClick={handleRegisterClick}  class="btn btn-outline-success me-2" type="button">Register</button>
    <button onClick={handleLoginClick}  class="btn btn-outline-success me-2" type="button">Login</button>

   </div>
    </div>
  )
}

export default HomePage
