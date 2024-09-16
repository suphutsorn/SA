import React, { useState } from 'react';
import { Input, Button, message, Card } from 'antd';
import 'antd/dist/reset.css';
import './CheckCodePage.css'; // คุณสามารถสร้างไฟล์ CSS สำหรับจัดการสไตล์ของหน้าได้
import { CheckCodeReward } from '../../services/http/index'; // Import API call



const CheckCodePage: React.FC = () => {
    const [code, setCode] = useState<string>(''); // State สำหรับเก็บค่าโค้ดที่ลูกค้ากรอก
    const [rewardInfo, setRewardInfo] = useState<any>(null); // State สำหรับเก็บข้อมูลรางวัลหลังจากตรวจสอบ

    const handleCheckCode = async () => {
        if (!code) {
            message.error('Please enter a code');
            return;
        }

        try {
            const data = await CheckCodeReward(code); // เรียก API เพื่อตรวจสอบโค้ด
            setRewardInfo(data); // เก็บข้อมูลรางวัลใน state
            message.success('Code is valid!'); // แสดงข้อความถ้าโค้ดถูกต้อง
        } catch (error) {
            message.error('Failed to check the code. Please try again.'); // แสดงข้อความเมื่อมีข้อผิดพลาด
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Check Reward Code</h2>
            <Input
                placeholder="Enter reward code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                style={{ width: '300px', marginRight: '10px' }}
            />
            <Button type="primary" onClick={handleCheckCode}>
                Check Code
            </Button>

            {/* แสดงผลข้อมูลรางวัลหลังจากตรวจสอบ */}
            {rewardInfo && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Reward Details:</h3>
                    <p><strong>Reward Name:</strong> {rewardInfo.reward.RewardName}</p>
                    <p><strong>Points:</strong> {rewardInfo.reward.Points}</p>
                    <p><strong>Member Name:</strong> {rewardInfo.member.name}</p>
                </div>
            )}
        </div>
    );
};


export default CheckCodePage;
