import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import './Reward.css';
import RewardPopup from '../Popup/RewardPopup/RewardPopup';



interface Reward {
  ID: number;
  imageUrl: string;
  reward_name: string;
  points: number;
  status: boolean;
  Discount:   number;
  Reward:  string;
  Ticket:  string;
  Reward_time: Date;
  
}


const Reward: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [userPoints, setUserPoints] = useState(100);
  const [userName, setUserName] = useState('Suphutsorn Soisuwan'); // เก็บชื่อผู้ใช้ใน state
   const [message, setMessage] = useState<string | null>(null); // เพิ่ม state สำหรับข้อความแสดงสถานะ
  


  const [rewards, setRewards] = useState<Reward[]>([
    {
      ID:1,
      imageUrl: "popcorn.png",
      reward_name: "1 BOX POPCORN M",
      points: 2,
      status: false, 
      Discount: 0,
      Reward: "1 BOX POPCORN M" ,
      Ticket: "-",
      Reward_time: new Date() ,
    },
    {
      ID:2,
      imageUrl: "combo m + discount.png",
      reward_name: "1 COMBO SET M + DISCOUNT",
      points: 4,
      status: false, 
      Discount: 0,
      Reward: "1 BOX POPCORN M" ,
      Ticket: "-",
      Reward_time: new Date()  ,
    },
    {
      ID: 3,
      imageUrl: "combo Lticket.png",
      reward_name: "1 COMBO SET L + TICKET",
      points: 6,
      status: false, 
      Discount: 0,
      Reward: "1 BOX POPCORN M" ,
      Ticket: "-",
      Reward_time:new Date() ,
    },
    {
      ID: 4,
      imageUrl: "supersizesetA.PNG",
      reward_name: "1 SUPERSIZE SET A",
      points: 9,
      status: false,
      Discount: 0,
      Reward: "1 BOX POPCORN M" ,
      Ticket: "-",
      Reward_time:new Date(), 
    },
    {
      ID: 5,
      imageUrl: "gift.PNG",
      reward_name: "GIFT",
      points: 12,
      status: false, 
      Discount: 0,
      Reward: "1 BOX POPCORN M" ,
      Ticket: "-",
      Reward_time:new Date() ,
    },
    {
      ID: 6,
      imageUrl: "supersizesetB.png",
      reward_name: "SUPERSIZE SET B + DISCOUNT ",
      points: 15,
      status: false,
      Discount: 0,
      Reward: "1 BOX POPCORN M" ,
      Ticket: "-",
      Reward_time:new Date(), 
    },
    {
      ID: 7,
      imageUrl: "super c ticket.png",
      reward_name: "SUPERSIZE SET C + TICKET",
      points: 18,
      status: false, 
      Discount: 0,
      Reward: "1 BOX POPCORN M" ,
      Ticket: "-",
      Reward_time:new Date() ,
    },
    {
      ID: 8,
      imageUrl: "gift.PNG",
      reward_name: "GIFT",
      points: 21,
      status: false,
      Discount: 0,
      Reward: "1 BOX POPCORN M" ,
      Ticket: "-",
      Reward_time:new Date(), 
    },
    {
      ID: 9,
      imageUrl: "2 normalseat.png",
      reward_name: "2 NORMAL SEATS",
      points: 26,
      status: false,
      Discount: 0,
      Reward: "1 BOX POPCORN M" ,
      Ticket: "-",
      Reward_time:new Date() , 
    },
    {
      ID: 10,
      imageUrl: "2 supersize discount.png",
      reward_name: "2 SUPERSIZE SET A + DISCOUNT",
      points: 32,
      status: false,
      Discount: 0,
      Reward: "1 BOX POPCORN M" ,
      Ticket: "-",
      Reward_time:new Date() , 
    },
    {
      ID: 11,
      imageUrl: "2 premuim seat.png",
      reward_name: "2 PERMUIM SEATS ",
      points: 38,
      status: false,
      Discount: 0,
      Reward: "1 BOX POPCORN M" ,
      Ticket: "-",
      Reward_time:new Date() , 
    },
    {
      ID: 12,
      imageUrl: "2 combo sets size L + 2 ticket.png",
      reward_name: "2 COMBO SETS SIZE L + 2 TICKET",
      points: 45,
      status: false,
      Discount: 0,
      Reward: "1 BOX POPCORN M" ,
      Ticket: "-",
      Reward_time:new Date() , 
    },
    {
      ID: 13,
      imageUrl: "3 premuim seats.png",
      reward_name: "3 PREMUIM SEATS",
      points: 50,
      status: false, 
      Discount: 0,
      Reward: "1 BOX POPCORN M" ,
      Ticket: "-",
      Reward_time:new Date() ,
    },
    {
      ID: 14,
      imageUrl: "3 premuim seat + 3 ticket.png",
      reward_name: "3 PREMUIM SEATS + 3 TICKETS ",
      points: 60,
      status: false, 
      Discount: 0,
      Reward: "1 BOX POPCORN M" ,
      Ticket: "-",
      Reward_time:new Date(),
    },
    {
      ID: 15,
      imageUrl: "1 DIRECTOR PACKAGE .png",
      reward_name: "1 DIRECTOR PACKAGE ",
      points: 70,
      status: false,
      Discount: 0,
      Reward: "1 BOX POPCORN M" ,
      Ticket: "-",
      Reward_time:new Date() , 
    },
    {
      ID: 16,
      imageUrl: "4 premuim seats.png",
      reward_name: " 4 PREMUIM SEATS",
      points: 80,
      status: false,
      Discount: 0,
      Reward: "1 BOX POPCORN M" ,
      Ticket: "-",
      Reward_time:new Date() , 
    },
    {
      ID: 17,
      imageUrl: "2 supersize set b + discount.png",
      reward_name: "2 SUPERSIZE SET B + DISCOUNT ",
      points: 90,
      status: false,
      Discount: 0,
      Reward: "1 BOX POPCORN M" ,
      Ticket: "-",
      Reward_time:new Date(), 
    },
    {
      ID: 18,
      imageUrl: "10 seat new.png",
      reward_name: "10 NORMAL SEATS + 2 SUPERSIZE SET C",
      points: 100,
      status: false, 
      Discount: 0,
      Reward: "1 BOX POPCORN M" ,
      Ticket: "-",
      Reward_time:new Date(),
    },
    // เพิ่มรายการรางวัลอื่นๆ ที่เหลือที่นี่
  ]);

  const handleImageClick = (reward: Reward) => {
    setSelectedReward(reward);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedReward(null);
  };

  // ฟังก์ชันเพื่ออัปเดตสถานะการแลกรางวัล
  const handleConfirmReward = async () => {
    if (selectedReward) {
      // ตรวจสอบว่าผู้ใช้มีคะแนนเพียงพอ
      if (userPoints < selectedReward.points) {
        setMessage('Your points are insufficient to redeem this reward.');
        return;
      }
  
      // อัปเดตสถานะใน Frontend ว่ารางวัลถูกแลกแล้ว
      setRewards(prevRewards =>
        prevRewards.map(reward =>
          reward.reward_name === selectedReward.reward_name
            ? { ...reward, status: true }
            : reward
        )
      );
  
      // อัปเดตคะแนนของผู้ใช้ใน Frontend
      setUserPoints(prevPoints => prevPoints - selectedReward.points);
  
      // ส่งข้อมูลการแลกรางวัลไปยัง Backend
      try {
        const response = await axios.post('/api/redeem', {
          userName: userName,   // ส่งชื่อผู้ใช้
          rewardName: selectedReward.reward_name,  // ส่งชื่อรางวัล
          pointsUsed: selectedReward.points  // ส่งจำนวนคะแนนที่ใช้แลก
        });
  
        if (response.status === 200) {
          console.log("Redeemed successfully:", response.data.message);
          setUserPoints(response.data.remainingPoints);  // อัปเดตคะแนนใหม่
          setMessage("Redeem successful!"); // แจ้งผู้ใช้ว่าการแลกรางวัลสำเร็จ
        } else {
          console.error("Failed to redeem reward.");
          setMessage("Failed to redeem reward. Please try again.");
        }
      } catch (error) {
        console.error("Error redeeming reward:", error);
        setMessage("An error occurred. Please try again.");
      }
  
      // ปิด Popup
      setIsPopupOpen(false);
    }
  };
  


  return (
    
    
    <div className="reward-page-container">
      <img 
          src="Group start.png" // ปรับเส้นทางให้ถูกต้อง
          alt="Center Image"
          className="center-image"
        />
      

      <div className="my-points-container">
      <h1>My points</h1>
      <div className="points-content">
        <div className="profile-section">
          <img 
            src="account_circle.png" 
            alt="Profile" 
            className="profile-image"
          />
          <p>{userName}</p>
          <Link to="/My reward">
          <button className="my-reward-button">MY REWARD</button>
          </Link>
        </div>
        <div className="divider"></div>
        <div className="points-section">
          <img 
            src="เหรียญ.PNG" 
            alt="Star" 
            className="points-icon"
          />
          <div className="balance">
          <h2>{userPoints}</h2></div>
          <p>Your Balance</p>
          <p className="description">Earn more points, redeem exciting gifts and enjoy your tbh experience</p>
          {/* ใช้ Link เพื่อเชื่อมไปยังหน้า /history */}
          <Link to="/History">
            <button className="history-button">HISTORY</button>
            
          </Link>
          
        </div>
      </div>
    </div>

   


      {/* Stars */}
      <img src="star-1.svg" alt="star" className="star star-1" />
      <img src="star-2.svg" alt="star" className="star star-2" />
      <img src="star-4.svg" alt="star" className="star star-3" />
      <img src="star-5.svg" alt="star" className="star star-4" />
      <img src="star-6.svg" alt="star" className="star star-5" />
      <img src="star-7.svg" alt="star" className="star star-6" />
      <img src="star-12.svg" alt="star" className="star star-7" />
      <img src="star-7.svg" alt="star" className="star star-8" />
      <img src="star-5.svg" alt="star" className="star star-9" />
      <img src="star-2.svg" alt="star" className="star star-10" />
      <img src="star-7.svg" alt="star" className="star star-11" />
      <img src="star-4.svg" alt="star" className="star star-12" />
      <img src="star-6.svg" alt="star" className="star star-13" />
      <img src="star-4.svg" alt="star" className="star star-14" />
      <img src="star-7.svg" alt="star" className="star star-15" />
      <img src="star-12.svg" alt="star" className="star star-16" />
      <img src="star-2.svg" alt="star" className="star star-17" />
      <img src="star-7.svg" alt="star" className="star star-18" />
      <img src="star-4.svg" alt="star" className="star star-19" />
      <img src="star-6.svg" alt="star" className="star star-20" />
      <img src="star-6.svg" alt="star" className="star star-21" />
      <img src="star-7.svg" alt="star" className="star star-22" />
      <img src="star-12.svg" alt="star" className="star star-23" />
      <img src="star-2.svg" alt="star" className="star star-24" />
      <img src="star-4.svg" alt="star" className="star star-25" />
      <img src="star-5.svg" alt="star" className="star star-26" />
      <img src="star-6.svg" alt="star" className="star star-27" />
      <img src="star-12.svg" alt="star" className="star star-28" />
      <img src="star-8.svg" alt="star" className="star star-29" />
      <img src="star-7.svg" alt="star" className="star star-30" />
      <img src="star-1.svg" alt="star" className="star star-31" />
      <img src="star-2.svg" alt="star" className="star star-32" />
      <img src="star-4.svg" alt="star" className="star star-33" />
      <img src="star-12.svg" alt="star" className="star star-34" />
      <img src="star-6.svg" alt="star" className="star star-35" />
      <img src="star-7.svg" alt="star" className="star star-36" />
      <img src="star-8.svg" alt="star" className="star star-37" />
      <img src="star-7.svg" alt="star" className="star star-38" />
      <img src="star-12.svg" alt="star" className="star star-39" />
      <img src="star-13.svg" alt="star" className="star star-40" />
      <img src="star-17.svg" alt="star" className="star star-41" />
      <img src="star-37.svg" alt="star" className="star star-42" />
      <img src="star-12.svg" alt="star" className="star star-43" />
      <img src="star-2.svg" alt="star" className="star star-44" />
      <img src="star-40.svg" alt="star" className="star star-45" />
      <img src="star-12.svg" alt="star" className="star star-46" />
      <img src="star-40.svg" alt="star" className="star star-47" />
      <img src="star-12.svg" alt="star" className="star star-48" />



      {/* Popcorn Boxes */}
      {rewards.map((reward, index) => (
        <img
          key={index}
          src={reward.imageUrl}
          alt={reward.reward_name}
          className={`popcorn-box popcorn-box-${index + 1}`}
          onClick={() => handleImageClick(reward)}
        />
      ))}

      {/* Popcorn Labels */}
      {rewards.map((reward, index) => (
        <div key={index} className={`popcorn-label popcorn-label-${index + 1}`}>
          {reward.reward_name}
        </div>
      ))}
      {/* Points */}
      <img src="2 point.png" alt="point 2" className="points points-2" />
      <img src="4 point.png" alt="point 4" className="points points-4" />
      <img src="6 point.png" alt="point 6" className="points points-6" />
      <img src="9 point.png" alt="point 9" className="points points-9" />
      <img src="12 point.png" alt="point 12" className="points points-12" />
      <img src="15 point.png" alt="point 15" className="points points-15" />
      <img src="18 point.png" alt="point 18" className="points points-18" />
      <img src="21 point.png" alt="point 21" className="points points-21" />
      <img src="32 point.png" alt="point 26" className="points points-26" />
      <img src="32 points.png" alt="point 32" className="points points-32" />
      <img src="38 point.png" alt="point 38" className="points points-38" />
      <img src="45 point.png" alt="point 45" className="points points-45" />
      <img src="50 point.png" alt="point 50" className="points points-50" />
      <img src="60 point.png" alt="point 60" className="points points-60" />
      <img src="70 point.png" alt="point 70" className="points points-70" />
      <img src="80 point.png "alt="point 80" className="points points-80" />
      <img src="90 point.png" alt="point 90" className="points points-90" />
      <img src="100 point.png" alt="point 100" className="points points-100" />

      

      <div className="reward-page-container">
        <div className="rewards-container">
          {rewards.map((reward, index) => (
        <div
          key={index}
          className={`popcorn-label popcorn-label-${index + 1} ${reward.status ? 'changed-label' : ''}`}
        >
          {reward.status? "Changed" : reward.reward_name}
      </div>
          ))}
  </div>



      {isPopupOpen && selectedReward && (
        <RewardPopup
          onClose={handleClosePopup}
          onConfirm={handleConfirmReward}
          reward={selectedReward}
        />
      )}
    </div>




    </div>

    
  );
};

export default Reward;
