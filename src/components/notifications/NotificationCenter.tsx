import { useNotifications } from '@/context/NotificationContext';
import { formatDistanceToNow } from 'date-fns';

export default function NotificationCenter() {
  const { notifications, markAsRead, removeNotification } = useNotifications();

  return (
    <div className="fixed right-4 bottom-4 w-80">
      <div className="bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto">
        <div className="p-4 border-b">
          <h3 className="font-medium">Notifications</h3>
        </div>
        
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No new notifications
          </div>
        ) : (
          <div className="divide-y">
            {notifications.map(notification => (
              <div
                key={notification.id}
                className={`p-4 ${notification.read ? 'bg-gray-50' : 'bg-white'}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{notification.title}</p>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="text-sm text-blue-600 hover:text-blue-800 mt-2"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 