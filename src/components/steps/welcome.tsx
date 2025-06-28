import { Button } from '@/components/ui/button';
import Cookies from 'js-cookie';
export default function Welcome() {
  const handleNavigate = () => {
    localStorage.setItem('login', 'true');
    Cookies.set('token', 'true');
    window.location.href = '/';
  };
  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-2xl font-semibold text-center mb-2">
        Your request is being processed
      </h1>
      <p className="text-center">
        Our team is reviewing your application. We will notify you by email once
        it is approved.
      </p>
      <Button
        onClick={() => handleNavigate()}
        className="w-full mt-4 bg-[#072A5E]  !text-white hover:bg-[#072A5E]"
      >
        Finish up
      </Button>
    </div>
  );
}
