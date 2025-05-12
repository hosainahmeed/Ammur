import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const HistoryTimelineSection = () => {
  return (
    <div className="py-16 px-4">
      <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Honoring the Lives That Shaped Us
          </h2>
          <p className="text-gray-700 mb-6">
            Every family is built on the shoulders of those who came before. In
            this space, we honor the ancestors and loved ones who helped shape
            our story. From cherished memories and life lessons to personal
            tributes and old photographs, this section is a reflection of their
            strength, love, and enduring influence. Here, their legacy lives
            on—not only in words, but in the values and traditions we carry
            forward.
          </p>
          <Link href={'/timeline'}>
            <Button className="!bg-[#072A5E] hover:!bg-[#072A5E] text-white">
              Explore More
            </Button>
          </Link>
        </div>
        <div className="rounded-lg order-1 md:order-2 overflow-hidden">
          <Image
            src="/5999330.jpg"
            alt="Historical photograph"
            width={400}
            height={300}
            className="w-full h-auto object-cover grayscale"
          />
        </div>
      </div>
    </div>
  );
};
export default HistoryTimelineSection;
