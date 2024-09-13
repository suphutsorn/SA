import React, { useState, useEffect } from 'react';
import { Table, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/reset.css';
import './History.css';
import { GetRewardsByMemberID } from '../../services/http/index'; // Import API calls
import { RewardInterface } from '../../interfaces/IReward'; // Import Reward Interface

const HistoryPage: React.FC = () => {
    const navigate = useNavigate();
    const [rewards, setRewards] = useState<RewardInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const handleBack = () => {
        navigate('/Reward');
    };

    const fetchRewards = async () => {
        const memberID = localStorage.getItem('memberID');
        const token = localStorage.getItem('token');
    
        if (!memberID || !token) {
            message.error('Please log in first');
            navigate('/Login');
            return;
        }

        try {
            console.log("Fetching rewards for member ID:", memberID);
            const rewardData = await GetRewardsByMemberID(memberID);
            
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
            key: 'Reward_time',
            title: 'Reward Time',
            dataIndex: 'Reward_time',
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
            key: 'Description',
            title: 'Description',
            dataIndex: 'Description',
        },
        {
            key: 'Points',
            title: 'Points',
            dataIndex: 'Points',
            render: (text: number) => text.toString(), // Convert Points to string for display
        },
    ];

    return (
        <div className="wrapper">
            <div className="page-title">
                My History
                <button onClick={handleBack} className="back-button">
                    BACK
                </button> {/* ปิดแท็ก <button> ถูกต้องแล้ว */}
            </div>
            <div className="profile-container">
                <div className="profile-picture">
                    <img src="account_circle.png" alt="Profile Icon" />
                </div>
                <div className="profile-name">
                    {localStorage.getItem('userName') || 'Guest'}
                </div> {/* ตรวจสอบค่า null */}
                <div className="reward-icon">
                    {localStorage.getItem('userPoints') || 0} Points
                </div> {/* ตรวจสอบค่า null */}
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
