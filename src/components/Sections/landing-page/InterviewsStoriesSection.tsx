import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function InterviewsStoriesSection() {
  return (
    <div className="py-16 px-4 bg-white">
      <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="order-1 md:order-1 rounded-lg overflow-hidden">
          <Image
            src="/interview.jpg"
            alt="Interview footage"
            width={400}
            height={300}
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="order-2 md:order-2">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Watch Interviews & Stories
          </h2>
          <p className="text-gray-700 mb-6">
            Hear stories from elders and community members who have lived
            through key historical events. These firsthand accounts provide
            invaluable perspectives on our heritage and connect generations
            through the power of shared experiences.
          </p>
          <Link href={'/timeline'}>
            <Button className="!bg-[#072A5E] hover:!bg-[#072A5E] text-white">
              Explore More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
