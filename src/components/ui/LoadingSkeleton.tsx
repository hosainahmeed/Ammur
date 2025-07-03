'use client';

import { Card } from 'antd';

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <Card key={i} loading className="h-96" />
    ))}
  </div>
);

export default LoadingSkeleton;
