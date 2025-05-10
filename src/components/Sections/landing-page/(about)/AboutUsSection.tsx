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
            Our mission is to preserve and celebrate the rich legacy of our
            communities. We are dedicated to collecting, archiving, and sharing
            stories that highlight our cultural heritage and historical
            significance. Through education and community engagement, we aim to
            build bridges between generations and ensure our history lives on.
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
