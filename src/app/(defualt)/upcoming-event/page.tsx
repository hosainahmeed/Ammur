'use client';
import { useGetEventQuery } from '@/app/provider/Redux/service/eventApis';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Alert } from 'antd';
import DynamicHeader from '@/components/share/DynamicHeader';
import { Card, Typography } from 'antd';
import { CalendarOutlined, EyeOutlined } from '@ant-design/icons';

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
}

export default function Page() {
  const { data, isLoading } = useGetEventQuery();

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
        {isLoading ? (
          <div className="text-center py-32 text-gray-500">
            Loading events...
          </div>
        ) : data?.data?.length === 0 ? (
          <div className="text-center py-32 text-gray-500">
            No results found
          </div>
        ) : (
          <div className="space-y-10">
            {data?.data?.map((event: Event) => (
              <div key={event?._id} style={{ marginBottom: '24px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px',
                  }}
                >
                  <Title level={4} style={{ margin: 0 }}>
                    Family News & Announcements
                  </Title>
                  <Link href={'/upcoming-event'}>
                    {' '}
                    <Button className="gradient-button">View all</Button>
                  </Link>
                </div>

                <Card
                  style={{
                    background: '#f0f5ff',
                    borderRadius: '8px',
                    overflow: 'hidden',
                  }}
                  bodyStyle={{ padding: '0' }}
                >
                  <div style={{ padding: '16px' }}>
                    <Text style={{ fontSize: '24px' }} strong>
                      Upcoming event :
                    </Text>
                  </div>

                  <div style={{ position: 'relative', padding: '20px' }}>
                    <div
                      style={{
                        width: '100%',
                        height: '250px',
                        background:
                          'url("/image 31.png") center/cover no-repeat',
                        borderRadius: '4px',
                      }}
                    />
                  </div>

                  <div style={{ padding: '16px' }}>
                    <Title
                      level={5}
                      style={{ color: '#0C469D', margin: '0 0 4px 0' }}
                    >
                      Johnson Family Reunion 2025
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
                        <Text type="secondary">April 27, 2025</Text>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <EyeOutlined style={{ marginRight: '8px' }} />
                        <Text type="secondary">3 people joined</Text>
                      </div>
                    </div>

                    <Paragraph style={{ margin: '0 0 16px 0' }}>
                      Join us for a day of family, food, games, and celebration!
                    </Paragraph>

                    <Button className="gradient-button">Respond Now</Button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
