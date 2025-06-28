'use client';

import { useState } from 'react';
import Sidebar from './sidebar';
import CreateAccount from '../steps/create-account';
import Welcome from '../steps/welcome';
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
  const [steps, setSteps] = useState<Step[]>([
    {
      id: 1,
      title: 'Credentials',
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
      title: 'Welcome to Family legacy!',
      description: 'Thank you for join our family',
      icon: 'zap',
      completed: false,
      current: false,
    },
  ]);

  const goToNextStep = () => {
    if (currentStep < 3) {
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

  const handleFinalSubmit = () => {
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
            {currentStep === 1 && <CreateAccount onContinue={goToNextStep} />}
            {currentStep === 2 && (
              <PersonalInformation onContinue={handleFinalSubmit} />
            )}
            {currentStep === 3 && <Welcome />}
          </div>
        </div>
      </div>
    </div>
  );
}
