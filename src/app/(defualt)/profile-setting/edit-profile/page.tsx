'use client';
import React from 'react';
import { useState } from 'react';
import { Alert, Breadcrumb, Spin } from 'antd';
import { FaCameraRetro } from 'react-icons/fa6';
import ProfileEditComponent from '@/components/auth-component/ProfileEditComponent';
import Image from 'next/image';
import { useGetProfileDataQuery } from '@/app/provider/Redux/service/profileApis';
import { imageUrl } from '@/lib/server';
import Link from 'next/link';

const ProfilePage = () => {
  const { data: profileData, isLoading } = useGetProfileDataQuery();
  console.log(profileData);
  const [image, setImage] = useState<File | null | string>(
    profileData?.data?.img
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setImage(file);
    }
  };

  const profileImage = image
    ? typeof image === 'string'
      ? image
      : URL.createObjectURL(image as Blob)
    : profileData?.data?.img
    ? imageUrl(profileData?.data?.img)
    : 'https://placehold.co/400';

  return (
    <Spin spinning={isLoading}>
      <div className="container bg-[#072A5E]/10 rounded-md mx-auto h-screen my-28">
      <Alert message={
        <Breadcrumb
          items={[
            {
              title: <Link href="/profile-setting">Profile</Link>,
            },
            {
              title: 'Edit Profile',
            },
          ]}
        />
      } type="info" className='!w-full !my-2' />
        <div className="container bg-[#072A5E]  mx-auto p-4 rounded-md">
          <div className="w-full flex items-center justify-center center-center">
            <div
              onClick={() => {
                const fileInput = document.getElementById(
                  'fileInput'
                ) as HTMLInputElement;
                fileInput?.click();
              }}
              className="w-24 h-24 border-2 border-black p-1 cursor-pointer rounded-full relative"
            >
              <Image
                className="w-full h-full object-cover rounded-full"
                src={profileImage}
                alt="Profile picture"
                width={96}
                height={96}
              />
              <button
                aria-label="Edit Profile Picture"
                className="absolute right-0 bottom-2 rounded-full bg-[#072A5E] p-2"
              >
                <FaCameraRetro
                  size={12}
                  className="!text-white cursor-pointer"
                />
              </button>

              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </div>
          </div>
          <p className="text-2xl text-center !text-white mt-2">
            {profileData?.data?.fullName}
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-[var(--black-200)] p-4 rounded-md">
          <ProfileEditComponent data={profileData?.data} image={image} />
        </div>
      </div>
    </Spin>
  );
};

export default ProfilePage;
