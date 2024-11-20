import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../HomePage/HomePage'
import Login from '../HomePage/Login';
import Register from '../HomePage/Register';
import StartGamePage from '../GamePage/StartGamePage';
import GamePage from '../GamePage/GamePage';
const AllRouting = () => {
  return (
    <Routes>
    <Route path='/' element={<HomePage/>}></Route>  
    <Route path='/register' element={<Register/>}></Route>  
    <Route path='/login' element={<Login/>}></Route>  
    <Route path='/startgame' element={<StartGamePage/>}></Route>  
    <Route path='/game' element={<GamePage/>}></Route>  
    </Routes>
  )
}
 
export default AllRouting
