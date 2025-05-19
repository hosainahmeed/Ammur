/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
'use client';
import { useState } from 'react';
import { Layout, Card, Typography, Row, Col, Space } from 'antd';
import { CalendarOutlined, EyeOutlined } from '@ant-design/icons';
import Head from 'next/head';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
interface Imenu {
  title: string;
  src: string;
  description: string;
  color: string;
  url: string;
}
export default function Home() {
  const [userName, setUserName] = useState('Ahmad');
  const [familyName, setFamilyName] = useState('Johnson / Williams');

  const menuItems: Imenu[] = [
    {
      title: 'Black History Timeline',
      src: '/icons/book.png',
      description: 'See what happened this week in history',
      color: 'white',
      url: '/timeline',
    },
    {
      title: 'Things to know',
      src: '/icons/things.png',
      description: 'Little lessons that last a lifetime',
      color: 'white',
      url: '/things-to-know',
    },
    {
      title: 'Family Directory',
      src: '/icons/family-directory.png',
      description: 'Find relatives by name, location, or profession',
      color: 'white',
      url: '/family-direction',
    },
    {
      title: 'Family Tree',
      src: '/icons/tree.png',
      description: 'Explore and add family stories',
      color: 'white',
      url: '/family-tree',
    },
    {
      title: 'Interviews & Stories',
      src: '/icons/interview.png',
      description: 'Listen to memories from our elders',
      color: 'white',
      url: '/interviews',
    },
    {
      title: 'Recipes & Traditions',
      src: '/icons/recipe.png',
      description: 'Try a family recipe or submit your own',
      color: 'white',
      url: '/recipes',
    },
    {
      title: 'Archive',
      src: '/icons/archive.png',
      description: 'View old photos, documents, and letters',
      color: 'white',
      url: '/archives',
    },
  ];

  return (
    <Layout
      className="!py-28"
      style={{ minHeight: '100vh', background: '#f0f2f5' }}
    >
      <Head>
        <title>Family Dashboard</title>
        <meta name="description" content="Johnson/Williams Family Site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Content
        style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}
      >
        {/* Welcome Header */}
        <div style={{ marginBottom: '24px' }}>
          <Title level={3} style={{ margin: 0 }}>
            Welcome back, {userName}
          </Title>
          <Text type="secondary">
            You&#39;re viewing: "{familyName}" Family Site
          </Text>
        </div>

        {/* Menu Grid */}
        <Row gutter={[16, 16]} style={{ marginBottom: '32px' }}>
          {menuItems.map((item, index) => (
            <Col xs={24} sm={12} md={8} lg={8} xl={6} key={index}>
              <Link href={item.url}>
                <Card
                  style={{
                    height: '100%',
                    background: item.color,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '16px',
                  }}
                  bodyStyle={{ padding: '12px' }}
                >
                  <Space direction="vertical" align="center" size="small">
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>
                      <Image
                        width={200}
                        height={200}
                        alt={item.title}
                        src={item.src}
                        className="w-16"
                      />
                    </div>
                    <Text strong style={{ fontSize: '16px', color: '#0C469D' }}>
                      {item.title}
                    </Text>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {item.description}
                    </Text>
                  </Space>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>

        {/* Family News & Announcements */}
        <div style={{ marginBottom: '24px' }}>
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
                  background: 'url("/image 31.png") center/cover no-repeat',
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
      </Content>
    </Layout>
  );
}
