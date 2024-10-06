import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import printIcon from '../assets/print-icon.png';
import notificationIcon from '../assets/notification-icon.png';
import profileIcon from '../assets/profile-icon.png';
import { useNavigate } from 'react-router-dom';
import { listNotifications } from '../services/commonService';
import io from 'socket.io-client';

const TopbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TopbarLeft = styled.div`
  h1 {
    font-size: 24px;
    margin: 0;
  }
`;

const TopbarRight = styled.div`
  display: flex;
  align-items: center;
`;

const TopbarIcon = styled.img`
  margin-left: 20px;
  cursor: pointer;
`;

const NotificationCount = styled.div`
  position: absolute;
  top: 2px;
  right: 0px;
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;

const IconContainer = styled.div`
  position: relative;
`;

const Topbar = () => {
  const navigate = useNavigate();
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    fetchNotificationCount();
    const socket = io("http://192.168.172.62:5000", {
      withCredentials: true,
      transports: ['websocket']
    });
    
    socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    socket.on('newNotification', () => {
      console.log('New notification received');
      fetchNotificationCount();
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  const fetchNotificationCount = async () => {
    try {
      const response = await listNotifications({ page: 1, limit: 1, recipientRole: 'vendor' });
      setNotificationCount(response.data.totalNotifications);
    } catch (error) {
      console.error('Failed to fetch notification count', error);
    }
  };

  return (
    <TopbarContainer>
      <TopbarLeft>
      </TopbarLeft>
      <TopbarRight>
        <TopbarIcon onClick={() => navigate('/wallet')} src={printIcon} alt="Print" />
        <IconContainer>
          <TopbarIcon onClick={() => navigate('/notification')} src={notificationIcon} alt="Notifications" />
          {notificationCount > 0 && <NotificationCount>{notificationCount}</NotificationCount>}
        </IconContainer>
        <TopbarIcon onClick={() => navigate('/profile')} src={profileIcon} alt="Profile" />
      </TopbarRight>
    </TopbarContainer>
  );
};

export default Topbar;