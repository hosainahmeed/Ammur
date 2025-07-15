'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaXTwitter } from 'react-icons/fa6';
import { useSocialMediaQuery } from '@/app/provider/Redux/service/socialApis';
import { Empty } from 'antd';

export default function Footer() {
  const path = usePathname();
  const footerHide = path === '/message';
  const [socialModalOpen, setSocialModalOpen] = useState(false);
  const [selectSocial, setSelectSocial] = useState([]);
  const { data: socialData, isLoading } = useSocialMediaQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const socialTrack = (name: string) => {
    if (isLoading) {
      return;
    }
    const filtered = socialData?.data?.filter(
      (item: any) => item.name?.toLowerCase() === name.toLowerCase()
    );
    setSelectSocial(filtered);
  };
  return (
    <div>
      {!footerHide && (
        <footer className="bg-[#072A5E] !text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Logo and Description */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-orange-500 flex items-center justify-center">
                    <Image
                      src="/icons/IconOnly.svg"
                      alt="Family Legacy Logo"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <span className="font-bold text-xl">Family Legacy</span>
                </div>
                <p className="text-blue-200 text-sm mt-4">
                  Dedicated to preserving our heritage, celebrating our culture,
                  and connecting generations through shared stories and
                  experiences. Join us in our mission to ensure our legacy lives
                  on.
                </p>
              </div>

              {/* Information Links */}
              <div>
                <h3 className="font-bold text-lg mb-4">Information</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/contact"
                      className="text-blue-200 hover:!text-white transition-colors"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-blue-200 hover:!text-white transition-colors"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="text-blue-200 hover:!text-white transition-colors"
                    >
                      Terms and Conditions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="text-blue-200 hover:!text-white transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-bold text-lg mb-4">Social Media</h3>
                <div className="space-y-2">
                  <h1
                    onClick={() => {
                      socialTrack('Facebook');
                      setSocialModalOpen(true);
                    }}
                    className="flex cursor-pointer items-center gap-2 text-blue-200 hover:!text-white transition-colors"
                  >
                    <Facebook size={20} />
                    <span>Facebook</span>
                  </h1>
                  <h1
                    onClick={() => {
                      socialTrack('Instagram');
                      setSocialModalOpen(true);
                    }}
                    className="flex cursor-pointer items-center gap-2 text-blue-200 hover:!text-white transition-colors"
                  >
                    <Instagram size={20} />
                    <span>Instagram</span>
                  </h1>
                  <h1
                    onClick={() => {
                      socialTrack('Twitter');
                      setSocialModalOpen(true);
                    }}
                    className="flex cursor-pointer items-center gap-2 text-blue-200 hover:!text-white transition-colors"
                  >
                    <FaXTwitter className="text-white" size={20} />
                    <span>X</span>
                  </h1>
                </div>
              </div>
            </div>

            <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-300 text-sm">
              © {new Date().getFullYear()} Family Legacy. All rights reserved.
            </div>
          </div>
          <AnimatePresence>
            {socialModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setSocialModalOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-gray-900">
                        Social Media
                      </h2>
                      <button
                        onClick={() => setSocialModalOpen(false)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <FaXTwitter className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      {selectSocial.length > 0 ? (
                        selectSocial.map((item: any) => (
                          <div key={item._id}>
                            <h1 className="text-lg text-black font-semibold">
                              {item.name}
                            </h1>
                            <Link href={item.url} target="_blank" className="text-sm hover:!text-blue-500 text-gray-500">{item.url}</Link>
                          </div>
                        ))
                      ) : (
                        <Empty
                          description="No Social Media Found"
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </footer>
      )}
    </div>
  );
}
