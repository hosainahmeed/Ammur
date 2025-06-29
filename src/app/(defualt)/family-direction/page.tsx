'use client';

import { useState } from 'react';
import { Input, Card, Typography, Badge, Spin, Empty } from 'antd';
import {
  SearchOutlined,
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import { FamilyMember } from '@/types/models';
import { useFamilyDirectionQuery } from '@/app/provider/Redux/service/familyApis';
import debounce from 'lodash/debounce';

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
            src={member.img}
            alt={member.fullName}
            className="!w-full !h-full !object-cover"
            width={400}
            height={250}
          />
        </div>
        <Badge.Ribbon
          text={member.proffession}
          color="black"
          className="font-medium"
        />
      </div>

      <div className="p-6">
        <Title level={4} className="mb-4 font-bold">
          {member.fullName}
        </Title>

        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <EnvironmentOutlined className="mr-2 text-blue-600" />
            <Text className="text-sm">{member.eldestRelative}</Text>
          </div>

          <div className="flex items-center text-gray-600">
            <MailOutlined className="mr-2 text-blue-600" />
            <Text className="text-sm">{member.email}</Text>
          </div>

          <div className="flex items-center text-gray-600">
            <PhoneOutlined className="mr-2 text-blue-600" />
            <Text className="text-sm">{member.contactNo}</Text>
          </div>

          <div className="flex items-center text-gray-600">
            <TeamOutlined className="mr-2 text-blue-600" />
            <Text className="text-sm">{member.familyName}</Text>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default function DirectoryPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { data } = useFamilyDirectionQuery({ searchTerm: searchTerm });

  const debouncedSearchTerm = debounce((value: string) => {
    setLoading(true);
    setSearchTerm(value.toLowerCase());
    setLoading(false);
  }, 500);

  return (
    <Spin spinning={loading}>
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
              placeholder="Search by profession"
              prefix={<SearchOutlined className="text-gray-400" />}
              onChange={(e) => debouncedSearchTerm(e.target.value)}
              className="w-full max-w-md text-lg py-2 rounded-full shadow"
              size="large"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.data?.length > 0 ? (
              data?.data?.map((member: FamilyMember, index: number) => (
                <MemberCard key={index} member={member} />
              ))
            ) : searchTerm === '' ? (
              <div className="col-span-3 py-16 text-center">
                <Title level={4} className="text-gray-500">
                  Please search with profession
                </Title>
                <Text className="text-gray-400">
                  Try adjusting your search criteria
                </Text>
              </div>
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
    </Spin>
  );
}
