import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import chiragLogo from '../assets/chirag-logo.png';
import homeIcon from '../assets/home.png';
import bookingsIcon from '../assets/bookings.png';
import serviceHistoryIcon from '../assets/service-history.png';
import calendarIcon from '../assets/calendar.png';
import manageRunnerIcon from '../assets/manage-runner.png';
import reportsIcon from '../assets/reports.png';
import contactIcon from '../assets/contact.png';
import termsIcon from '../assets/terms.png';
import privacyIcon from '../assets/privacy.png';
import logoutIcon from '../assets/logout.png';

const SidebarContainer = styled.div`
  background-color: #121212;
  color: white;
  width: 250px;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Logo = styled.div`
cursor: pointer;
  padding: 20px;
  img {
    width: 100%;
    max-width: 150px;
  }
`;

const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  flex-grow: ${props => props.bottom ? 0 : 1};
  ${props => props.bottom && `
    margin-top: auto;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 20px;
    margin-bottom: 100px;
  `}
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  text-decoration: none;
  color: white;
  &.active {
    background-color: rgba(255, 255, 255, 0.1);
  }
  img {
    width: 30px;
    height: 3 0px;
    margin-right: 15px;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  width: 100%;
  text-align: left;
  img {
    width: 20px;
    height: 20px;
    margin-right: 15px;
  }
`;

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
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
`;

const ModalText = styled.p`
  margin-bottom: 20px;
  color: #333;
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
  color: #333;
`;

const ConfirmButton = styled(ModalButton)`
  background-color: #121212;
  color: white;
`;

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
    { icon: homeIcon, text: 'Home', path: '/home' },
    { icon: bookingsIcon, text: 'Bookings', path: '/bookings' },
    { icon: serviceHistoryIcon, text: 'Service History', path: '/service-history' },
    { icon: calendarIcon, text: 'Calendar', path: '/calendar' },
    { icon: manageRunnerIcon, text: 'Manage Runner', path: '/manage-runner' },
    { icon: reportsIcon, text: 'Reports', path: '/reports' },
  ];

  const bottomMenuItems = [
    { icon: contactIcon, text: 'Contact us', path: '/contact-us' },
    { icon: termsIcon, text: 'Terms and Conditions', path: '/terms-and-conditions' },
    { icon: privacyIcon, text: 'Privacy policy', path: '/privacy-policy' },
  ];

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    navigate('/');
  };

  return (
    <>
      <SidebarContainer>
        <Logo onClick={() => navigate('/home')}>
          <img src={chiragLogo} alt="C.H.I.R.A.G." />
        </Logo>
        <Menu>
          {menuItems.map((item) => (
            <MenuItem
              key={item.text}
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
            >
              <img src={item.icon} alt={item.text} />
              <span>{item.text}</span>
            </MenuItem>
          ))}
        </Menu>
        <Menu bottom>
          {bottomMenuItems.map((item) => (
            <MenuItem
              key={item.text}
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
            >
              <img src={item.icon} alt={item.text} />
              <span>{item.text}</span>
            </MenuItem>
          ))}
          <LogoutButton onClick={handleLogout}>
            <img style={{width: '35px', height: '35px'}} src={logoutIcon} alt="Logout" />
            <span style={{ marginLeft: '10px', fontWeight: '500',fontSize: '16px' }}>Logout</span>
          </LogoutButton>
        </Menu>
      </SidebarContainer>

      {showLogoutModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalText>Are you sure you want to Logout?</ModalText>
            <CancelButton onClick={() => setShowLogoutModal(false)}>No</CancelButton>
            <ConfirmButton onClick={confirmLogout}>Yes</ConfirmButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default Sidebar;