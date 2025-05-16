import { Button } from '@/components/ui/button';

export default function Welcome() {
  const handleNavigate = () => {
    localStorage.setItem('login', 'true');
    window.location.href = '/';
  };
  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-2xl font-semibold text-center mb-2">
        Welcome to Family legacy!
      </h1>

      <Button
        onClick={() => handleNavigate()}
        className="w-full bg-[#072A5E]  !text-white hover:bg-[#072A5E]"
      >
        Finish up
      </Button>
    </div>
  );
}
