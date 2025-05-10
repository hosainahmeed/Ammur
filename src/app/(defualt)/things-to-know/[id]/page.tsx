'use client';
import { useParams } from 'next/navigation';

export default function CategoryPage() {
  const params = useParams();
  const id = params?.id;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Category: {id}</h1>
      {/* Render data based on ID */}
    </div>
  );
}
