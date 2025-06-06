'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, Badge, Dropdown, Menu } from 'antd';
import { IoIosMenu } from 'react-icons/io';
import { UserOutlined, LogoutOutlined, BellOutlined } from '@ant-design/icons';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import { FaAngleDown } from 'react-icons/fa';
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
  const [isLogin, setIsLogin] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // const login = localStorage.getItem('login');
      const login = Cookies.get('token');
      console.log(login);
      setIsLogin(login === 'true');
    }
  }, []);

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

  const menu = (
    <Menu className="min-w-48 rounded-xl shadow-lg">
      <div className="p-4 flex items-center gap-3">
        <Image
          width={200}
          height={200}
          className="!w-12 !h-12 object-cover overflow-hidden rounded-full"
          src={'https://avatar.iran.liara.run/public/16'}
          alt="user profile image"
        />
        <div>
          <h1 className="text-lg text-[#072B5F]">Sarah Johnson</h1>
          <h1 className="text-sm !font-normal leading-none">
            sarah.johnson@example.com
          </h1>
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
          Cookies.remove('token');
          toast.success('Log Out successfully');
          window.location.reload();
        }}
        icon={<LogoutOutlined />}
      >
        Log out
      </Menu.Item>
    </Menu>
  );

  if (!isClient) {
    return null; // or return a loading state
  }

  return (
    <nav className="fixed top-0 left-0 w-full h-fit z-[999] backdrop-blur-2xl bg-[#0C469DB2]/80 !text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link href="/home" className="flex items-center gap-2">
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
                    ? 'border-b-2 border-white rounded-none !text-white'
                    : '',
                  item.disabled && 'cursor-not-allowed opacity-50'
                )}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </div>
        {isLogin ? (
          <div className="items-center 2xl:flex hidden gap-4 text-2xl">
            <Link href={'/notification'}>
              <Badge count={3} size="small" color="#3b5560">
                <Button className="!text-white bg-transparent hover:bg-black/10 !rounded-full">
                  <BellOutlined />
                </Button>
              </Badge>
            </Link>
            <Dropdown
              overlay={menu}
              trigger={['click']}
              placement="bottomRight"
            >
              <div className="flex items-center justify-center gap-2 cursor-pointer">
                <Avatar
                  size={40}
                  src={'https://avatar.iran.liara.run/public/16'}
                  className="cursor-pointer"
                />{' '}
                <span>
                  <FaAngleDown />
                </span>
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
                  className="bg-transparent border-white !text-white hover:!bg-[#072A5E] hover:!text-white"
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
                <Button className="bg-[#072A5E] !text-white hover:bg-[#072A5E]">
                  Sign Up
                </Button>
              </motion.div>
            </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        <div>
          <Link
            className="2xl:hidden !text-white p-2 rounded-md hover:!bg-[#072A5E] transition-colors"
            href={'/notification'}
          >
            <Badge count={3} size="small" color="#3b5560">
              <Button className="!text-white bg-transparent hover:bg-black/10 !rounded-full">
                <BellOutlined size={12} />
              </Button>
            </Badge>
          </Link>
          <motion.button
            className="2xl:hidden !text-white p-2 rounded-md hover:!bg-[#072A5E] transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X size={24} /> : <IoIosMenu size={24} />}
          </motion.button>
        </div>
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
                        ? 'bg-[#072A5E] !text-white'
                        : 'hover:!bg-[#072A5E] hover:!text-white text-blue-100',
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
                <Link href={'/profile-setting'}>
                  <motion.div
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonVariants}
                  >
                    <Button
                      variant="outline"
                      className={`!bg-transparent ${
                        isLogin ? '!block' : '!hidden'
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
                      Cookies.remove('token');
                      toast.success('Log Out successfully');
                      window.location.reload();
                    }}
                    className={`bg-[#072A5E] ${
                      isLogin ? '!block' : '!hidden'
                    } !text-white hover:bg-blue-950 w-full`}
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
                        isLogin ? '!hidden' : '!block'
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
                        isLogin ? '!hidden' : '!block'
                      } !text-white hover:bg-blue-950 w-full`}
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
