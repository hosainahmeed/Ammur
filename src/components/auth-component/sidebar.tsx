'use client';

import Link from 'next/link';
import { Mail, User, Zap } from 'lucide-react';
import type { Step } from './sign-up-flow';
import Image from 'next/image';
import { IoIosPricetag } from 'react-icons/io';
import { MdMedicalInformation } from 'react-icons/md';
interface SidebarProps {
  steps: Step[];
  currentStep: number;
  goToStep: (step: number) => void;
}

export default function Sidebar({
  steps,
  currentStep,
  goToStep,
}: SidebarProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'user':
        return <User className="h-5 w-5 !text-white" />;
      case 'information':
        return <MdMedicalInformation className="h-5 w-5 !text-white" />;
      case 'mail':
        return <Mail className="h-5 w-5 !text-white" />;
      case 'price':
        return <IoIosPricetag className="h-5 w-5 !text-white" />;
      case 'zap':
        return <Zap className="h-5 w-5 !text-white" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-screen xl:block hidden bg-[#0D2A59] border-r border-gray-200 p-6">
      <div className="mb-10">
        <Link href="/" className="flex items-center">
          <Image
            className="w-12 h-12 rounded-full"
            src={'/icons/IconOnly.svg'}
            width={200}
            height={200}
            alt=""
          />
          <span className="ml-2 text-lg font-semibold !text-white">
            Family Legacy
          </span>
        </Link>
      </div>

      <div className="space-y-6">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => goToStep(step.id)}
            className={`flex items-start w-full  text-left ${
              step.current ? 'opacity-100' : 'opacity-60'
            } ${
              step.id <= currentStep ? 'cursor-pointer' : 'cursor-not-allowed'
            }`}
            disabled={step.id > currentStep}
          >
            <div
              className={`mt-0.5 mr-3 ${
                step.current ? 'text-gray-900' : 'text-gray-500'
              }`}
            >
              {getIcon(step.icon)}
            </div>
            <div className='border-b border-white !w-full mb-2'>
              <h3 className="font-medium  !text-white">{step.title}</h3>
              <p className="text-sm !text-white">{step.description}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="absolute bottom-6 left-6">
        <Link
          href="/"
          className="flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
          >
            <path
              d="M15.8332 10.0001H4.1665M4.1665 10.0001L9.99984 15.8334M4.1665 10.0001L9.99984 4.16675"
              stroke="currentColor"
              strokeWidth="1.67"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to home
        </Link>
      </div>
    </div>
  );
}
