'use client';

import { useState, useEffect } from 'react';
import { Input, Card, Typography, Badge, Empty } from 'antd';
import {
  SearchOutlined,
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  TeamOutlined,
  LoadingOutlined,
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
    <Card className="overflow-hidden shadow-lg rounded-lg transition-all duration-300">
      <div className="relative">
        <div className="h-64 w-full bg-gray-200">
          <Image
            src={member?.img}
            alt={member?.fullName}
            className="!w-full !h-full !object-cover"
            width={400}
            height={250}
          />
        </div>
        <Badge.Ribbon
          text={member?.proffession}
          color="black"
          className="font-medium"
        />
      </div>

      <div className="p-6">
        <Title level={4} className="mb-4 font-bold">
          {member?.fullName}
        </Title>

        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <EnvironmentOutlined className="mr-2 text-blue-600" />
            <Text className="text-sm">{member?.eldestRelative}</Text>
          </div>

          <div className="flex items-center text-gray-600">
            <MailOutlined className="mr-2 text-blue-600" />
            <Text className="text-sm">{member?.email}</Text>
          </div>

          <div className="flex items-center text-gray-600">
            <PhoneOutlined className="mr-2 text-blue-600" />
            <Text className="text-sm">{member?.contactNo}</Text>
          </div>

          <div className="flex items-center text-gray-600">
            <TeamOutlined className="mr-2 text-blue-600" />
            <Text className="text-sm">{member?.familyName}</Text>
          </div>
        </div>
      </div>
    </Card>
  );
};

export const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <Card key={i} loading className="h-96" />
    ))}
  </div>
);

const EmptyState = ({ searchTerm }: { searchTerm: string }) => (
  <div className="col-span-3 py-16 text-center">
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={
        <div>
          <Title level={4} className="text-gray-500 mb-2">
            {searchTerm ? 'No family members found' : 'Start your search'}
          </Title>
          <Text className="text-gray-400">
            {searchTerm
              ? `No results for "${searchTerm}". Try a different profession.`
              : 'Enter a profession in the search box to find family members'}
          </Text>
        </div>
      }
    />
  </div>
);

export default function DirectoryPage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [hasSearched, setHasSearched] = useState(false);

  const { data, isLoading, isFetching } = useFamilyDirectionQuery(
    { searchTerm },
    { skip: !searchTerm }
  );

  const debouncedSearch = debounce((value: string) => {
    setSearchTerm(value.trim());
    if (value.trim()) {
      setHasSearched(true);
    }
  }, 500);

  useEffect(() => {
    debouncedSearch(inputValue);
    return () => {
      debouncedSearch.cancel();
    };
  }, [inputValue, debouncedSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const showLoading = isLoading || isFetching;

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

        <div className="mb-8 flex justify-center">
          <div className="relative w-full max-w-md">
            <Input
              placeholder="Search by profession (e.g., Doctor, Engineer, Teacher...)"
              prefix={<SearchOutlined className="text-gray-400" />}
              suffix={
                showLoading && inputValue ? (
                  <LoadingOutlined spin className="text-blue-500" />
                ) : null
              }
              value={inputValue}
              onChange={handleInputChange}
              className="w-full text-lg py-2 rounded-full shadow-md border-2 focus:border-blue-500 transition-all duration-200"
              size="large"
            />
            {inputValue && (
              <div className="absolute top-full left-0 right-0 mt-1 text-xs text-gray-500 text-center">
                {showLoading ? 'Searching...' : `Press Enter or wait to search`}
              </div>
            )}
          </div>
        </div>

        {showLoading ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.data?.length > 0 ? (
              data.data.map((member: FamilyMember, index: number) => (
                <MemberCard key={index} member={member} />
              ))
            ) : (
              <EmptyState searchTerm={searchTerm} />
            )}
          </div>
        )}

        {/* Additional helpful info */}
        {!hasSearched && (
          <div className="mt-16 text-center">
            <Text className="text-gray-500">
              💡 Tip: Try searching for common professions like
              &quot;Doctor&quot;, &quot;Engineer&quot;, &quot;Teacher&quot;,
              &quot;Business&quot;, etc.
            </Text>
          </div>
        )}
      </div>
    </div>
  );
}
