'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { TimelineEntryType } from '@/lib/types';
import { Button, Card } from 'antd';
import Link from 'next/link';

interface TimelineEntryProps {
  entry: TimelineEntryType;
}

const ArchiveEntry = ({ entry }: TimelineEntryProps) => {
  return (
    <Card>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div
          className={cn(
            'relative overflow-hidden rounded-lg shadow-md aspect-[4/3]'
          )}
        >
          <Image
            src={entry.imageUrl || '/placeholder.svg'}
            alt={entry.title}
            width={1200}
            height={1200}
            className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
        </div>

        {/* Content */}
        <div className={cn('flex flex-col justify-center')}>
          <div className="flex items-center gap-2 mb-2">
            <time className="text-sm font-medium text-gray-500">
              {entry.date}
            </time>
            <span className="text-xl font-bold text-blue-600">
              {entry.year}
            </span>
          </div>

          <h2 className="text-xl xl:text-3xl font-bold text-gray-900 mb-3">
            {entry.title}
          </h2>

          <p className="text-gray-600 mb-4 leading-relaxed">
            {entry?.description?.slice(0, 150)}...
          </p>
          <Link href={`/archives/${entry.id}`}>
            <Button className="!w-full !!text-white !bg-[#072A5E]">
              Details
            </Button>
          </Link>
        </div>
      </motion.div>
    </Card>
  );
};

export default ArchiveEntry;
