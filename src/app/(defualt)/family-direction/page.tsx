'use client';

import { useState, useEffect } from 'react';
import { Input, Card, Typography, Badge } from 'antd';
import {
  SearchOutlined,
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import { FamilyMember } from '@/lib/types';
import { familyMembers } from '@/lib/familyData';

const { Title, Text } = Typography;

interface MemberCardProps {
  member: FamilyMember;
}

const MemberCard = ({ member }: MemberCardProps) => {
  return (
    <Card
      className="overflow-hidden shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl"
      bodyStyle={{ padding: 0 }}
    >
      <div className="relative">
        <div className="h-64 w-full bg-gray-200">
          <Image
            src={member.photoUrl}
            alt={member.name}
            className="!w-full !h-full !object-cover"
            width={400}
            height={250}
          />
        </div>
        <Badge.Ribbon text={member.role} color="blue" className="font-medium" />
      </div>

      <div className="p-6">
        <Title level={4} className="mb-4 font-bold">
          {member.name}
        </Title>

        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <EnvironmentOutlined className="mr-2 text-blue-600" />
            <Text className="text-sm">{member.location}</Text>
          </div>

          <div className="flex items-center text-gray-600">
            <MailOutlined className="mr-2 text-blue-600" />
            <Text className="text-sm">{member.email}</Text>
          </div>

          <div className="flex items-center text-gray-600">
            <PhoneOutlined className="mr-2 text-blue-600" />
            <Text className="text-sm">{member.phone}</Text>
          </div>

          <div className="flex items-center text-gray-600">
            <TeamOutlined className="mr-2 text-blue-600" />
            <Text className="text-sm">{member.family}</Text>
          </div>
        </div>

        {/* <div className="mt-6 pt-4 border-t border-gray-200">
          <button className="w-full py-2 !bg-[#072A5E] !text-white rounded-md hover:!bg-[#072A5E] transition-colors duration-300">
            View Profile
          </button>
        </div> */}
      </div>
    </Card>
  );
};

export default function DirectoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // Delay of 500ms

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  const filteredMembers = familyMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      member.family.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  return (
    <div className="py-28 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Title level={1} className="text-4xl font-bold mb-4">
            Our Family Directory
          </Title>
          <Text className="text-lg text-gray-600">
            Connect with our extended family members across the world
          </Text>
        </div>

        <div className="mb-12 flex justify-center">
          <Input
            placeholder="Search by name, role or family"
            prefix={<SearchOutlined className="text-gray-400" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md text-lg py-2 rounded-full shadow"
            size="large"
          />
        </div>

        {debouncedSearchTerm && (
          <p className="text-center text-gray-500 mb-8">
            Search results for{' '}
            <span className="font-medium">{`"${debouncedSearchTerm}"`}</span>
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member: FamilyMember, index) => (
              <MemberCard key={index} member={member} />
            ))
          ) : (
            <div className="col-span-3 py-16 text-center">
              <Title level={4} className="text-gray-500">
                No family members found
              </Title>
              <Text className="text-gray-400">
                Try adjusting your search criteria
              </Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
