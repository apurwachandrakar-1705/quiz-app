import React from 'react';
import { PiShootingStarThin } from "react-icons/pi";
import './StartGamePage.css'; // Import the CSS file
import { useLocation, useNavigate } from 'react-router-dom';

const StartGamePage = () => {
  const location=useLocation();
  const username = location?.state.user||'Guest'
   const navigate= useNavigate();
    const handleStartBtn=()=>{
      const userName = username
      
 navigate('/game',{state:{userName}})
    }



  return (
    <div className='start_game_page'>
      <h1>Hi {username}, Ready For Game...</h1>
      <button type="button" className="btn btn-outline-success"
      onClick={handleStartBtn}>
        <PiShootingStarThin size="1.5em" /> Start Game
      </button>
    </div>
  );
};

export default StartGamePage;
