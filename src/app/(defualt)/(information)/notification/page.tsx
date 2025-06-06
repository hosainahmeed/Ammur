'use client'
import { Button } from '@/components/ui/button';
import React from 'react';

interface NotificationItem {
  id: string;
  message: string;
  time: string;
  timestamp: string;
}

const NotificationComponent: React.FC = () => {
  const notifications: NotificationItem[] = [
    {
      id: '1',
      message: 'A new comment has been uploaded to Block History Timeline',
      time: 'a new message has arrived',
      timestamp: '2 hours ago',
    },
    {
      id: '2',
      message: 'A new comment has been uploaded to Block History Timeline',
      time: 'a new message has arrived',
      timestamp: '3 hours ago',
    },
    {
      id: '3',
      message: 'A new comment has been uploaded to Block History Timeline',
      time: 'a new message has arrived',
      timestamp: '5 hours ago',
    },
    {
      id: '4',
      message: 'A new comment has been uploaded to Block History Timeline',
      time: 'a new message has arrived',
      timestamp: '1 day ago',
    },
    {
      id: '5',
      message: 'A new comment has been uploaded to Block History Timeline',
      time: 'a new message has arrived',
      timestamp: '2 days ago',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Container with responsive padding */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-28">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 md:p-6 border-b border-gray-200 mb-2">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900">
            Notifications
          </h2>
          <Button className="gradient-button w-full sm:w-auto text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-2">
            Mark All Read
          </Button>
        </div>

        {/* Notification List */}
        <div className="divide-y divide-gray-100 bg-white rounded-lg sm:shadow-sm">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="p-3 sm:p-4 md:p-6 hover:bg-gray-50 transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg"
            >
              {/* Mobile Layout (stacked) */}
              <div className="block sm:hidden">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-gray-500">{notification.time}</p>
                    <strong className="text-xs text-gray-400">{notification.timestamp}</strong>
                  </div>
                  <button
                    className="text-blue-500 hover:text-blue-700 text-sm font-medium transition-colors duration-150 flex-shrink-0"
                    onClick={() => console.log(`View notification ${notification.id}`)}
                  >
                    View
                  </button>
                </div>
                <p className="text-sm text-gray-900 leading-relaxed">
                  {notification.message}
                </p>
              </div>

              {/* Tablet and Desktop Layout (side by side) */}
              <div className="hidden sm:flex justify-between items-start">
                <div className="flex-1 pr-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2 sm:mb-3">
                    <p className="text-sm md:text-base text-gray-500">{notification.time}</p>
                    <strong className="text-sm md:text-base text-gray-400">
                      {notification.timestamp}
                    </strong>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg text-gray-900 leading-relaxed">
                    {notification.message}
                  </p>
                </div>
                <button
                  className="text-blue-500 hover:text-blue-700 text-sm sm:text-base md:text-lg font-medium transition-colors duration-150 flex-shrink-0"
                  onClick={() => console.log(`View notification ${notification.id}`)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state for when no notifications exist */}
        {notifications.length === 0 && (
          <div className="text-center py-12 sm:py-16 md:py-20">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12 sm:h-16 sm:w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5V2h0z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-sm sm:text-base text-gray-500">You&lsquo;re all caught up! Check back later for new updates.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationComponent;