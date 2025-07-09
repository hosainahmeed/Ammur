'use client';
import {
  useGetEventQuery,
  useJoinEventMutation,
} from '@/app/provider/Redux/service/eventApis';
import Link from 'next/link';
import { Alert, Button, Modal, Popconfirm } from 'antd';
import DynamicHeader from '@/components/share/DynamicHeader';
import { Card, Typography } from 'antd';
import { CalendarOutlined, EyeOutlined } from '@ant-design/icons';
import { useUserContext } from '@/context/userContext';
import { toast } from 'sonner';
import { FaPlayCircle } from 'react-icons/fa';
import { useState } from 'react';

const { Title, Text, Paragraph } = Typography;

interface Event {
  _id: string;
  title: string;
  description: string;
  duration: string;
  date: string;
  img: string;
  video: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  joinedMembers: string[];
}

export default function Page() {
  const { data, isLoading } = useGetEventQuery();
  const { currentUser } = useUserContext();
  const [joinEvent] = useJoinEventMutation();
  const [showVideo, setShowVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  console.log(currentUser);
  const handleJoinEvent = async (id: string) => {
    if (!currentUser?._id) {
      toast.error('Please login first');
      return;
    }
    try {
      await joinEvent({ id, userId: currentUser?._id })
        .unwrap()
        .then((res) => {
          console.log(res);
          if (res?.success) {
            toast.success('You have joined the event');
          }
        });
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || 'Something went wrong!');
    }
  };
  return (
    <>
      <DynamicHeader title="Upcoming Event" />
      <div className="min-h-screen container mx-auto py-28 px-4">
        <Alert
          className="!mb-8"
          message={
            <div>
              {' '}
              <Link href="/home" className="hover:underline">
                Home
              </Link>{' '}
              /{' '}
              <Link href="/upcoming-event" className="hover:underline">
                Upcoming event
              </Link>
            </div>
          }
        />
        <Title level={4} style={{ marginBottom: '24px' }}>
          Family News & Announcements
        </Title>
        {isLoading ? (
          <div className="text-center py-32 text-gray-500">
            Loading events...
          </div>
        ) : data?.data?.length === 0 ? (
          <div className="text-center py-32 text-gray-500">
            No results found
          </div>
        ) : (
          <div className="space-y-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.data?.map((event: Event) => (
              <div key={event?._id} style={{ marginBottom: '24px' }}>
                <Card
                  style={{
                    background: '#f0f5ff',
                    borderRadius: '8px',
                    overflow: 'hidden',
                  }}
                  bodyStyle={{ padding: '0' }}
                >
                  <div style={{ position: 'relative', padding: '20px' }}>
                    <div
                      style={{
                        width: '100%',
                        height: '250px',
                        background: `url("${event?.img}") center/cover no-repeat`,
                        borderRadius: '4px',
                      }}
                    />
                    {event?.video && (
                      <FaPlayCircle
                        onClick={() => {
                          setVideoUrl(event?.video);
                          setShowVideo(true);
                        }}
                        size={50}
                        className="absolute text-white cursor-pointer hover:scale-105 transition-all z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      />
                    )}
                  </div>

                  <div style={{ padding: '16px' }}>
                    <Title
                      level={5}
                      style={{ color: '#0C469D', marginBottom: '4px' }}
                    >
                      {event?.title}
                    </Title>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '8px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <CalendarOutlined
                          style={{ color: '#1890ff', marginRight: '8px' }}
                        />
                        <Text type="secondary">{event?.date}</Text>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <EyeOutlined style={{ marginRight: '8px' }} />
                        <Text type="secondary">
                          {event?.joinedMembers?.length} people joined
                        </Text>
                      </div>
                    </div>

                    <Paragraph style={{ margin: '0 0 16px 0' }}>
                      {event?.description}
                    </Paragraph>

                    <span style={{ color: '#1890ff', display: 'block' }}>
                      CountDown :{event?.date}
                    </span>
                    <Popconfirm
                      placement="bottom"
                      okText="Join"
                      cancelText="Cancel"
                      okButtonProps={{ className: 'gradient-button' }}
                      title="Are you sure to join this event?"
                      onConfirm={() => handleJoinEvent(event?._id)}
                    >
                      <Button className="gradient-button hover:!bg-[linear-gradient(125deg,#0C469D,#0C469D,#FFFFFF)]">
                        Respond Now
                      </Button>
                    </Popconfirm>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}
        <Modal
          open={showVideo}
          onCancel={() => setShowVideo(false)}
          footer={null}
          width={1200}
        >
          <video
            autoPlay
            className="!w-full !h-auto !max-h-[70vh] !rounded-lg !mb-6"
            src={videoUrl}
            controls
          />
        </Modal>
      </div>
    </>
  );
}
