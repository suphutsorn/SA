import React, { useState } from 'react';
import './Discount.css';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import 'antd/dist/reset.css'; 
import HistoryPage from '../History/History';
const Discount: React.FC = () => {
    const [activeTab, setActiveTab] = useState('DISCOUNT');
    const columns = [
        {
            key: 'TICKET',
            title: 'TICKET',
            dataIndex: 'TICKET',
        },
        {
            key: 'FOOD',
            title: 'FOOD',
            dataIndex: 'FOOD',
        },
        {
            key: 'DISCOUNT',
            title: 'DISCOUNT',
            dataIndex: 'DISCOUNT',
        },
        {
            key: 'SEAT',
            title: 'SEAT',
            dataIndex: 'SEAT',
        },
        
    ];

    const data = [
        {
            id: '1',
            TICKET: 'F1',
            FOOD: 'popcorn',
            DISCOUNT: 'DC10',
            SEAT: '10/11/2000'
        },
        {
            id: '2',
            TICKET: 'F1',
            FOOD: 'popcorn',
            DISCOUNT: 'DC10',
            SEAT: '10/11/2000'
        },
        {
            id: '3',
            TICKET: 'F1',
            FOOD: 'popcorn',
            DISCOUNT: 'DC10',
            SEAT: '10/11/2000'
        },
    ]
    return (
        <div className="wrapper">
            <div className="page-title">
                My Reward
                <Link to="/" className="back-button">
                    BACK
                </Link>
                
            </div>
            <div className="history-list">
                <Table
                    dataSource={data}
                    columns={columns}
                    pagination={{ pageSize: 5 }}
                    rowClassName={(record, index) => (index % 2 === 0 ? 'even-row' : 'odd-row')}
                    rowKey="id"
                    
                />
            </div>
            
        </div>
    );
};

export default Discount;
