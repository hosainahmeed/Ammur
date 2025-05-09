import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-blue-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Logo and Description */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-orange-500 flex items-center justify-center">
                                <Image
                                    src="/placeholder.svg?height=40&width=40"
                                    alt="Family Legacy Logo"
                                    width={40}
                                    height={40}
                                    className="object-cover"
                                />
                            </div>
                            <span className="font-bold text-xl">Family Legacy</span>
                        </div>
                        <p className="text-blue-200 text-sm mt-4">
                            Dedicated to preserving our heritage, celebrating our culture, and connecting generations through shared
                            stories and experiences. Join us in our mission to ensure our legacy lives on.
                        </p>
                    </div>

                    {/* Information Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Information</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/contact" className="text-blue-200 hover:text-white transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-blue-200 hover:text-white transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-blue-200 hover:text-white transition-colors">
                                    Terms and Conditions
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-blue-200 hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Social Media</h3>
                        <div className="space-y-2">
                            <Link
                                href="https://facebook.com"
                                className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors"
                            >
                                <Facebook size={20} />
                                <span>Facebook</span>
                            </Link>
                            <Link
                                href="https://instagram.com"
                                className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors"
                            >
                                <Instagram size={20} />
                                <span>Instagram</span>
                            </Link>
                            <Link
                                href="https://twitter.com"
                                className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors"
                            >
                                <Twitter size={20} />
                                <span>Twitter</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-300 text-sm">
                    © {new Date().getFullYear()} Family Legacy. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
