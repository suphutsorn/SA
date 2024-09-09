import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import './Reward.css';
import RewardPopup from '../Popup/RewardPopup/RewardPopup';
import { CreateReward, GetReward, GetRewardId } from '../../services/http/index'; // Import API calls
import { RewardInterface  } from "../../interfaces/IReward";  /* ไม่ได้ใช้ */
import { useNavigate } from 'react-router-dom';




const Reward: React.FC = () => {
  
    const apiUrl = "http://localhost:8080/api";
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedReward, setSelectedReward] = useState<RewardInterface | null>(null);
    const [userPoints, setUserPoints] = useState(100);
    const [userName, setUserName] = useState('Suphutsorn Soisuwan'); // เก็บชื่อผู้ใช้ใน state
    const [message, setMessage] = useState<string | null>(null); // เพิ่ม state สำหรับข้อความแสดงสถานะ
    const [pointsRequired, setPointsRequired] = useState<string>(''); // สร้าง state สำหรับเก็บจำนวนคะแนน
    const [rewardAvailability, setRewardAvailability] = useState<string>(''); // สร้าง state สำหรับสถานะรางวัล
    const navigate = useNavigate(); // สร้าง navigate function
  
    /*ลิ้ง user กับ point ไปหน้า history */
    const goToHistory = () => {
      console.log("Sending to history:", { userPoints, userName });
      navigate('/history', {
        state: { userPoints, userName }, // ส่งค่า state
      });
    };
  
    const fetchRewardData = async (RewardName: string) => {
      try {
        const rewards: RewardInterface[] = await GetReward(); // ดึงข้อมูลรางวัลจาก backend
        if (rewards && RewardName) {
          const reward = rewards.find((r: RewardInterface) => r.RewardName === RewardName); // ค้นหาตามชื่อรางวัล
          if (reward) {
            setPointsRequired(`${reward.Points} points`); // คะแนนที่ต้องใช้ในการแลกรางวัล
            const rewardAvailability = reward.Status ? 'Available' : 'Out of Stock'; // สถานะของรางวัล
            setRewardAvailability(rewardAvailability);
          } else {
            console.error(`Reward with name ${RewardName} not found.`);
          }
        }
      } catch (error) {
        console.error('Error fetching reward data:', error);
      }
    };
  
    const handleImageClick = (reward: RewardInterface) => {
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
        if (userPoints < selectedReward.Points!) {
          setMessage('Your points are insufficient to redeem this reward.');
          alert('You do not have enough points to redeem this reward!');
          return; // หยุดการทำงานของฟังก์ชัน หากคะแนนไม่พอ
        }
    
        // อัปเดตคะแนนของผู้ใช้ใน Frontend
        setUserPoints(prevPoints => prevPoints - selectedReward.Points!);
    
        // อัปเดตสถานะของรางวัลใน Frontend
        setRewards(prevRewards =>
          prevRewards.map(reward =>
            reward.RewardName === selectedReward.RewardName
              ? { ...reward, Status: true }
              : reward
          )
        );
    
        // บันทึกการเปลี่ยนแปลงลงฐานข้อมูล
        await CreateReward({
          ...selectedReward,
          Status: true // อัปเดตสถานะเป็นแลกสำเร็จ
        });
    
        // ปิด Popup
        setIsPopupOpen(false);
    
        // แสดงข้อความเมื่อแลกของรางวัลสำเร็จ
        setMessage('Reward redeemed successfully!');
      }
    };
    
  
      
  /* popup แสดงข้อความ ว่า เหรียญไม่พอ */
  interface PopupProps {
    message: string;
    onClose: () => void;
  }
  
  const Popup: React.FC<PopupProps> = ({ message, onClose }) => {
    return (
      <div className="popup-coin">
        <div className="popup-content-coin">
          <h2>{message}</h2>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };
  

  //
  const [rewards, setRewards] = useState<RewardInterface[]>([
    {
      ID:1,
      imageUrl: "popcorn.png",
      RewardName: "1 BOX POPCORN M",
      Points: 2,
      Status: false, 
      Discount: 0,
      Reward: "1 BOX POPCORN M" ,
      Ticket: "-",
      Reward_time: new Date() ,
    },
    {
      ID:2,
      imageUrl: "combo m + discount.png",
      RewardName: "1 COMBO SET M + DISCOUNT",
      Points: 4,
      Status: false, 
      Discount: 0,
      Reward: "1 BOX POPCORN M" ,
      Ticket: "-",
      Reward_time: new Date()  ,
    },
    {
      ID: 3,
      imageUrl: "combo Lticket.png",
      RewardName: "1 COMBO SET L + TICKET",
      Points: 6,
      Status: false, 
      Discount: 0,
      Reward: "1 BOX POPCORN M" ,
      Ticket: "-",
      Reward_time:new Date() ,
    },
    {
      ID: 4,
      imageUrl: "supersizesetA.PNG",
      RewardName: "1 SUPERSIZE SET A",
      Points: 9,
      Status: false,
      Discount: 0,
      Reward: "1 BOX POPCORN M" ,
      Ticket: "-",
      Reward_time:new Date(), 
    },
    {
      ID: 5,
      imageUrl: "gift.PNG",
      RewardName: "GIFT",
      Points: 12,
      Status: false, 
      Discount: 0,
      Reward: "1 BOX POPCORN M" ,
      Ticket: "-",
      Reward_time:new Date() ,
    },
    {
      ID: 6,
      imageUrl: "supersizesetB.png",
      RewardName: "SUPERSIZE SET B + DISCOUNT ",
      Points: 15,
      Status: false,
      Discount: 0,
      Reward: "1 BOX POPCORN M" ,
      Ticket: "-",
      Reward_time:new Date(), 
    },
    {
      ID: 7,
      imageUrl: "super c ticket.png",
      RewardName: "SUPERSIZE SET C + TICKET",
      Points: 18,
      Status: false, 
      Discount: 0,
      Reward: "1 BOX POPCORN M" ,
      Ticket: "-",
      Reward_time:new Date() ,
    },
    {
      ID: 8,
      imageUrl: "gift.PNG",
      RewardName: "GIFT",
      Points: 21,
      Status: false,
      Discount: 0,
      Reward: "1 BOX POPCORN M" ,
      Ticket: "-",
      Reward_time:new Date(), 
    },
    {
      ID: 9,
      imageUrl: "2 normalseat.png",
      RewardName: "2 NORMAL SEATS",
      Points: 26,
      Status: false,
      Discount: 0,
      Reward: "1 BOX POPCORN M" ,
      Ticket: "-",
      Reward_time:new Date() , 
    },
    {
      ID: 10,
      imageUrl: "2 supersize discount.png",
      RewardName: "2 SUPERSIZE SET A + DISCOUNT",
      Points: 32,
      Status: false,
      Discount: 0,
      Reward: "1 BOX POPCORN M" ,
      Ticket: "-",
      Reward_time:new Date() , 
    },
    {
      ID: 11,
      imageUrl: "2 premuim seat.png",
      RewardName: "2 PERMUIM SEATS ",
      Points: 38,
      Status: false,
      Discount: 0,
      Reward: "1 BOX POPCORN M" ,
      Ticket: "-",
      Reward_time:new Date() , 
    },
    {
      ID: 12,
      imageUrl: "2 combo sets size L + 2 ticket.png",
      RewardName: "2 COMBO SETS SIZE L + 2 TICKET",
      Points: 45,
      Status: false,
      Discount: 0,
      Reward: "1 BOX POPCORN M" ,
      Ticket: "-",
      Reward_time:new Date() , 
    },
    {
      ID: 13,
      imageUrl: "3 premuim seats.png",
      RewardName: "3 PREMUIM SEATS",
      Points: 50,
      Status: false, 
      Discount: 0,
      Reward: "1 BOX POPCORN M" ,
      Ticket: "-",
      Reward_time:new Date() ,
    },
    {
      ID: 14,
      imageUrl: "3 premuim seat + 3 ticket.png",
      RewardName: "3 PREMUIM SEATS + 3 TICKETS ",
      Points: 60,
      Status: false, 
      Discount: 0,
      Reward: "1 BOX POPCORN M" ,
      Ticket: "-",
      Reward_time:new Date(),
    },
    {
      ID: 15,
      imageUrl: "1 DIRECTOR PACKAGE .png",
      RewardName: "1 DIRECTOR PACKAGE ",
      Points: 70,
      Status: false,
      Discount: 0,
      Reward: "1 BOX POPCORN M" ,
      Ticket: "-",
      Reward_time:new Date() , 
    },
    {
      ID: 16,
      imageUrl: "4 premuim seats.png",
      RewardName: " 4 PREMUIM SEATS",
      Points: 80,
      Status: false,
      Discount: 0,
      Reward: "1 BOX POPCORN M" ,
      Ticket: "-",
      Reward_time:new Date() , 
    },
    {
      ID: 17,
      imageUrl: "2 supersize set b + discount.png",
      RewardName: "2 SUPERSIZE SET B + DISCOUNT ",
      Points: 90,
      Status: false,
      Discount: 0,
      Reward: "1 BOX POPCORN M" ,
      Ticket: "-",
      Reward_time:new Date(), 
    },
    {
      ID: 18,
      imageUrl: "10 seat new.png",
      RewardName: "10 NORMAL SEATS + 2 SUPERSIZE SET C",
      Points: 100,
      Status: false, 
      Discount: 0,
      Reward: "1 BOX POPCORN M" ,
      Ticket: "-",
      Reward_time:new Date(),
    },
    // เพิ่มรายการรางวัลอื่นๆ ที่เหลือที่นี่
  ]);



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
          <Link
              to={{
                  pathname: "/history", // URL ของหน้าประวัติ
                  
             }}
              >
              <button className="history-button" onClick={goToHistory} >HISTORY</button>
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
          alt={reward.RewardName}
          className={`popcorn-box popcorn-box-${index + 1}`}
          onClick={() => handleImageClick(reward)}
        />
      ))}

      {/* Popcorn Labels */}
      {rewards.map((reward, index) => (
        <div key={index} className={`popcorn-label popcorn-label-${index + 1}`}>
          {reward.RewardName}
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
          className={`popcorn-label popcorn-label-${index + 1} ${reward.Status ? 'changed-label' : ''}`}
        >
          {reward.Status? "Changed" : reward.RewardName}
      </div>
          ))}
  </div>



  {isPopupOpen && selectedReward && (
  <RewardPopup
    onClose={handleClosePopup}
    onConfirm={handleConfirmReward}
    reward={selectedReward}
    userPoints={userPoints} // เพิ่มการส่ง userPoints ไปยัง RewardPopup
  />
)}

    </div>




    </div>

    
  );
};

export default Reward;
