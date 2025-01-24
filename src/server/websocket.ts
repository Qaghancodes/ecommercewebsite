import { Server } from 'socket.io';
import { verifyToken } from '@/lib/jwt';

export function initializeWebSocket(server: any) {
  const io = new Server(server, {
    cors: {
      origin: process.env.NEXT_PUBLIC_FRONTEND_URL,
      methods: ['GET', 'POST']
    }
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      const decoded = await verifyToken(token);
      socket.data.user = decoded;
      next();
    } catch (err) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    const userId = socket.data.user.id;
    
    // Join user's personal room
    socket.join(`user:${userId}`);

    // Join admin room if user is admin
    if (socket.data.user.role === 'admin') {
      socket.join('admin');
    }

    socket.on('disconnect', () => {
      socket.leave(`user:${userId}`);
      if (socket.data.user.role === 'admin') {
        socket.leave('admin');
      }
    });
  });

  return io;
} 