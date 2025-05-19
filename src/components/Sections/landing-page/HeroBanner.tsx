// 'use client';
// import Image from 'next/image';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';

// const HeroBanner = () => {
//   return (
//     <div className="relative h-screen bg-[#111] w-full overflow-hidden">
//       <div className="absolute w-full h-screen inset-0 z-0">
//         <Image
//           width={1200}
//           height={800}
//           src="/main_image/hero.png"
//           alt="Heritage landscape"
//           className="w-full !h-full object-cover brightness-65"
//           priority
//         />
//       </div>
//       <div className="relative z-10 h-full flex flex-col items-center  justify-center text-center !text-white px-4">
//         <motion.div
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: 'easeOut' }}
//           className="px-6 py-2 rounded-full bg-white mb-6"
//         >
//           <h1 className="text-black leading-none capitalize text-sm ">
//             Join for full access
//           </h1>
//         </motion.div>
//         <motion.h1
//           className="text-4xl md:text-5xl lg:text-6xl font-bold  max-w-5xl leading-tight"
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: 'easeOut' }}
//         >
//           Preserving Our Past. Inspiring Our Future.
//         </motion.h1>
//         <p className='text-xl max-w-4xl !text-white/70 mb-6'>
//           Honoring our history while shaping a brighter future. Together, we
//           preserve the past and inspire tomorrow’s possibilities
//         </p>
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
//           className="border p-2 rounded-full border-dashed"
//         >
//           <Button className="border-none bg-[#072A5E] !rounded-full hover:scale-102 text-2xl px-12 pt-6 pb-7">
//             Get Started
//           </Button>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default HeroBanner;
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const HeroBanner = () => {
  const socialLinks = [
    { icon: <Facebook size={20} />, href: '#', label: 'Facebook' },
    { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
    { icon: <Instagram size={20} />, href: '#', label: 'Instagram' },
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#111]">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0 h-screen w-full">
        <Image
          width={1920}
          height={1080}
          src="/amurphy/PublicHomePagePic1.jpg"
          alt="Heritage landscape"
          className="h-full w-full object-cover brightness-[0.65]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
      </div>

      {/* Content container */}
      <div className="relative z-10 container mx-auto flex h-full flex-col pb-5 items-start justify-center px-4 text-start !text-white">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-6 rounded-full bg-white/90 px-6 py-2 backdrop-blur-sm"
        >
          <h1 className="text-sm font-medium leading-none text-black capitalize">
            Join for full access
          </h1>
        </motion.div>

        {/* Main heading with animated underline */}
        <div className="relative mb-4">
          <motion.h1
            className="max-w-4xl text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            Preserving Our Past. Inspiring Our Future.
          </motion.h1>
        </div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8 max-w-4xl text-lg !text-white/80 sm:text-xl md:text-2xl"
        >
          Honoring our history while shaping a brighter future. Together, we
          preserve the past and inspire tomorrow&lsquo;s possibilities.
        </motion.p>

        {/* CTA Button */}

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.6 }}
          className="mb-12 rounded-full border border-dashed border-white/30 p-2"
        >
          <Link href={'/auth/sign-in'}>
            <Button className="!rounded-full bg-[#072A5E] px-10 pt-6 pb-7 text-xl font-semibold transition-all duration-300 hover:bg-[#0A3A7D] hover:shadow-lg hover:shadow-blue-900/30 sm:px-12 sm:text-2xl md:px-16 md:text-3xl">
              Get Started
            </Button>
          </Link>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex space-x-4"
        >
          {socialLinks.map((social, index) => (
            <motion.div
              key={social.label}
              whileHover={{ y: -5, scale: 1.1 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
            >
              <Link
                href={social.href}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 !text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                aria-label={social.label}
              >
                {social.icon}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-blue-500/10 to-transparent"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-purple-500/10 to-transparent"
      />
    </div>
  );
};

export default HeroBanner;
