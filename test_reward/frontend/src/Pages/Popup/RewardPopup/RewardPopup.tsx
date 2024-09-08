import React, { useState } from 'react';
import './RewardPopup.css';

interface RewardPopupProps {
  onClose: () => void;
  onConfirm: () => void; // เพิ่ม callback สำหรับอัปเดตสถานะ
  reward: {
    points: number;
    imageUrl: string;
    reward_name: string;
  };
}

const RewardPopup: React.FC<RewardPopupProps> = ({ onClose, onConfirm, reward }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false); // สถานะสำหรับ Popup สำเร็จ

  const closePopup = () => {
    setIsOpen(false);
    onClose();
  };

  const confirmReward = () => {
    setIsOpen(false);
    setIsSuccess(true); // แสดง Popup สำเร็จ

    setTimeout(() => {
      setIsSuccess(false); // ปิด Popup สำเร็จหลังจาก 2 วินาที
      onConfirm(); // เรียก callback เพื่ออัปเดตสถานะและข้อความ
    }, 2000);
  };
  return (
    <>
      {isOpen && (
        <div className="popup-overlay">
          <div className="reward-container">
            <div className="reward-icon">
              <img src="logo.PNG" alt="Reward Icon" />
            </div>
            <div className="reward-points">{reward.points} POINTS</div>
            <div className="reward-image">
              <img src={reward.imageUrl} alt="Reward" />
            </div>
            <div className="reward-description">{reward.reward_name}</div>
            <button className="button confirm-btn" onClick={confirmReward}>
              CONFIRM
            </button>
            <button className="button cancel-btn" onClick={closePopup}>
              CANCEL
            </button>
          </div>
        </div>
      )}

      {isSuccess && (
        <div className="success-popup">
          <p>Succeed!</p>
          
        </div>
      )}
    </>
  );
};

export default RewardPopup;
