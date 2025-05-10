'use client';

import { useState } from 'react';
import { Input, Card, Col, Row, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { FamilyMember } from '@/lib/types';
import Image from 'next/image';

const { Title } = Typography;

const familyMembers: FamilyMember[] = [
  {
    name: 'Mr. John',
    role: 'Doctor',
    location: 'Atlanta, Georgia, United States',
    email: 'john.doe@gmail.com',
    photoUrl: '/images/photo1.jpg',
  },
  {
    name: 'Mr. John',
    role: 'Doctor',
    location: 'Atlanta, Georgia, United States',
    email: 'john.doe@gmail.com',
    photoUrl: '/images/photo2.jpg',
  },
  {
    name: 'Mr. John',
    role: 'Doctor',
    location: 'Atlanta, Georgia, United States',
    email: 'john.doe@gmail.com',
    photoUrl: '/images/photo3.jpg',
  },
  {
    name: 'Mr. John',
    role: 'Doctor',
    location: 'Atlanta, Georgia, United States',
    email: 'john.doe@gmail.com',
    photoUrl: '/images/photo4.jpg',
  },
  {
    name: 'Mr. John',
    role: 'Doctor',
    location: 'Atlanta, Georgia, United States',
    email: 'john.doe@gmail.com',
    photoUrl: '/images/photo5.jpg',
  },
  {
    name: 'Mr. John',
    role: 'Doctor',
    location: 'Atlanta, Georgia, United States',
    email: 'john.doe@gmail.com',
    photoUrl: '/images/photo6.jpg',
  },
];

export default function DirectoryPage() {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredMembers = familyMembers.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='py-28'>
      <div className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <Title level={2} className="text-center mb-6">
            Our Family&lsquo;s Strength: Explore the Directory
          </Title>

          <div className="mb-8 flex justify-center">
            <Input
              placeholder="Search for a family member"
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ maxWidth: 400 }}
            />
          </div>

          <p className="text-center text-sm text-gray-500 mb-4">
            Search result for <strong>{`"${searchTerm}"`}</strong>
          </p>

          <Row gutter={[16, 16]} justify="center">
            {filteredMembers.map((member, index) => (
              <Col span={8} key={index}>
                <Card
                  cover={
                    <Image
                      width={400}
                      height={250}
                      alt={member.name}
                      src={member.photoUrl}
                    />
                  }
                >
                  <Title level={4}>{member.name}</Title>
                  <p>{member.role}</p>
                  <p>{member.location}</p>
                  <p>{member.email}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}
