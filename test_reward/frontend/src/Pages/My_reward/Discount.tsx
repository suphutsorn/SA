import React, { useState } from 'react';
import './Discount.css';
import { Link } from 'react-router-dom';

const Discount: React.FC = () => {
    const [activeTab, setActiveTab] = useState('DISCOUNT');

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
                    <div
                        className={`tab ${activeTab === 'DISCOUNT' ? 'active' : ''}`}
                        onClick={() => setActiveTab('DISCOUNT')}
                    >
                        DISCOUNT
                    </div>
                    <Link 
                        to="/ticket"
                        className={`tab ${activeTab === 'TICKET' ? 'active' : ''}`}
                        onClick={() => setActiveTab('TICKET')}
                    >
                        TICKET
                    </Link>
                    <Link
                        to="/rewardd"
                        className={`tab ${activeTab === 'REWARD' ? 'active' : ''}`}
                        onClick={() => setActiveTab('REWARD')}
                    >
                        REWARD
                    </Link>
                </div>
                <div className="rewards-list">
                    {activeTab === 'DISCOUNT' && (
                        <>
                            <div className="reward-item">
                                <span>DISCOUNT 50 BATH</span>
                                <div className="count-circle">1</div>
                            </div>
                            <div className="reward-item">
                                <span>DISCOUNT 100 BATH</span>
                                <div className="count-circle">1</div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Discount;
