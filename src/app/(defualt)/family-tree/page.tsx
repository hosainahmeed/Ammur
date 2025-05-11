import FamilyTree from '@/components/family-tree/FamilyTree';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-2">
        Discover Your Roots: Your Family Tree
      </h1>
      <div className="w-full max-w-6xl overflow-x-auto">
        <FamilyTree />
      </div>
    </main>
  );
}
