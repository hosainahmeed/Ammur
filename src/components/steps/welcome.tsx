import { Button } from '@/components/ui/button';

export default function Welcome() {
  const handleNavigate = () => {
    localStorage.setItem('login', 'true');
    window.location.href = '/';
  };
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

      <h1 className="text-2xl font-semibold text-center mb-2">
        Welcome to Untitled!
      </h1>

      <Button
        onClick={() => handleNavigate()}
        className="w-full bg-[#072A5E] !text-white hover:bg-[#072A5E]"
      >
        Finish up
      </Button>
    </div>
  );
}
