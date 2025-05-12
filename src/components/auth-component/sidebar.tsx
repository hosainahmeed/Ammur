"use client"

import Link from "next/link"
import { Mail, User, Users, Zap } from "lucide-react"
import type { Step } from "./sign-up-flow"

interface SidebarProps {
  steps: Step[]
  currentStep: number
  goToStep: (step: number) => void
}

export default function Sidebar({ steps, currentStep, goToStep }: SidebarProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "user":
        return <User className="h-5 w-5" />
      case "mail":
        return <Mail className="h-5 w-5" />
      case "users":
        return <Users className="h-5 w-5" />
      case "zap":
        return <Zap className="h-5 w-5" />
      default:
        return null
    }
  }

  return (
    <div className="w-full h-screen bg-white border-r border-gray-200 p-6">
      <div className="mb-10">
        <Link href="/" className="flex items-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-900"
          >
            <path
              d="M3 5L12 14L21 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 12L12 21L21 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="ml-2 text-lg font-semibold text-gray-900">Untitled UI</span>
        </Link>
      </div>

      <div className="space-y-6">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => goToStep(step.id)}
            className={`flex items-start w-full text-left ${
              step.current ? "opacity-100" : "opacity-60"
            } ${step.id <= currentStep ? "cursor-pointer" : "cursor-not-allowed"}`}
            disabled={step.id > currentStep}
          >
            <div className={`mt-0.5 mr-3 ${step.current ? "text-gray-900" : "text-gray-500"}`}>
              {getIcon(step.icon)}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{step.title}</h3>
              <p className="text-sm text-gray-500">{step.description}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="absolute bottom-6 left-6">
        <Link href="/" className="flex items-center text-sm text-gray-600 hover:text-gray-900">
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
  )
}
