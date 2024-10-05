import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import noNotificationsImage from '../../assets/no-notifications.png';
import { listNotifications } from '../../services/commonService';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

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
  color: #121212;
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ActionText = styled.span`
  color: #121212;
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
  color: #121212;
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
  background-color: ${props => props.active ? '#121212' : '#FFFFFF'};
  color: ${props => props.active ? '#FFFFFF' : '#121212'};
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
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchNotifications();
  }, [currentPage]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await listNotifications({ page: currentPage, limit: 10, recipientRole: 'vendor' });
      setNotifications(response.data.notifications);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      toast.error('Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

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
      {loading ? (
        <Loader />
      ) : notifications.length > 0 ? (
        <>
          <NotificationList>
            {notifications.map(notification => (
              <NotificationItem key={notification._id}>
                <Avatar src={`https://ui-avatars.com/api/?name=${notification.type}&background=random`} alt="Notification type" />
                <NotificationContent>
                  <NotificationText>{notification.description}</NotificationText>
                  <NotificationTime>{new Date(notification.createdAt).toLocaleString()}</NotificationTime>
                </NotificationContent>
              </NotificationItem>
            ))}
          </NotificationList>
          <Pagination>
            <PageInfo>{`${(currentPage - 1) * 10 + 1}-${Math.min(currentPage * 10, notifications.length)} of ${notifications.length}`}</PageInfo>
            <PageButton onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>&lt;</PageButton>
            {[...Array(totalPages).keys()].map(page => (
              <PageButton key={page} active={currentPage === page + 1} onClick={() => setCurrentPage(page + 1)}>{page + 1}</PageButton>
            ))}
            <PageButton onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>&gt;</PageButton>
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