'use client'
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const HeroBanner = () => {
    return (
        <div className="relative h-screen w-full overflow-hidden">
            <div className="absolute w-full h-screen inset-0 z-0">
                <Image
                    width={1200}
                    height={800}
                    src="https://fakeimg.pl/600x400"
                    alt="Heritage landscape"
                    className="w-full !h-full object-cover brightness-75"
                    priority
                />
            </div>
            <div className="relative z-10 h-full flex flex-col items-center  justify-center text-center text-white px-4">
                <motion.h1
                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl leading-tight"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    Preserving Our Past. Inspiring Our Future.
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                >
                    <Button className="gradient-button hover:scale-102 text-2xl px-12 pt-6 pb-7">
                        Sign up now
                    </Button>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroBanner;
