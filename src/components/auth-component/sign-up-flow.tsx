'use client';

import { useState } from 'react';
import Sidebar from './sidebar';
import CreateAccount from '../steps/create-account';
import InviteTeam from '../steps/invite-team';
import Welcome from '../steps/welcome';
import VerifyEmail from '../steps/VerifyEmail';
import PersonalInformation from '../steps/personalInformation';

export type Step = {
  id: number;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
  current: boolean;
};

export default function SignUpFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [value, setValues] = useState({});
  const [steps, setSteps] = useState<Step[]>([
    {
      id: 1,
      title: 'Your details',
      description: 'Provide an email and password',
      icon: 'user',
      completed: false,
      current: true,
    },
    {
      id: 2,
      title: 'Your details',
      description: 'Provide an email and password',
      icon: 'user',
      completed: false,
      current: false,
    },
    {
      id: 3,
      title: 'Verify your email',
      description: 'Enter your verification code',
      icon: 'mail',
      completed: false,
      current: false,
    },
    {
      id: 4,
      title: 'Invite your team',
      description: 'Start collaborating with your team',
      icon: 'users',
      completed: false,
      current: false,
    },
    {
      id: 5,
      title: 'Welcome to Untitled!',
      description: 'Get up and running in 3 minutes',
      icon: 'zap',
      completed: false,
      current: false,
    },
  ]);
  console.log(value)
  const goToNextStep = () => {
    if (currentStep < 5) {
      const newSteps = steps.map((step) => {
        if (step.id === currentStep) {
          return { ...step, completed: true, current: false };
        } else if (step.id === currentStep + 1) {
          return { ...step, current: true };
        }
        return step;
      });

      setSteps(newSteps);
      setCurrentStep(currentStep + 1);
    }
  };

  const goToStep = (stepId: number) => {
    if (stepId <= currentStep) {
      const newSteps = steps.map((step) => {
        return {
          ...step,
          current: step.id === stepId,
        };
      });

      setSteps(newSteps);
      setCurrentStep(stepId);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className='xl:w-1/4 h-full'>
        <Sidebar steps={steps} currentStep={currentStep} goToStep={goToStep} />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="p-4 flex justify-center">
          <div className="flex space-x-2">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`h-1.5 w-16 rounded-full ${step.id === currentStep
                  ? 'bg-[#072A5E]'
                  : step.completed
                    ? 'bg-[#072A5E]'
                    : 'bg-gray-200'
                  }`}
              />
            ))}
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-2xl">
            {currentStep === 1 && (
              <CreateAccount onContinue={goToNextStep} setValues={setValues} />
            )}
            {currentStep === 2 && (
              <PersonalInformation onContinue={goToNextStep} setValues={setValues} />
            )}
            {currentStep === 3 && (
              <VerifyEmail onContinue={goToNextStep} setValues={setValues} />
            )}
            {currentStep === 4 && <InviteTeam onContinue={goToNextStep} />}
            {currentStep === 5 && <Welcome />}
          </div>
        </div>

      </div>
    </div>
  );
}
