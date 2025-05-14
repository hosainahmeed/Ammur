'use client'
import React from 'react';
import { useState } from 'react';
import { Button } from 'antd';
import { FaCameraRetro } from 'react-icons/fa6';
import ProfileEditComponent from '@/components/auth-component/ProfileEditComponent';
import Image from 'next/image';
import ChangePassword from '@/components/auth-component/ChangePassword';

const Tabs = ['Edit Profile', 'Change Password'] as const;

type TabType = typeof Tabs[number];

const ProfilePage = () => {
    const [tab, setTab] = useState<TabType>(Tabs[0]);
    const [image, setImage] = useState<File | null | string>('https://avatar.iran.liara.run/public/');

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const file = e.target.files[0];
            setImage(file);
            localStorage.setItem('image', file.name);
        }
    }

    return (
        <div className='container mx-auto h-screen my-28'>
            <div className="container bg-[#072A5E]  mx-auto p-4 rounded-md">
                <div className="w-full  flex items-center justify-center center-center">
                    <div
                        onClick={() => {
                            if (tab === 'Edit Profile') {
                                const fileInput = document.getElementById('fileInput') as HTMLInputElement;
                                fileInput?.click();
                            }
                        }}
                        className="w-24 h-24 border-2 border-black p-1 cursor-pointer rounded-full relative"
                    >
                        <Image
                            className="w-full h-full object-cover rounded-full"
                            src={
                                'https://avatar.iran.liara.run/public/5'
                            }
                            alt="Profile"
                            width={96}
                            height={96}
                        />
                        {tab === 'Edit Profile' && (
                            <button
                                aria-label="Edit Profile Picture"
                                className="absolute right-0 bottom-2 rounded-full bg-[#072A5E] p-2"
                            >
                                <FaCameraRetro size={12} className="!text-white cursor-pointer" />
                            </button>
                        )}

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
                    Sarah Johnson
                </p>
            </div>

            <div className="mx-auto p-1 border rounded-sm !w-fit center-center my-3">
                {Tabs.map((item) => (
                    <Button
                        key={item}
                        style={{ width: '200px', justifyContent: 'center' }}
                        className={`${item === tab
                            ? '!bg-[#072A5E] !!text-white !border-0 !rounded-sm'
                            : '!border-0 !rounded-none !text-black !border-black !bg-transparent'
                            }`}
                        onClick={() => setTab(item)}
                    >
                        {item}
                    </Button>
                ))}
            </div>

            <div className="max-w-2xl mx-auto bg-[var(--black-200)] p-4 rounded-md">
                {tab === 'Edit Profile' ? (
                    <ProfileEditComponent image={image} />
                ) : (
                    <ChangePassword />
                )}
            </div>
        </div>
    );
};

export default ProfilePage;