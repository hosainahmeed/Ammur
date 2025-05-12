import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutUsSection() {
  return (
    <div className="py-16 px-4">
      <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="rounded-lg overflow-hidden">
          <Image
            src="/family.jpg"
            alt="Community members"
            width={400}
            height={300}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-blue-800 mb-4">About Us</h2>
          <p className="text-gray-700 mb-6">
            This platform was created to preserve and celebrate the rich legacy
            of our families—and pass down our history, personal stories, and
            valuable knowledge to future generations. It&lsquo;s a digital home
            where history, culture, and connection come together. From history
            timelines and personal interviews to family trees, recipes, and
            archives, this space is designed for both learning and bonding.
            Whether you&lsquo;re a grandparent, cousin, or youth, there&lsquo;s
            something here for you.
          </p>
          <Link href={'/about'}>
            <Button className="!bg-[#072A5E] hover:!bg-[#072A5E] text-white">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
