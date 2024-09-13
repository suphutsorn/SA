import React, { useState, useEffect } from 'react';
import { Table, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/reset.css';
import './History.css';
import { GetRewardsByMemberID, GetMemberById } from '../../services/http/index'; // Import API calls
import { RewardInterface } from '../../interfaces/IReward'; // Import Reward Interface
import { MembersInterface } from '../../interfaces/IMember'; // Import Member Interface

const HistoryPage: React.FC = () => {
    const navigate = useNavigate();
    const [rewards, setRewards] = useState<RewardInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [totalPoints, setTotalPoints] = useState<number | null>(null); // State for storing total points
    const [userName, setUserName] = useState<string | null>(null); // State for storing username

    const handleBack = () => {
        navigate('/Reward');
    };

    const fetchRewards = async () => {
        const memberID = localStorage.getItem('memberID');
        const token = localStorage.getItem('token');

        // Print memberID and token before sending the request
        console.log("Member ID from localStorage:", memberID);
        console.log("Token from localStorage:", token);

        if (!memberID || !token) {
            message.error('Please log in first');
            navigate('/Login');
            return;
        }

        try {
            // Fetch member details and total points
            console.log("Fetching member details for member ID:", memberID);
            const memberData: MembersInterface = await GetMemberById(memberID);

            if (memberData) {
                setTotalPoints(memberData.TotalPoint); // Store total points in state
                setUserName(memberData.UserName); // Store username in state
            } else {
                setTotalPoints(0); // Default value if no points
                setUserName('Guest');
            }

            console.log("Fetching rewards for member ID:", memberID);
            const rewardData = await GetRewardsByMemberID(memberID);

            // Print the data received from GetRewardsByMemberID
            console.log("Reward data received:", rewardData);

            if (rewardData && rewardData.length > 0) {
                const formattedRewards = rewardData.map((reward: RewardInterface) => ({
                    ...reward,
                    Reward_time: new Date(reward.Reward_time), // Convert Reward_time to Date object
                    Points: Number(reward.Points), // Ensure Points is a number
                }));

                setRewards(formattedRewards);
            } else {
                message.info('No rewards found for this member.');
            }
        } catch (error) {
            message.error('Failed to load rewards. Please try again.');
            console.error("Error fetching rewards:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRewards();
    }, []);

    const columns = [
        {
            key: 'reward_time',
            title: 'Reward Time',
            dataIndex: 'reward_time',
            render: (text: Date) => {
                const date = new Date(text);
                return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString();
            },
        },
        {
            key: 'RewardName',
            title: 'Reward Name',
            dataIndex: 'RewardName',
        },
        {
            key: 'Describtion',
            title: 'Description',
            dataIndex: 'Describtion',
        },
        {
            key: 'points',
            title: 'Points',
            dataIndex: 'points',
            render: (text: number) => text.toString(), // Convert Points to string for display
        },
    ];

    return (
        <div className="wrapper">
            <div className="page-title">
                My History
                <button onClick={handleBack} className="back-button">
                    BACK
                </button>
            </div>
            <div className="profile-container">
                <div className="profile-picture">
                    <img src="account_circle.png" alt="Profile Icon" />
                </div>
                <div className="profile-name">
                    {userName || 'Guest'} {/* แสดงชื่อผู้ใช้ที่ได้รับจาก API */}
                </div>
                <div className="reward-icon">
                    {totalPoints !== null ? `${totalPoints} Points` : 'Loading...'} {/* แสดง TotalPoint */}
                </div>
            </div>
            <div className="history-list">
                <Table
                    dataSource={rewards}
                    columns={columns}
                    pagination={{ pageSize: 5 }}
                    rowClassName={(record, index) => (index % 2 === 0 ? 'even-row' : 'odd-row')}
                    rowKey="ID" // Ensure this key is unique
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default HistoryPage;
