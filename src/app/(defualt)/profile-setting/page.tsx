import React from 'react';
import Image from 'next/image';
import { User, Mail, MapPin, Phone, Users, Crown, Edit } from 'lucide-react';
import Link from 'next/link';

// Define types for user data
interface UserData {
  name: string;
  profession: string;
  address: string;
  email: string;
  phone: string;
  familyStatus: string;
  subscription: string;
  avatar: string;
}

// Define props for InfoCard component
interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

const ProfilePage: React.FC = () => {
  // Mock user data - in a real app this would come from API or context
  const userData: UserData = {
    name: 'Sarah Johnson',
    profession: 'Senior UI/UX Designer',
    address: '123 Main Street, San Francisco, CA',
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567',
    familyStatus: 'Married, 2 children',
    subscription: 'Premium Plan',
    avatar: 'https://avatar.iran.liara.run/public/5',
  };

  // Info card component for each information section
  const InfoCard: React.FC<InfoCardProps> = ({ icon, title, value }) => (
    <div className="flex items-start gap-3 sm:gap-4 bg-white p-3 sm:p-4 rounded-lg shadow-sm">
      <div className="mt-0.5 sm:mt-1 text-[#072A5E]">
        {React.cloneElement(icon as React.ReactElement)}
      </div>
      <div className="overflow-hidden">
        <h3 className="text-xs sm:text-sm font-medium text-gray-500 truncate">
          {title}
        </h3>
        <p className="text-base sm:text-lg font-medium text-gray-800 truncate">
          {value}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-12 sm:pb-16">
        {/* Profile header section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full overflow-hidden p-1 ring-2 sm:ring-4 ring-white shadow-lg mx-auto sm:mx-0">
            <Image
              src={userData.avatar}
              width={400}
              height={400}
              className="w-full h-full rounded-full object-cover"
              alt="Profile picture"
              priority
            />
          </div>
          <div className="md:flex-1 w-full text-center sm:text-left">
            <div className="mb-3 sm:mb-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {userData.name}
              </h1>
              <p className="text-base sm:text-lg text-[#072A5E]">
                {userData.profession}
              </p>
            </div>
            <Link href={'/profile-setting/edit-profile'}>
              <button className="mt-3 sm:mt-2 cursor-pointer flex w-full sm:w-fit items-center justify-center sm:justify-start gap-2 bg-[#072A5E] hover:bg-[#072A5E] text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg transition-colors text-sm sm:text-base">
                <Edit size={16} />
                Edit Profile
              </button>
            </Link>
          </div>
        </div>

        {/* Subscription banner */}
        <div className="bg-gradient-to-r from-[#072A5E] to-[#072A5E] text-white p-3 sm:p-4 rounded-lg mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <Crown size={20} className="flex-shrink-0" />
            <div>
              <p className="text-xs sm:text-sm font-medium">
                Active Subscription
              </p>
              <p className="text-base sm:text-lg font-semibold">
                {userData.subscription}
              </p>
            </div>
          </div>
          <Link href={'/pricing'}>
            <button className="bg-white cursor-pointer text-[#072A5E] py-1 px-2 sm:px-3 rounded text-xs sm:text-sm font-medium hover:bg-[#072A5E] transition-colors self-end sm:self-auto">
              Manage
            </button>
          </Link>
        </div>

        {/* Personal information section */}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <InfoCard icon={<User />} title="Full Name" value={userData.name} />
            <InfoCard
              icon={<Mail />}
              title="Email Address"
              value={userData.email}
            />
            <InfoCard
              icon={<MapPin />}
              title="Address"
              value={userData.address}
            />
            <InfoCard
              icon={<Phone />}
              title="Phone Number"
              value={userData.phone}
            />
            <InfoCard
              icon={<Users />}
              title="Family Status"
              value={userData.familyStatus}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
