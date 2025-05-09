"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

type NavItem = {
    label: string
    href: string
    disabled?: boolean
}

const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            damping: 25,
            stiffness: 200
        }
    },
    exit: { opacity: 0, y: -20 }
}

const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.05,
            ease: "easeOut"
        }
    })
}

const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
}

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        setIsMenuOpen(false)
    }, [pathname])

    const navItems: NavItem[] = [
        { label: "Home", href: "/" },
        { label: "Timeline", href: "/timeline" },
        { label: "Things to Know", href: "/things-to-know" },
        { label: "Family direction", href: "/family-direction" },
        { label: "Family tree", href: "/family-tree" },
        { label: "Interviews", href: "/interviews" },
        { label: "Recipes", href: "/recipes" },
        { label: "Message", href: "/message" },
        { label: "Legacy", href: "/legacy" },
        { label: "Archives", href: "/archives" },
    ]

    const isActive = (href: string) => {
        return pathname === href || (href !== "/" && pathname.startsWith(href))
    }

    return (
        <nav
            className="fixed top-0 left-0 w-full h-fit z-[999] backdrop-blur-2xl bg-[#6986b0]/60 text-white p-4 shadow-md"
        >
            <div className="container mx-auto flex justify-between items-center">
                <motion.div whileHover={{ scale: 1.05 }}>
                    <Link href="/" className="flex items-center gap-2">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-orange-500 flex items-center justify-center">
                            <Image
                                src="/placeholder.svg?height=32&width=32"
                                alt="Family Legacy Logo"
                                width={32}
                                height={32}
                                className="object-cover"
                            />
                        </div>
                        <span className="font-semibold">Family Legacy</span>
                    </Link>
                </motion.div>

                {/* Desktop Navigation */}
                <div className="hidden xl:flex items-center gap-1">
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
                                href={item.disabled ? "#" : item.href}
                                className={cn(
                                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                    isActive(item.href)
                                        ? "bg-blue-900 text-white"
                                        : "hover:bg-blue-800 hover:text-white text-blue-100",
                                    item.disabled && "cursor-not-allowed opacity-50"
                                )}
                            >
                                {item.label}
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="hidden xl:flex items-center gap-2">
                    <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
                        <Button variant="outline" className="bg-transparent border-white text-white hover:bg-blue-700">
                            Sign In
                        </Button>
                    </motion.div>
                    <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
                        <Button className="bg-blue-800 text-white hover:bg-blue-900">Sign Up</Button>
                    </motion.div>
                </div>

                {/* Mobile Menu Button */}
                <motion.button
                    className="xl:hidden text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
                        className="xl:hidden bg-blue-800 mt-2 p-4 rounded-md shadow-lg"
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
                                        href={item.disabled ? "#" : item.href}
                                        className={cn(
                                            "px-3 py-2 rounded-md text-sm font-medium transition-colors block",
                                            isActive(item.href)
                                                ? "bg-blue-900 text-white"
                                                : "hover:bg-blue-700 hover:text-white text-blue-100",
                                            item.disabled && "cursor-not-allowed opacity-50"
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
                                <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
                                    <Button variant="outline" className="bg-transparent border-white text-white hover:bg-blue-700 w-full">
                                        Sign In
                                    </Button>
                                </motion.div>
                                <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
                                    <Button className="bg-blue-900 text-white hover:bg-blue-950 w-full">Sign Up</Button>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}