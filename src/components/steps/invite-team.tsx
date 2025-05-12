"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"

interface InviteTeamProps {
  onContinue: () => void
}

export default function InviteTeam({ onContinue }: InviteTeamProps) {
  const [emails, setEmails] = useState<string[]>(["", "", ""])

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...emails]
    newEmails[index] = value
    setEmails(newEmails)
  }

  const addMoreEmail = () => {
    setEmails([...emails, ""])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onContinue()
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

      <h1 className="text-2xl font-semibold text-center mb-2">Invite your team</h1>
      <p className="text-gray-500 text-center mb-6">Start collaborating with your team.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Email address*</label>
          {emails.map((email, index) => (
            <Input
              key={index}
              type="email"
              placeholder="Enter an email address"
              value={email}
              onChange={(e) => handleEmailChange(index, e.target.value)}
            />
          ))}
        </div>

        <Button
          type="button"
          variant="ghost"
          className="w-full flex items-center justify-center text-gray-500 hover:text-gray-900"
          onClick={addMoreEmail}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add more
        </Button>

        <div className="pt-4">
          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
            Continue
          </Button>
        </div>
      </form>
    </div>
  )
}
