"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface VerifyEmailProps {
  onContinue: () => void
  email: string
}

export default function VerifyEmail({ onContinue, email }: VerifyEmailProps) {
  const [verificationCode, setVerificationCode] = useState<string[]>(["", "", "", ""])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    // Focus the first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleInputChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode]
      newCode[index] = value
      setVerificationCode(newCode)

      // Move to next input if current one is filled
      if (value !== "" && index < 3 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current is empty
    if (e.key === "Backspace" && verificationCode[index] === "" && index > 0) {
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus()
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (verificationCode.every((code) => code !== "")) {
      onContinue()
    }
  }

  const handleResend = () => {
    // In a real app, this would trigger the resend code API
    alert("Verification code resent!")
  }

  return (
    <div className="w-full">
      <div className="flex justify-center mb-6">
        <svg
          width="32"
          height="32"
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
      </div>

      <h1 className="text-2xl font-semibold text-center mb-2">Verify your email</h1>
      <p className="text-gray-500 text-center mb-6">We sent a code to {email || "email@untitledui.com"}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center space-x-4">
          {[0, 1, 2, 3].map((index) => (
            <Input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              className="w-16 h-16 text-center text-2xl"
              value={verificationCode[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              required
            />
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Didn't get a code?{" "}
            <button type="button" onClick={handleResend} className="text-gray-900 font-medium hover:underline">
              Click to resend
            </button>
          </p>
        </div>

        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700"
          disabled={!verificationCode.every((code) => code !== "")}
        >
          Continue
        </Button>
      </form>
    </div>
  )
}
