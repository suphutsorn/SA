import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';
import AppRoutes from './routes'
import Navbar from './components/NavBar';
import RewardPopup from './Pages/Popup/RewardPopup/RewardPopup';
import DiscountPopup from './Pages/Popup/DiscountPopup';

const { Content } = Layout;

const App: React.FC = () => (
  
    <Layout>
      <Navbar />
      <Content style={{ padding: '0 20px', backgroundColor: 'black', minHeight: 'calc(100vh - 128px)' }}>
      <AppRoutes/>
      </Content>

    </Layout>
  
);

export default App;