import { Button } from "@/components/ui/button"

export default function Welcome() {
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

      <h1 className="text-2xl font-semibold text-center mb-2">Welcome to Untitled!</h1>
      <p className="text-gray-500 text-center mb-6">Get up and running in 3 minutes.</p>

      <div className="rounded-lg overflow-hidden mb-6">
        <img src="/placeholder.svg?height=240&width=400" alt="Welcome" className="w-full h-auto object-cover" />
      </div>

      <Button className="w-full bg-green-600 hover:bg-green-700">Finish up</Button>
    </div>
  )
}
