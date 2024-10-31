import React from 'react';
import styled from 'styled-components';
import pendingIcon from '../assets/pending-icon.svg';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 40px;
  text-align: center;
  max-width: 600px;
  margin: 60px auto;
  background: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #121212;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 600;
  font-family: 'Public Sans';
`;

const Message = styled.p`
  color: #666666;
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 16px;
  font-family: 'Public Sans';
`;

const StatusIcon = styled.div`
  width: 80px;
  height: 80px;
  background: #F5F5F5;
  border-radius: 50%;
  margin: 0 auto 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 40px;
    height: 40px;
  }
`;

const ContactButton = styled.button`
  background-color: #383838;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  font-family: 'Public Sans';
  
  &:hover {
    background-color: #2a2a2a;
  }
`;

const VerificationPending = () => {
  const navigate=useNavigate();
  return (
    <Container>
      <StatusIcon>
        <img src={pendingIcon} alt="Pending Verification" />
      </StatusIcon>
      <Title>Drone License Verification Pending</Title>
      <Message>
        Your drone license is currently under review by our administration team. 
        This verification process typically takes 24-48 hours to complete.
      </Message>
      <Message>
        You will receive a notification once your verification is approved. 
        Until then, you can access basic account settings and contact support if needed.
      </Message>
      <ContactButton onClick={() => navigate('/contact-us')}>Contact Support</ContactButton>
    </Container>
  );
};

export default VerificationPending;