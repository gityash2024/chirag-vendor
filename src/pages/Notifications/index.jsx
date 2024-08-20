import React, { useState } from 'react';
import styled from 'styled-components';
import noNotificationsImage from '../../assets/no-notifications.png';

const Container = styled.div`
  padding: 20px;
  font-family: 'Public Sans', sans-serif;
  background-color: #FFFFFF;
  width: 90%;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #383838;
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ActionText = styled.span`
  color: #383838;
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
`;

const Divider = styled.hr`
  border: none;
  border-left: 1px solid #DBDADE;
  height: 20px;
  margin: 0 10px;
`;

const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
`;

const NotificationItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #DBDADE;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 15px;
`;

const NotificationContent = styled.div`
  flex-grow: 1;
`;

const NotificationText = styled.p`
  margin: 0;
  color: #383838;
`;

const NotificationTime = styled.span`
  font-size: 12px;
  color: #8D98A4;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
`;

const PageInfo = styled.span`
  margin-right: 10px;
  
  color: #8D98A4;
`;

const PageButton = styled.button`
  padding: 5px 10px;
  border-radius: 20px;

  border: 1px solid #DBDADE;
  background-color: ${props => props.active ? '#383838' : '#FFFFFF'};
  color: ${props => props.active ? '#FFFFFF' : '#383838'};
  cursor: pointer;
  margin: 0 2px;
`;

const NoNotifications = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
`;

const NoNotificationsImage = styled.img`
  width: 300px;
  margin-bottom: 20px;
`;

const NoNotificationsText = styled.p`
  font-size: 18px;
  color: #8D98A4;
  text-align: center;
`;

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, avatar: 'https://randomuser.me/api/portraits/men/1.jpg', text: 'Lorem ipsum dolor sit amet', time: '25-07-2023 03:30 PM' },
    { id: 2, avatar: 'https://randomuser.me/api/portraits/women/2.jpg', text: 'Lorem ipsum dolor sit amet', time: '25-07-2023 01:10 PM' },
    { id: 3, avatar: 'https://randomuser.me/api/portraits/men/3.jpg', text: 'Lorem ipsum dolor sit amet', time: '25-07-2023 01:10 PM' },
    { id: 4, avatar: 'https://randomuser.me/api/portraits/women/4.jpg', text: 'Lorem ipsum dolor sit amet', time: '25-07-2023 05:00 AM' },
    { id: 5, avatar: 'https://randomuser.me/api/portraits/men/5.jpg', text: 'Lorem ipsum dolor sit amet', time: '25-07-2023 05:10 AM' },
    { id: 6, avatar: 'https://randomuser.me/api/portraits/women/6.jpg', text: 'Lorem ipsum dolor sit amet', time: '25-07-2023 03:30 PM' },
  ]);

  const [currentPage, setCurrentPage] = useState(1);

  const markAllAsRead = () => {
    console.log('Marked all as read');
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <Container>
      <Header>
        <Title>Notifications</Title>
        <ActionContainer>
          <ActionText onClick={markAllAsRead}>Mark all as read</ActionText>
          <Divider />
          <ActionText onClick={clearAll}>Clear all</ActionText>
        </ActionContainer>
      </Header>
      {notifications.length > 0 ? (
        <>
          <NotificationList>
            {notifications.map(notification => (
              <NotificationItem key={notification.id}>
                <Avatar src={notification.avatar} alt="User avatar" />
                <NotificationContent>
                  <NotificationText>{notification.text}</NotificationText>
                  <NotificationTime>{notification.time}</NotificationTime>
                </NotificationContent>
              </NotificationItem>
            ))}
          </NotificationList>
          <Pagination>
            <PageInfo>1-10 of 10</PageInfo>
            <PageButton>&lt;</PageButton>
            <PageButton active>1</PageButton>
            <PageButton>2</PageButton>
            <PageButton>3</PageButton>
            <PageButton>&gt;</PageButton>
          </Pagination>
        </>
      ) : (
        <NoNotifications>
          <NoNotificationsImage src={noNotificationsImage} alt="No notifications" />
          <NoNotificationsText>No new notifications at the moment. Stay tuned for updates!</NoNotificationsText>
        </NoNotifications>
      )}
    </Container>
  );
};

export default Notifications;