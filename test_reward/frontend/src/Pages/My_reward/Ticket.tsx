import React, { useState } from 'react';
import './Ticket.css';
import { Link } from 'react-router-dom';

const Ticket: React.FC = () => {
    const [activeTab, setActiveTab] = useState('TICKET');

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
                    <div
                        className={`tab ${activeTab === 'TICKET' ? 'active' : ''}`}
                        onClick={() => setActiveTab('TICKET')}
                    >
                        TICKET
                    </div>
                    <Link
                        to="/Rewardd"
                        className={`tab ${activeTab === 'REWARD' ? 'active' : ''}`}
                        onClick={() => setActiveTab('REWARD')}
                    >
                        REWARD
                    </Link>
                </div>
                <div className="rewards-list">
                    {activeTab === 'TICKET' && (
                        <>
                            <div className="reward-item">
                                <span>TICKET A</span>
                                <div className="count-circle">1</div>
                            </div>
                            <div className="reward-item">
                                <span>TICKET B</span>
                                <div className="count-circle">1</div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Ticket;
