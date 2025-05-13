'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, Dropdown, Menu } from 'antd';
import { IoIosMenu } from 'react-icons/io';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { toast } from 'sonner';
type NavItem = {
  label: string;
  href: string;
  disabled?: boolean;
};

const mobileMenuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 200,
    },
  },
  exit: { opacity: 0, y: -20 },
};

const navItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      ease: 'easeOut',
    },
  }),
};

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navItems: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Timeline', href: '/timeline' },
    { label: 'Things to Know', href: '/things-to-know' },
    { label: 'Family direction', href: '/family-direction' },
    { label: 'Family tree', href: '/family-tree' },
    { label: 'Interviews', href: '/interviews' },
    { label: 'Recipes', href: '/recipes' },
    { label: 'Message', href: '/message' },
    { label: 'Legacy', href: '/legacy' },
    { label: 'Archives', href: '/archives' },
  ];

  const isActive = (href: string) => {
    return pathname === href || (href !== '/' && pathname.startsWith(href));
  };
  const login = localStorage.getItem('login');
  const islogin = login === 'true';
  const menu = (
    <Menu className="min-w-48 rounded-xl shadow-lg">
      <div className="p-4 flex items-center gap-3">
        <Image
          width={200}
          height={200}
          className="!w-12 !h-12 object-cover overflow-hidden rounded-full"
          src={'/naru.png'}
          alt="user profile image"
        />
        <div>
          <h1 className="font-semibold text-base">{''}</h1>
          <h1 className="font-normal opacity-75 text-sm">{''}</h1>
        </div>
      </div>
      <Menu.Divider />
      <Menu.Item key="1" icon={<UserOutlined />}>
        <Link href="/profile-setting">Profile</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="4"
        onClick={() => {
          localStorage.removeItem('login');
          toast.success('Log Out successfully');
          window.location.reload();
        }}
        icon={<LogoutOutlined />}
      >
        Log out
      </Menu.Item>
    </Menu>
  );
  return (
    <nav className="fixed top-0 left-0 w-full h-fit z-[999] backdrop-blur-2xl bg-[#0C469DB2]/80 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-orange-500 flex items-center justify-center">
              <Image
                src="/icons/IconOnly.svg"
                alt="Family Legacy Logo"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-semibold">Family Legacy</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden 2xl:flex items-center gap-1">
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial="hidden"
              animate="visible"
              custom={index}
              variants={navItemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={item.disabled ? '#' : item.href}
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-normal transition-colors',
                  isActive(item.href)
                    ? 'border-b-2 border-white rounded-none text-white'
                    : '',
                  item.disabled && 'cursor-not-allowed opacity-50'
                )}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </div>
        {islogin ? (
          <div className="items-center 2xl:flex hidden gap-4 text-2xl">
            <Dropdown
              overlay={menu}
              trigger={['click']}
              placement="bottomRight"
            >
              <div className="flex items-center justify-center gap-2 cursor-pointer">
                <Avatar
                  size={40}
                  src={'/naru.png'}
                  className="cursor-pointer"
                />
                <h1 className="text-sm">user name</h1>
              </div>
            </Dropdown>
          </div>
        ) : (
          <div className="hidden 2xl:flex items-center gap-2">
            <Link href={'/auth/sign-in'}>
              <motion.div
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
              >
                <Button
                  variant="outline"
                  className="bg-transparent border-white text-white hover:!bg-[#072A5E] hover:!text-white"
                >
                  Sign In
                </Button>
              </motion.div>
            </Link>
            <Link href={'/auth/sign-up'}>
              <motion.div
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
              >
                <Button className="bg-[#072A5E] text-white hover:bg-[#072A5E]">
                  Sign Up
                </Button>
              </motion.div>
            </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        <motion.button
          className="2xl:hidden text-white p-2 rounded-md hover:!bg-[#072A5E] transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMenuOpen ? <X size={24} /> : <IoIosMenu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className="2xl:hidden  mt-2 p-4 rounded-md"
          >
            <motion.div className="flex flex-col gap-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  custom={index}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href={item.disabled ? '#' : item.href}
                    className={cn(
                      'px-3 py-2 rounded-md text-sm font-medium transition-colors block',
                      isActive(item.href)
                        ? 'bg-[#072A5E] text-white'
                        : 'hover:!bg-[#072A5E] hover:text-white text-blue-100',
                      item.disabled && 'cursor-not-allowed opacity-50'
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                className="flex flex-col gap-2 mt-4 pt-2 border-t border-blue-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: navItems.length * 0.05 + 0.1 }}
              >
                <Link href={'/profile'}>
                  <motion.div
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonVariants}
                  >
                    <Button
                      variant="outline"
                      className={`!bg-transparent ${
                        islogin ? '!block' : '!hidden'
                      } !border-white !text-white hover:!bg-[#072A5E] hover:!text-white w-full`}
                    >
                      Profile
                    </Button>
                  </motion.div>
                </Link>
                <motion.div
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonVariants}
                >
                  <Button
                    onClick={() => {
                      localStorage.removeItem('login');
                      toast.success('Log Out successfully');
                      window.location.reload();
                    }}
                    className={`bg-[#072A5E] ${
                      islogin ? '!block' : '!hidden'
                    } text-white hover:bg-blue-950 w-full`}
                  >
                    Sign Out
                  </Button>
                </motion.div>
                <Link href={'/auth/sign-in'}>
                  <motion.div
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonVariants}
                  >
                    <Button
                      variant="outline"
                      className={`!bg-transparent ${
                        islogin ? '!hidden' : '!block'
                      } !border-white !text-white hover:!bg-[#072A5E] hover:!text-white w-full`}
                    >
                      Sign In
                    </Button>
                  </motion.div>
                </Link>
                <Link href={'/auth/sign-up'}>
                  <motion.div
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonVariants}
                  >
                    <Button
                      className={`bg-[#072A5E] ${
                        islogin ? '!hidden' : '!block'
                      } text-white hover:bg-blue-950 w-full`}
                    >
                      Sign Up
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
