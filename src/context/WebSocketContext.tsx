import { createContext, useContext, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';
import { useNotifications } from './NotificationContext';
import { io, Socket } from 'socket.io-client';

interface WebSocketContextType {
  socket: Socket | null;
  connected: boolean;
}

const WebSocketContext = createContext<WebSocketContextType>({
  socket: null,
  connected: false,
});

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const socketRef = useRef<Socket | null>(null);
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  useEffect(() => {
    if (user) {
      socketRef.current = io(process.env.NEXT_PUBLIC_WS_URL!, {
        auth: {
          token: user.token
        }
      });

      socketRef.current.on('connect', () => {
        console.log('WebSocket connected');
      });

      socketRef.current.on('notification', (notification) => {
        addNotification(notification);
      });

      socketRef.current.on('order_update', (order) => {
        addNotification({
          title: 'Order Update',
          message: `Order #${order.id} status changed to ${order.status}`,
          type: 'order'
        });
      });

      return () => {
        socketRef.current?.disconnect();
      };
    }
  }, [user]);

  return (
    <WebSocketContext.Provider value={{
      socket: socketRef.current,
      connected: !!socketRef.current?.connected
    }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export const useWebSocket = () => useContext(WebSocketContext); 