/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import Sidebar from './sidebar';
import CreateAccount from '../steps/create-account';
import Welcome from '../steps/welcome';
import VerifyEmail from '../steps/VerifyEmail';
import PersonalInformation from '../steps/personalInformation';
import Pricing from '../steps/Pricing';

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
      title: 'Cradintials',
      description: 'Provide your information',
      icon: 'user',
      completed: false,
      current: true,
    },
    {
      id: 2,
      title: 'Identification',
      description: 'Give your Identification.',
      icon: 'information',
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
      title: 'Choose yor plan',
      description: 'Get plan to more access and smooth experience',
      icon: 'price',
      completed: false,
      current: false,
    },
    {
      id: 5,
      title: 'Welcome to Family legacy!',
      description: 'Thank you for join our family',
      icon: 'zap',
      completed: false,
      current: false,
    },
  ]);

  const [formData, setFormData] = useState<{
    step1: Record<string, any>;
    step2: Record<string, any>;
  }>({
    step1: {},
    step2: {},
  });
  console.log(value);
  const goToNextStep = (step1Data?: Record<string, any>) => {
    if (currentStep === 1 && step1Data) {
      setFormData((prev) => ({ ...prev, step1: step1Data }));
    }

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

  const handleFinalSubmit = (step2Data: Record<string, any>) => {
    const completeData = {
      ...formData.step1,
      ...step2Data,
    };
    console.log('Complete form data:', completeData);
    alert('Form submitted successfully!');
    console.log(value);
    goToNextStep();
  };

  return (
    <div className="flex min-h-screen">
      <div className="xl:w-1/4 h-full">
        <Sidebar steps={steps} currentStep={currentStep} goToStep={goToStep} />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="p-4 flex justify-center">
          <div className="flex space-x-2">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`h-1.5 w-10 md:w-16 rounded-full ${
                  step.id === currentStep
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
          <div className="w-full ">
            {currentStep === 1 && (
              <CreateAccount onContinue={goToNextStep} setValues={setValues} />
            )}
            {currentStep === 2 && (
              <PersonalInformation
                onContinue={handleFinalSubmit}
                setValues={setValues}
              />
            )}
            {currentStep === 3 && <VerifyEmail onContinue={goToNextStep} />}
            {currentStep === 4 && <Pricing onContinue={goToNextStep} />}
            {currentStep === 5 && <Welcome />}
          </div>
        </div>
      </div>
    </div>
  );
}
