'use client';
import React, { useMemo, useCallback, memo } from 'react';
import { FixedSizeList as List } from 'react-window';
import { FaBell, FaUser } from 'react-icons/fa';
import { CiSettings } from 'react-icons/ci';
import { Button, Card, Spin, Badge } from 'antd';
import {
  useGetNotificationQuery,
  useMarkAsReadMutation,
} from '@/app/provider/Redux/service/notificationApis';
import { toast } from 'sonner';
import { MdEmojiEvents } from 'react-icons/md';

const AllNotificationPage = () => {
  const { data, isLoading } = useGetNotificationQuery();
  const [markAsReadApis, { isLoading: markAsReadLoading }] =
    useMarkAsReadMutation();
  const notifications = useMemo(() => data?.data || [], [data]);

  const renderIcon = useCallback((type: string) => {
    switch (type) {
      case 'newJoined':
        return <FaUser />;
      case 'newEvent':
        return <MdEmojiEvents />;
      default:
        return <CiSettings />;
    }
  }, []);

  const formatTime = useCallback((dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await markAsReadApis({ id })
        .unwrap()
        .then((res) => {
          if (res?.success) {
            toast.success(res?.message || 'Notification marked as read');
          }
        });
    } catch (error: any) {
      toast.error(
        error?.data?.message || 'Failed to mark notification as read'
      );
    }
  };

  const NotificationItem = memo(
    ({ index, style }: { index: number; style: any }) => {
      const item = notifications[index];
      return (
        <div style={style}>
          <div
            className={`px-4 sm:px-6 py-4 border-b border-gray-100 transition-colors ${
              !item?.isRead ? 'bg-blue-50 border-l-4 border-blue-500' : ''
            } hover:bg-gray-50 flex flex-col sm:flex-row justify-between`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`text-xl flex-shrink-0 ${
                  !item?.isRead ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                {renderIcon(item?.type)}
              </div>

              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3
                    className={`font-medium truncate ${
                      !item?.isRead ? 'text-gray-900' : 'text-gray-600'
                    }`}
                  >
                    {item?.title}
                  </h3>
                  {!item?.isRead && (
                    <Badge
                      size="small"
                      color="blue"
                      className="flex-shrink-0"
                    />
                  )}
                </div>

                <p
                  className={`text-sm line-clamp-2 mb-2 ${
                    !item?.isRead ? 'text-gray-700' : 'text-gray-500'
                  }`}
                >
                  {item?.message}
                </p>

                <span className="text-xs text-gray-400">
                  {formatTime(item?.createdAt)}
                </span>
              </div>
            </div>

            {item?.isRead !== true && (
              <div className="mt-2 sm:mt-0 sm:ml-4">
                <Button
                  size="small"
                  type="link"
                  className="text-blue-500 hover:text-blue-600 p-0 h-auto"
                  onClick={() => markAsRead(item?._id)}
                >
                  {markAsReadLoading ? <Spin size="small" /> : 'Mark as read'}
                </Button>
              </div>
            )}
          </div>
        </div>
      );
    }
  );

  NotificationItem.displayName = 'NotificationItem';

  return (
    <Spin spinning={isLoading}>
      <div className="min-h-screen pt-24 pb-6 px-4 sm:px-6 md:px-8 container mx-auto flex flex-col">
        <div className="flex-shrink-0 bg-white border-b border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                Notifications
              </h1>
              {data?.meta?.unreadCount > 0 && (
                <Badge
                  count={data.meta.unreadCount}
                  className="bg-blue-500"
                  overflowCount={999}
                />
              )}
            </div>
            <div className="text-sm text-gray-500">
              {data?.meta?.total || 0} total
              {data?.meta?.unreadCount > 0 && (
                <span className="ml-2 text-blue-600">
                  • {data.meta.unreadCount} unread
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white overflow-hidden">
          <Card className="h-full border-0 rounded-none">
            {notifications.length > 0 ? (
              <List
                width="100%"
                height={
                  typeof window !== 'undefined' ? window.innerHeight - 320 : 500
                }
                itemCount={notifications.length}
                itemSize={150}
                className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
              >
                {NotificationItem}
              </List>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[200px] text-gray-500">
                <FaBell className="text-3xl sm:text-4xl mb-4 text-gray-300" />
                <p className="text-sm sm:text-base">No notifications found</p>
              </div>
            )}
          </Card>
        </div>

        {data?.meta?.totalPage > data?.meta?.page && (
          <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-white text-center">
            <Button
              type="link"
              className="text-blue-500 hover:text-blue-600 text-sm sm:text-base"
            >
              Load more notifications
            </Button>
          </div>
        )}
      </div>
    </Spin>
  );
};

export default AllNotificationPage;
