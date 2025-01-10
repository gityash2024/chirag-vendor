// src/hooks/useNotifications.js
import { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'react-toastify';
import { getSocket } from '../services/socketService';
import { listNotifications, markNotificationsAsRead } from '../services/commonService';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const socketRef = useRef(null);

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const response = await listNotifications({ 
        recipientRole: 'vendor',
        isRead: false 
      });
      
      setNotifications(response.data.notifications || []);
      setUnreadCount(response.data.unreadCount || 0);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch notifications');
      toast.error('Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    socketRef.current = getSocket();
    const socket = socketRef.current;

    // Socket event handlers
    const handleNewNotification = (notification) => {
      console.log('New notification received:', notification);
      setNotifications(prev => [notification, ...prev]);
      setUnreadCount(prev => prev + 1);
      toast.info(notification.description);
    };

    const handleUpdateNotification = (updatedNotification) => {
      console.log('Notification updated:', updatedNotification);
      setNotifications(prev =>
        prev.map(notification =>
          notification._id === updatedNotification._id
            ? updatedNotification
            : notification
        )
      );
    };

    const handleDeleteNotification = (notificationId) => {
      console.log('Notification deleted:', notificationId);
      setNotifications(prev =>
        prev.filter(notification => notification._id !== notificationId)
      );
    };

    // Subscribe to socket events
    socket.on('newNotification', handleNewNotification);
    socket.on('updateNotification', handleUpdateNotification);
    socket.on('deleteNotification', handleDeleteNotification);

    // Initial fetch
    fetchNotifications();

    // Cleanup
    return () => {
      if (socket) {
        socket.off('newNotification', handleNewNotification);
        socket.off('updateNotification', handleUpdateNotification);
        socket.off('deleteNotification', handleDeleteNotification);
      }
    };
  }, [fetchNotifications]);

  const markAsRead = useCallback(async (notificationIds) => {
    try {
      await markNotificationsAsRead(notificationIds);
      setNotifications(prev =>
        prev.map(notification =>
          notificationIds.includes(notification._id)
            ? { ...notification, isRead: true }
            : notification
        )
      );
      setUnreadCount(prev => Math.max(0, prev - notificationIds.length));
    } catch (error) {
      toast.error('Failed to mark notifications as read');
    }
  }, []);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    refreshNotifications: fetchNotifications
  };
};