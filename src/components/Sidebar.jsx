import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import chiragLogo from '../assets/logo-light.svg';
import homeIcon from '../assets/home.png';
import bookingsIcon from '../assets/bookings.png';
import serviceHistoryIcon from '../assets/service-history.png';
import calendarIcon from '../assets/calendar.png';
import manageRunnerIcon from '../assets/manage-runner.png';
import recommendation from '../assets/recommendation.png';
import reportsIcon from '../assets/reports.png';
import contactIcon from '../assets/contact.png';
import termsIcon from '../assets/terms.png';
import privacyIcon from '../assets/privacy.png';
import logoutIcon from '../assets/logout.png';
import { useTranslation } from '../TranslationContext';
import WalletIcon from '../assets/wallet-white.svg';
import { PriceCheck } from '@mui/icons-material';


const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  position: relative;
  z-index: 10000;
`;
const ModalText = styled.p`
  margin-bottom: 20px;
  color: #121212;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const CancelButton = styled(ModalButton)`
  background-color: #ccc;
  color: #121212;
`;

const ConfirmButton = styled(ModalButton)`
  background-color: #383838;
  color: white;
`;
// Updated Sidebar styled components
const SidebarContainer = styled.div`
  background-color: #383838;
  color: white;
  width: 280px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Prevent scrolling */
`;

const Logo = styled.div`
  cursor: pointer;
  padding: 20px;
  flex-shrink: 0; /* Prevent logo from shrinking */
  img {
    width: 100%;
    max-width: 300px;
  }
`;

const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  ${props => props.bottom ? `
    margin-top: auto;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 20px;
    padding-bottom: 20px;
    flex-shrink: 0; /* Prevent bottom menu from shrinking */
  ` : `
    flex: 1;
    overflow-y: auto; /* Allow scrolling only in main menu if needed */
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-track {
      background: #383838;
    }
    &::-webkit-scrollbar-thumb {
      background: #666;
      border-radius: 3px;
    }
  `}
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 8px 20px; /* Slightly reduced padding */
  text-decoration: none;
  color: white;
  flex-shrink: 0; /* Prevent menu items from shrinking */
  &.active {
    background-color: #000000;
  }
  img {
    width: 24px; /* Slightly reduced icon size */
    height: 24px;
    margin-right: 15px;
  }
`;

const DisabledMenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 20px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: not-allowed;
  opacity: 0.6;
  flex-shrink: 0;
  img {
    width: 24px;
    height: 24px;
    margin-right: 15px;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 20px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  width: 100%;
  text-align: left;
  flex-shrink: 0;
  img {
    width: 24px;
    height: 24px;
    margin-right: 15px;
  }
`;
const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { translate } = useTranslation();
  const user = JSON.parse(localStorage.getItem('user'));
  const isVerified = user?.vendorDroneVerified;

  const menuItems = [
    { icon: homeIcon, text: translate('sidebar.menu.home'), path: '/home' },
    { icon: bookingsIcon, text: translate('sidebar.menu.bookings'), path: '/bookings' },
    { icon: calendarIcon, text: translate('sidebar.menu.calendar'), path: '/calendar' },
    { icon: serviceHistoryIcon, text: translate('sidebar.menu.serviceHistory'), path: '/service-history' },
    { icon: reportsIcon, text: translate('sidebar.menu.manageRunner'), path: '/manage-runner' },
    { icon: manageRunnerIcon, text: translate('sidebar.menu.reports'), path: '/reports' },
    { icon: recommendation, text: translate('sidebar.menu.sprayAssist'), path: '/recommendation' },
    { icon: WalletIcon, text: translate('sidebar.menu.Wallet'), path: '/wallet' },
  ];

  const bottomMenuItems = [
    { icon: contactIcon, text: translate('sidebar.bottomMenu.contactUs'), path: '/contact-us' },
    { icon: termsIcon, text: translate('sidebar.bottomMenu.termsAndConditions'), path: '/terms-and-conditions' },
    { icon: privacyIcon, text: translate('sidebar.bottomMenu.privacyPolicy'), path: '/privacy-policy' },
    { icon: privacyIcon, text: translate('sidebar.bottomMenu.pricePolicy'), path: '/pricing-policy' },
  ];

  

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.clear();
    setShowLogoutModal(false);
    navigate('/');
  };

  const renderMenuItem = (item) => {
    // Check if this is a bottom menu item
    const isBottomMenuItem = bottomMenuItems.some(menuItem => menuItem.path === item.path);
    
    if (!isVerified && item.path !== '/contact-us' && item.path !== '/terms-and-conditions' && item.path !== '/privacy-policy' && item.path !== '/pricing-policy') {
      return (
        <DisabledMenuItem key={item.text}>
          <img src={item.icon} alt={item.text} />
          <span>{item.text}</span>
        </DisabledMenuItem>
      );
    }
    
    // For bottom menu items, add target="_blank" and rel="noopener noreferrer"
    if (isBottomMenuItem) {
      return (
        <MenuItem
          key={item.text}
          to={item.path}
          className={location.pathname === item.path ? 'active' : ''}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={item.icon} alt={item.text} />
          <span>{item.text}</span>
        </MenuItem>
      );
    }
    
    // Regular menu items (unchanged)
    return (
      <MenuItem
        key={item.text}
        to={item.path}
        className={location.pathname === item.path ? 'active' : ''}
      >
        <img src={item.icon} alt={item.text} />
        <span>{item.text}</span>
      </MenuItem>
    );
  };

  return (
    <>
      <SidebarContainer>
        <Logo onClick={() => navigate('/home')}>
          <img src={chiragLogo} alt="C.H.I.R.A.G." />
        </Logo>
        <Menu>
          {menuItems.map(renderMenuItem)}
        </Menu>
        <Menu bottom>
          {bottomMenuItems.map(renderMenuItem)}
          <LogoutButton onClick={handleLogout}>
            <img src={logoutIcon} alt="Logout" />
            <span style={{ marginLeft: '10px', fontWeight: '500', fontSize: '16px' }}>
              {translate('sidebar.bottomMenu.logout')}
            </span>
          </LogoutButton>
        </Menu>
      </SidebarContainer>

      {showLogoutModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalText>{translate('sidebar.logoutModal.confirmMessage')}</ModalText>
            <CancelButton onClick={() => setShowLogoutModal(false)}>
              {translate('sidebar.logoutModal.no')}
            </CancelButton>
            <ConfirmButton onClick={confirmLogout}>
              {translate('sidebar.logoutModal.yes')}
            </ConfirmButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default Sidebar;