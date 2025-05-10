import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const HistoryTimelineSection = () => {
  return (
    <div className="py-16 px-4">
      <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="rounded-lg overflow-hidden">
          <Image
            src="/5999330.jpg"
            alt="Historical photograph"
            width={400}
            height={300}
            className="w-full h-auto object-cover grayscale"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Discover Black History Timeline
          </h2>
          <p className="text-gray-700 mb-6">
            Explore our Black History Timeline, covering the pivotal moments and
            figures that shaped our collective journey. From ancient
            civilizations to modern-day achievements, follow the path of
            resilience, innovation, and cultural significance.
          </p>
          <Link href={'/timeline'}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Explore More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default HistoryTimelineSection;
