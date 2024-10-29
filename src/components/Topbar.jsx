import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import printIcon from '../assets/wallet.svg';
import notificationIcon from '../assets/bell.svg';
import profileIcon from '../assets/profile-icon.png';
import { useNavigate } from 'react-router-dom';
import { listNotifications } from '../services/commonService';
import io from 'socket.io-client';
import { useTranslation } from '../TranslationContext';


const LanguageToggle = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  background: #F5F5F5;
  border-radius: 20px;
  padding: 4px;
  cursor: pointer;
`;

const LanguageOption = styled.span`
  padding: 4px 12px;
  font-size: 14px;
  border-radius: 16px;
  transition: all 0.3s ease;
  color: ${props => props.active ? '#FFFFFF' : '#000000'};
  background-color: ${props => props.active ? '#000000' : 'transparent'};
`;

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
  bottom: 20px;
  right: 0px;
  left: 32px;
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
  const { language, setLanguagePreference, translate } = useTranslation();

  const [notificationCount, setNotificationCount] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem("language") || "en");
  const handleLanguageToggle = () => {
    const newLang = currentLanguage === "en" ? "hi" : "en";
    setCurrentLanguage(newLang);
    setLanguagePreference(newLang);
  };
  useEffect(() => {
    fetchNotificationCount();
    const socket = io("https://chirag.solminica.com", {
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
  <LanguageToggle onClick={handleLanguageToggle}>
    <LanguageOption active={currentLanguage === "hi"}>HI</LanguageOption>
    <LanguageOption active={currentLanguage === "en"}>EN</LanguageOption>
  </LanguageToggle>
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