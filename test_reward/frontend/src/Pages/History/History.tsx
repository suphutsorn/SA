import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Table, message } from 'antd';
import 'antd/dist/reset.css';
import './History.css';
import { GetRewardById } from '../../services/http/index'; // Import API calls
import { RewardInterface } from '../../interfaces/IReward'; // Import Reward Interface

const HistoryPage: React.FC = () => {
    const location = useLocation();
    const { userPoints = 0, userName = 'Guest', rewardID = 4 } = location.state || {};

    const [reward, setReward] = useState<RewardInterface | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchReward = async () => {
        console.log("Reward ID:", rewardID);

        try {
            if (rewardID) {
                console.log("Fetching reward with ID:", rewardID);
                const rewardData = await GetRewardById(rewardID);
                
                if (rewardData) {
                    console.log("Reward data fetched:", rewardData);

                    // Ensure correct data types
                    const formattedReward: RewardInterface = {
                        ...rewardData.data,
                        Reward_time: new Date(rewardData.Reward_time), // Convert Reward_time to Date object
                        Points: Number(rewardData.Points), // Convert Points to number
                    };

                    setReward(formattedReward);
                } else {
                    throw new Error("Failed to fetch reward data");
                }
            } else {
                message.error('Reward ID is not provided.');
            }
        } catch (error) {
            message.error('Failed to load reward. Please try again.');
            console.error("Error fetching reward:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReward();
    }, [rewardID]);

    const columns = [
        {
            key: 'Reward_time',
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
            key: 'Points',
            title: 'Points',
            dataIndex: 'points',
            render: (text: number) => text.toString(), // Convert Points to string for display
        },
    ];

    // Ensure that each record in dataSource has a unique ID
    console.log(reward)
    const dataSource = reward ? [reward] : [];

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
                    {userPoints} Points
                </div>
            </div>
            <div className="history-list">
                <Table
                    dataSource={dataSource}
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
