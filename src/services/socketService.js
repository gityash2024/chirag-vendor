// src/services/socketService.js
import io from 'socket.io-client';
import { baseUrl } from '../environment/environment';

let socket = null;

export const initializeSocket = (role) => {
  if (!socket) {
    // Create socket connection with auth token
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    
    socket = io(baseUrl, {
      transports: ['websocket'],
      autoConnect: true,
      auth: {
        token
      },
      query: {
        role: 'vendor'
      }
    });
    
    // Setup event listeners
    socket.on('connect', () => {
      console.log('Socket connected with ID:', socket.id);
      socket.emit('joinRoom', 'vendor');
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
      // Attempt to reconnect if disconnected
      if (reason === 'io server disconnect') {
        socket.connect();
      }
    });
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    return initializeSocket('vendor');
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};