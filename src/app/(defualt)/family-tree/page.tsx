// import FamilyTreeV2 from '@/components/family-tree/FamilyTreeV2';

import FamilyTreeV2 from '@/components/family-tree/FamilyTreeV2';


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-2">
        Discover Your Roots: Your Family Tree
      </h1>
      <div className="w-full overflow-x-auto">
        {/* <FamilyTree /> */}
        <FamilyTreeV2 />
      </div>
    </main>
  );
}
