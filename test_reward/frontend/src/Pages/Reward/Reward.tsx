import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Reward.css';
import RewardPopup from '../Popup/RewardPopup/RewardPopup';
import { CreateReward, GetMembers } from '../../services/http/index'; 
import { RewardInterface } from "../../interfaces/IReward";
import { MembersInterface } from '../../interfaces/IMember';
import { message } from "antd";


const Reward: React.FC = () => {
  const apiUrl = "http://localhost:8081/api";
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState<RewardInterface | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [userPoints, setUserPoints] = useState<number>(0);
  const [messageApi, contextHolder] = message.useMessage();
  
  const navigate = useNavigate();

  const getUserProfile = async () => {
    const token = localStorage.getItem("token"); // ดึง token ที่เก็บไว้ใน localStorage

    if (!token) {
        messageApi.open({
            type: "error",
            content: "No token found.",
        });
        console.log("No token found.");
        return;
    }

    const memberID = localStorage.getItem('memberID'); // ดึง memberID ที่เก็บไว้ใน localStorage

    if (!memberID) {
        messageApi.open({
            type: "error",
            content: "No memberID found.",
        });
        console.log("No memberID found.");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/members/${memberID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // ส่ง token ใน headers
            }
        });

        if (!response.ok) {
            const errorData = await response.json(); // แปลงข้อมูลข้อผิดพลาดเป็น JSON
            console.log("Error response status:", response.status); // แสดงสถานะการตอบกลับ
            console.log("Error response data:", errorData); // แสดงข้อมูลข้อผิดพลาด

            // ตรวจสอบข้อความข้อผิดพลาด
            const errorMessage = errorData.message ? errorData.message : 'Unknown error';
            messageApi.open({
                type: "error",
                content: `Error ${response.status}: ${errorMessage}`,
            });
            return; // ออกจากฟังก์ชันเมื่อเกิดข้อผิดพลาด
        }

        const data = await response.json(); // แปลงข้อมูลที่ได้รับเป็น JSON
        console.log("Response data:", data); // แสดงข้อมูลที่ได้รับจาก API

        // ตรวจสอบว่า `data` มี `UserName` และ `TotalPoint` หรือไม่
        const userName = data.UserName ? data.UserName : "Name data not available";
        // แปลง TotalPoint เป็นตัวเลขถ้าจำเป็น
        const points = Number(data.TotalPoint); // ใช้ Number() เพื่อแปลงค่าเป็นตัวเลข
        // ตรวจสอบค่าของ points และให้ค่าเริ่มต้นถ้าเป็น NaN
        const displayPoints = !isNaN(points) ? points : "Points data not available";

        console.log("User Name:", userName); // แสดงค่า name
        console.log("User Points:", displayPoints); // แสดงค่า points

        // ตั้งค่าตัวแปรตามข้อมูลที่ได้รับ
        setUserName(userName);
        setUserPoints(displayPoints);

    } catch (error) {
        console.error("Error occurred:", error); // แสดงข้อผิดพลาดในคอนโซล

        // ตรวจสอบประเภทของข้อผิดพลาด
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === 'string') {
            errorMessage = error;
        }

        messageApi.open({
            type: "error",
            content: errorMessage, // ใช้ข้อความข้อผิดพลาดที่ดึงมา
        });
    }
};

