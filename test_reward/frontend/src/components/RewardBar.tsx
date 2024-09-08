import React from 'react';
import './RewardBar.css'; // นำเข้าไฟล์ CSS

const RewardBar: React.FC = () => {
  return (
    <div className="reward-bar-container">
      <div className="reward-bar-content">
        Reward points
        <img 
          src="rewardpoints.PNG"  // รูปภาพอ้างอิงจากโฟลเดอร์ public
          alt="medal" 
          className="reward-bar-image"
        />
      </div>
    </div>
  );
};

export default RewardBar;
