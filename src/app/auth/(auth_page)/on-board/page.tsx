import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="w-full max-w-md space-y-6 text-center">
        <h1 className="text-3xl font-bold text-blue-600">Welcome!</h1>
        <p className="text-gray-600">
          Please sign in or create a new account to continue
        </p>
        <div className="flex flex-col space-y-4">
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/auth/on-board/sign-in">Sign In</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            <Link href="/auth/on-board/sign-up">Register</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
