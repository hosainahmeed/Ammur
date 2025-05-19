'use client';
import { Breadcrumb, Card, Typography } from 'antd';
import React from 'react';
import { CalendarOutlined, EyeOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
const { Title, Text, Paragraph } = Typography;
function page() {
  return (
    <div className="min-h-screen container mx-auto py-28">
     <div className='my-3'>
       <Breadcrumb
        items={[
          {
            title: <Link href="/home">Home</Link>,
          },
          {
            title: <Link href="/upcoming-event">Upcoming event</Link>,
          }
        ]}
      />
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
              background: 'url("/image 31.png") center/cover no-repeat',
              borderRadius: '4px',
            }}
          />
        </div>

        <div style={{ padding: '16px' }}>
          <Title level={5} style={{ color: '#0C469D', margin: '0 0 4px 0' }}>
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
  );
}

export default page;
