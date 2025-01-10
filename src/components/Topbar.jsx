import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import printIcon from '../assets/wallet.svg';
import notificationIcon from '../assets/bell.svg';
import profileIcon from '../assets/profile-icon.png';
import { useNavigate } from 'react-router-dom';
import { listNotifications } from '../services/commonService';
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
  top: -5px;
  right: -5px;
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

const IconContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
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

  const fetchNotificationCount = useCallback(async () => {
    try {
      const response = await listNotifications({ 
        page: 1, 
        limit: 1, 
        recipientRole: 'vendor' 
      });
      
      if (response.data?.totalNotifications !== undefined) {
        setNotificationCount(response.data.totalNotifications);
        localStorage.setItem('vendorNotificationCount', response.data.totalNotifications);
      }
    } catch (error) {
      console.error('Failed to fetch notification count:', error);
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchNotificationCount();

    // Set up polling interval
    const pollInterval = setInterval(() => {
      fetchNotificationCount();
    }, 10000); // 10 seconds

    // Load from localStorage on mount
    const savedCount = localStorage.getItem('vendorNotificationCount');
    if (savedCount) {
      setNotificationCount(parseInt(savedCount, 10));
    }

    // Cleanup
    return () => {
      clearInterval(pollInterval);
    };
  }, [fetchNotificationCount]);

  return (
    <TopbarContainer>
      <TopbarLeft>
      </TopbarLeft>
      <TopbarRight>
        <LanguageToggle onClick={handleLanguageToggle}>
          <LanguageOption active={currentLanguage === "hi"}>Hindi</LanguageOption>
          <LanguageOption active={currentLanguage === "en"}>English</LanguageOption>
        </LanguageToggle>
        <TopbarIcon onClick={() => navigate('/wallet')} src={printIcon} alt="Print" />
        <IconContainer>
          <TopbarIcon 
            onClick={() => navigate('/notification')} 
            src={notificationIcon} 
            alt="Notifications" 
          />
          {notificationCount > 0 && (
            <NotificationCount>{notificationCount}</NotificationCount>
          )}
        </IconContainer>
        <TopbarIcon onClick={() => navigate('/profile')} src={profileIcon} alt="Profile" />
      </TopbarRight>
    </TopbarContainer>
  );
};

export default Topbar;