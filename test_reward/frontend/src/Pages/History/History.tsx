import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './History.css'; 

import { useLocation } from 'react-router-dom';

const HistoryPage: React.FC = () => {
    const location = useLocation();
    const { userPoints, userName } = location.state || { userPoints: 0, userName: 'Guest' };
    const [isPopupVisible, setPopupVisible] = useState(false);
    const redemptionDate = "15th July 2024";

    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };

    return (
        <div className="wrapper">
            <div className="page-title">
                My History
                <Link to="/" className="back-button">
                    BACK
                </Link>
            </div>
            <div className="profile-container">
                <div className="profile-picture">
                    <img src="account_circle.png" alt="Profile Icon" />
                </div>
                <div className="profile-name">{userName}</div>
                <div className="reward-icon">
                    {userPoints}
                </div>
            </div>
            <div className="history-list">
                <div className="history-item">
                <div className="history-detail">
                    <div className="rewardd-name">
                         1 BOX POPCORN M
                    </div>
                    <div className="rewardd-points" onClick={togglePopup}>
                        -2 POINTS
                    </div>
                </div>

                </div>
            </div>

            {isPopupVisible && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Points Detail</h2>
                        <p>You have used 2 points to redeem 1 BOX POPCORN M.</p>
                        <p>Date: {redemptionDate}</p> {/* ใช้ค่าจากตัวแปรหรือ props */}
                        <button onClick={togglePopup}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HistoryPage;
