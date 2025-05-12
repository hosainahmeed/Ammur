import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function InterviewsStoriesSection() {
  return (
    <div className="py-16 px-4 bg-white">
      <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="order-1 md:order-1 rounded-lg overflow-hidden">
          <Image
            src="/main_image/family.avif"
            alt="Cherishing"
            width={400}
            height={300}
            className="w-full max-h-[400px] object-cover"
          />
        </div>
        <div className="order-2 md:order-2">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Cherishing the Moments That Bring Us Together
          </h2>
          <p className="text-gray-700 mb-6">
            Family is about more than just history—it&lsquo;s about celebrating life
            as it happens. This section highlights the milestones that bring us
            joy and connection: weddings, new babies, graduations, reunions, and
            personal achievements. With heartfelt stories, images, and
            announcements, this is where we capture the spirit of celebration
            and the moments that remind us just how connected we truly are.
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
