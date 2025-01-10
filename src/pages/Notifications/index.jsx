// src/pages/Notifications/index.jsx
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import noNotificationsImage from '../../assets/no-notifications.png';
import { listNotifications } from '../../services/commonService';
import { toast } from 'react-toastify';
import { useTranslation } from '../../TranslationContext';
import { useNotifications } from '../../hooks/useNotifications';

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
  background-color: ${props => props.isRead ? '#FFFFFF' : '#F5F5F5'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.isRead ? '#F8F8F8' : '#EFEFEF'};
  }
`;

const NotificationContent = styled.div`
  flex-grow: 1;
  padding: 0 15px;
`;

const NotificationText = styled.p`
  margin: 0;
  color: #121212;
  font-size: 14px;
  margin-bottom: 5px;
  font-weight: ${props => props.isRead ? 'normal' : 'bold'};
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
  margin: 0 15px;
  color: #8D98A4;
`;

const PageButton = styled.button`
  padding: 5px 10px;
  border-radius: 20px;
  border: 1px solid #DBDADE;
  background-color: ${props => props.active ? '#121212' : '#FFFFFF'};
  color: ${props => props.active ? '#FFFFFF' : '#121212'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  margin: 0 2px;
  
  &:hover {
    background-color: ${props => !props.disabled && '#F5F5F5'};
  }
`;

const NoNotifications = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  padding: 20px;
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

const EmptyState = styled(NoNotifications)``;
const EmptyStateImage = styled(NoNotificationsImage)``;
const EmptyStateText = styled(NoNotificationsText)``;

const Notifications = () => {
  const { translate } = useTranslation();
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await listNotifications({ recipientRole: 'vendor' });
      if (response.data?.notifications) {
        setNotifications(response.data.notifications);
        // Update badge count in localStorage or context
        localStorage.setItem('notificationCount', response.data.notifications.length);
      }
      setError(null);
    } catch (err) {
      setError('Failed to fetch notifications');
      toast.error('Failed to fetch notifications');
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
    const pollInterval = setInterval(() => {
      fetchNotifications();
    }, 10000);

    return () => clearInterval(pollInterval);
  }, [fetchNotifications]);

  const handleMarkAsRead = async (notificationId) => {
    try {
      // Call your markAsRead API here
      const updatedNotifications = notifications.map(notification =>
        notification._id === notificationId
          ? { ...notification, isRead: true }
          : notification
      );
      setNotifications(updatedNotifications);
    } catch (error) {
      toast.error('Failed to mark notification as read');
    }
  };

  if (error) return <div>{error}</div>;

  const paginatedNotifications = notifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(notifications.length / itemsPerPage);

  return (
    <Container>
      <Header>
        <Title>{translate('notifications.title')}</Title>
        <ActionContainer />
      </Header>

      {notifications.length > 0 ? (
        <>
          <NotificationList>
            {paginatedNotifications.map(notification => (
              <NotificationItem
                key={notification._id}
                onClick={() => !notification.isRead && handleMarkAsRead(notification._id)}
                isRead={notification.isRead}
              >
                <NotificationContent>
                  <NotificationText isRead={notification.isRead}>
                    {notification.description}
                  </NotificationText>
                  <NotificationTime>
                    {new Date(notification.createdAt).toLocaleString()}
                  </NotificationTime>
                </NotificationContent>
              </NotificationItem>
            ))}
          </NotificationList>
          {totalPages > 1 && (
            <Pagination>
              <PageButton
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                &lt;
              </PageButton>
              <PageInfo>
                Page {currentPage} of {totalPages}
              </PageInfo>
              <PageButton
                onClick={() => 
                  setCurrentPage(prev => 
                    Math.min(prev + 1, totalPages)
                  )
                }
                disabled={currentPage === totalPages}
              >
                &gt;
              </PageButton>
            </Pagination>
          )}
        </>
      ) : (
        <EmptyState>
          <EmptyStateImage src={noNotificationsImage} alt="No notifications" />
          <EmptyStateText>
            {translate('notifications.noNotifications')}
          </EmptyStateText>
        </EmptyState>
      )}
    </Container>
  );
};

export default Notifications;