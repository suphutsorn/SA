import React from 'react';
import { Link, Route } from 'react-router-dom';
import './MyPoints.css';
import HistoryPage from '../Pages/History/History';

const MyPoints: React.FC = () => {
  return (
    <div className="my-points-container">
      <h2>My points</h2>
      <div className="points-content">
        <div className="profile-section">
          <img 
            src="account_circle.png" 
            alt="Profile" 
            className="profile-image"
          />
          <p>Suphutsorn Soisuwan</p>
        </div>
        <div className="divider"></div>
        <div className="points-section">
          <img 
            src="เหรียญ.PNG" 
            alt="Star" 
            className="points-icon"
          />
          <p className="balance">10</p>
          <p>Your Balance</p>
          <p className="description">Earn more points, redeem exciting gifts and enjoy your tbh experience</p>
          {/* ใช้ Link เพื่อเชื่อมไปยังหน้า /history */}
          <Link to="/History">
            <button className="history-button">HISTORY</button>
            
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default MyPoints;
