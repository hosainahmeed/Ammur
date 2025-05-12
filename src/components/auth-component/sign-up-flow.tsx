'use client';

import { useState } from 'react';
import Sidebar from './sidebar';
import CreateAccount from '../steps/create-account';
import VerifyEmail from '../steps/verify-email';
import InviteTeam from '../steps/invite-team';
import Welcome from '../steps/welcome';

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
  const [email, setEmail] = useState('');
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
      title: 'Verify your email',
      description: 'Enter your verification code',
      icon: 'mail',
      completed: false,
      current: false,
    },
    {
      id: 3,
      title: 'Invite your team',
      description: 'Start collaborating with your team',
      icon: 'users',
      completed: false,
      current: false,
    },
    {
      id: 4,
      title: 'Welcome to Untitled!',
      description: 'Get up and running in 3 minutes',
      icon: 'zap',
      completed: false,
      current: false,
    },
  ]);

  const goToNextStep = () => {
    if (currentStep < 4) {
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
      <div className='w-1/4 h-full'>
        <Sidebar steps={steps} currentStep={currentStep} goToStep={goToStep} />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {currentStep === 1 && (
              <CreateAccount onContinue={goToNextStep} setEmail={setEmail} />
            )}
            {currentStep === 2 && (
              <VerifyEmail onContinue={goToNextStep} email={email} />
            )}
            {currentStep === 3 && <InviteTeam onContinue={goToNextStep} />}
            {currentStep === 4 && <Welcome />}
          </div>
        </div>
        <div className="p-4 flex justify-center">
          <div className="flex space-x-2">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`h-1.5 w-16 rounded-full ${
                  step.id === currentStep
                    ? 'bg-green-600'
                    : step.completed
                    ? 'bg-green-600'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
