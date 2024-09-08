import React, { useState } from 'react';
import './Reward.css';
import { Link } from 'react-router-dom';

const Rewardd: React.FC = () => {
    const [activeTab, setActiveTab] = useState('REWARD');

    return (
        <div className="wrapper">
            <div className="page-title"> 
                <Link to="/" className="back-button">
                    BACK
                </Link>
                My Reward
            </div>
            <div className="container">
            
                <div className="tabs">
                    <Link
                        to="/My%20reward"
                        className={`tab ${activeTab === 'DISCOUNT' ? 'active' : ''}`}
                        onClick={() => setActiveTab('DISCOUNT')}
                    >
                        DISCOUNT
                    </Link>
                    <Link
                        to="/ticket"
                        className={`tab ${activeTab === 'TICKET' ? 'active' : ''}`}
                        onClick={() => setActiveTab('TICKET')}
                    >
                        TICKET
                    </Link>
                    <Link
                        to="/Rewardd"
                        className={`tab ${activeTab === 'REWARD' ? 'active' : ''}`}
                        onClick={() => setActiveTab('REWARD')}
                    >
                        REWARD
                    </Link>
                </div>
                <div className="rewards-list">
                    {activeTab === 'REWARD' && (
                        <>
                            <div className="reward-item">
                                <span>REWARD A</span>
                                <div className="count-circle">1</div>
                            </div>
                            <div className="reward-item">
                                <span>REWARD B</span>
                                <div className="count-circle">1</div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Rewardd;