useEffect(() => {
    getUserProfile();
}, []);


  const handleImageClick = (reward: RewardInterface) => {
    setSelectedReward(reward);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedReward(null);
  };

  const handleConfirmReward = async () => {
    if (selectedReward) {
        // ตรวจสอบว่าผู้ใช้มีคะแนนเพียงพอในการแลกรางวัลหรือไม่
        if (userPoints < selectedReward.Points!) {
            messageApi.open({
                type: "error",
                content: 'You do not have enough points to redeem this reward!',
            });
            return;
        }

        // ลบคะแนนของผู้ใช้ใน frontend ก่อนแลกรางวัล
        setUserPoints(prevPoints => prevPoints - selectedReward.Points!);
        setRewards(prevRewards =>
            prevRewards.map(reward =>
                reward.RewardName === selectedReward.RewardName
                    ? { ...reward, Status: true }
                    : reward
            )
        );

        try {
            const memberID = localStorage.getItem('memberID'); // ดึง member_id จาก localStorage

            console.log("Retrieved memberID:", memberID); // ดูค่าที่ดึงมา

            if (!memberID) {
                messageApi.open({
                    type: "error",
                    content: "No memberID found.",
                });
                return;
            }

            // ส่งข้อมูลไปยัง backend พร้อมกับ member_id
            await CreateReward({
                ...selectedReward,
                member_id: memberID,  // ส่ง member_id ไปด้วย
                Status: true
            });

            // หากการแลกรางวัลสำเร็จ
            messageApi.open({
                type: "success",
                content: 'Reward redeemed successfully!',
            });
            setIsPopupOpen(false);
        } catch (error) {
            // หากเกิดข้อผิดพลาดขณะแลกรางวัล
            messageApi.open({
                type: "error",
                content: "An error occurred while redeeming the reward.",
            });
        }
    }
};


  const goToHistory = () => {
    navigate('/history', { state: { userPoints, userName } });
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
      Reward: " BOX POPCORN M" ,
      Ticket: "-",
      Reward_time: new Date() ,
      Describtion:"1 BOX POPCORN M น่ากินสุดๆๆเลย",
    },
    {
      ID:2,
      imageUrl: "combo m + discount.png",
      RewardName: "1 COMBO SET M + DISCOUNT",
      Points: 4,
      Status: false, 
      Discount: 50,
      Reward: " COMBO SET M" ,
      Ticket: "-",
      Reward_time: new Date()  ,
      Describtion:"น่ากินสุดๆๆเลย",
    },
    {
      ID: 3,
      imageUrl: "combo Lticket.png",
      RewardName: "1 COMBO SET L + TICKET",
      Points: 6,
      Status: false, 
      Discount: 0,
      Reward: " COMBO SET L " ,
      Ticket: "TICKET",
      Reward_time:new Date() ,
      Describtion:"",
    },
    {
      ID: 4,
      imageUrl: "supersizesetA.PNG",
      RewardName: "1 SUPERSIZE SET A",
      Points: 9,
      Status: false,
      Discount: 0,
      Reward: " SUPERSIZE SET A" ,
      Ticket: "-",
      Reward_time:new Date(), 
      Describtion:"น่ากินสุดๆๆเลย",
    },
    {
      ID: 5,
      imageUrl: "gift.PNG",
      RewardName: "GIFT",
      Points: 12,
      Status: false, 
      Discount: 0,
      Reward: "GIFT" ,
      Ticket: "-",
      Reward_time:new Date() ,
      Describtion:"น่ากินสุดๆๆเลย",
    },
    {
      ID: 6,
      imageUrl: "supersizesetB.png",
      RewardName: "SUPERSIZE SET B + DISCOUNT ",
      Points: 15,
      Status: false,
      Discount: 50,
      Reward: "SUPERSIZE SET B " ,
      Ticket: "-",
      Reward_time:new Date(), 
      Describtion:"น่ากินสุดๆๆเลย",
    },
    {
      ID: 7,
      imageUrl: "super c ticket.png",
      RewardName: "SUPERSIZE SET C + TICKET",
      Points: 18,
      Status: false, 
      Discount: 0,
      Reward: "SUPERSIZE SET C" ,
      Ticket: "TICKET",
      Reward_time:new Date() ,
      Describtion:"",
    },
    {
      ID: 8,
      imageUrl: "gift.PNG",
      RewardName: "GIFT",
      Points: 21,
      Status: false,
      Discount: 0,
      Reward: "GIFT" ,
      Ticket: "-",
      Reward_time:new Date(), 
      Describtion:"",
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
      Describtion:"",
    },
    {
      ID: 10,
      imageUrl: "2 supersize discount.png",
      RewardName: "2 SUPERSIZE SET A + DISCOUNT",
      Points: 32,
      Status: false,
      Discount: 100,
      Reward: "SUPERSIZE SET A" ,
      Ticket: "-",
      Reward_time:new Date() , 
      Describtion:"",
    },
    {
      ID: 11,
      imageUrl: "2 premuim seat.png",
      RewardName: "2 PERMUIM SEATS ",
      Points: 38,
      Status: false,
      Discount: 0,
      Reward: " PERMUIM SEATS " ,
      Ticket: "-",
      Reward_time:new Date() , 
      Describtion:"",
    },
    {
      ID: 12,
      imageUrl: "2 combo sets size L + 2 ticket.png",
      RewardName: "2 COMBO SETS SIZE L + 2 TICKET",
      Points: 45,
      Status: false,
      Discount: 0,
      Reward: "COMBO SETS SIZE L" ,
      Ticket: "TICKET",
      Reward_time:new Date() , 
      Describtion:"",
    },
    {
      ID: 13,
      imageUrl: "3 premuim seats.png",
      RewardName: "3 PREMUIM SEATS",
      Points: 50,
      Status: false, 
      Discount: 0,
      Reward: "PREMUIM SEATS" ,
      Ticket: "-",
      Reward_time:new Date() ,
      Describtion:"",
    },
    {
      ID: 14,
      imageUrl: "3 premuim seat + 3 ticket.png",
      RewardName: "3 PREMUIM SEATS + 3 TICKETS ",
      Points: 60,
      Status: false, 
      Discount: 0,
      Reward: " PREMUIM SEATS" ,
      Ticket: "TICKETS",
      Reward_time:new Date(),
      Describtion:"",
    },
    {
      ID: 15,
      imageUrl: "1 DIRECTOR PACKAGE .png",
      RewardName: "1 DIRECTOR PACKAGE ",
      Points: 70,
      Status: false,
      Discount: 0,
      Reward: "1 DIRECTOR PACKAGE " ,
      Ticket: "-",
      Reward_time:new Date() , 
      Describtion:"",
    },
    {
      ID: 16,
      imageUrl: "4 premuim seats.png",
      RewardName: " 4 PREMUIM SEATS",
      Points: 80,
      Status: false,
      Discount: 0,
      Reward: "PREMUIM SEATS" ,
      Ticket: "-",
      Reward_time:new Date() , 
      Describtion:"",
    },
    {
      ID: 17,
      imageUrl: "2 supersize set b + discount.png",
      RewardName: "2 SUPERSIZE SET B + DISCOUNT ",
      Points: 90,
      Status: false,
      Discount: 100,
      Reward: " SUPERSIZE SET B " ,
      Ticket: "-",
      Reward_time:new Date(),
      Describtion:"", 
    },
    {
      ID: 18,
      imageUrl: "10 seat new.png",
      RewardName: "10 NORMAL SEATS + 2 SUPERSIZE SET C",
      Points: 100,
      Status: false, 
      Discount: 0,
      Reward: "NORMAL SEATS" ,
      Ticket: "-",
      Reward_time:new Date(),
      Describtion:"",
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