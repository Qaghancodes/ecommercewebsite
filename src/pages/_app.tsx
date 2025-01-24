import { AppProps } from 'next/app';
import { AuthProvider } from '@/context/AuthContext';
import { NotificationProvider } from '@/context/NotificationContext';
import { CartProvider } from '@/context/CartContext';
import { WebSocketProvider } from '@/context/WebSocketContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <WebSocketProvider>
        <NotificationProvider>
          <CartProvider>
            <Component {...pageProps} />
          </CartProvider>
        </NotificationProvider>
      </WebSocketProvider>
    </AuthProvider>
  );
}

export default MyApp; 