import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button } from 'antd';
import './NavBar.css';

const { Header } = Layout;

const Navbar: React.FC = () => (
  <Header className="header">
    <div className="logo">
      MERJE CINIPLEX
    </div>
    <div className="menu">
      <Link to="/" className="link">Home</Link>
      <Link to="/myticket" className="link">MyTicket</Link>
     
      <Link to="#" className="link">Reward</Link>
      <Link to="/login">
        <Button type="primary" className="button">Login</Button>
      </Link>
    </div>
  </Header>
);

export default Navbar;