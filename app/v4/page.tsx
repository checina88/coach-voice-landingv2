"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Navbar from "@/components/layout/Navbar";
import HeroReveal from "@/components/3d/HeroReveal";
import Scrollytelling from "@/components/sections/Scrollytelling";
import HorizontalScroll from "@/components/sections/HorizontalScroll";
import { motion } from "framer-motion";

export default function HomeV4() {

    // Initialize Smooth Scroll
    useEffect(() => {
        const lenis = new Lenis()

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
    }, [])

    return (
        <main className="min-h-screen relative w-full overflow-hidden text-white selection:bg-alokai-green selection:text-black bg-cosmic-black">
            <Navbar />

            {/* Hero Section with Reveal Effect */}
            <section className="relative h-screen w-full overflow-hidden">
                <HeroReveal />

                {/* Overlay Text (Optional - can be minimal to let the image speak) */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-6xl md:text-8xl font-bold font-mono text-white/10 mix-blend-overlay tracking-tighter"
                    >
                        UNLEASH
                    </motion.h1>
                </div>
            </section>

            {/* Main Content */}
            <div className="relative z-10 w-full bg-cosmic-black">
                {/* Vertical Story */}
                <Scrollytelling />
                {/* Horizontal Ecosystem */}
                <HorizontalScroll />

                {/* Footer / CTA Area */}
                <div className="h-[50vh] flex items-center justify-center border-t border-white/10">
                    <h2 className="text-4xl font-mono">Ready to Launch?</h2>
                </div>
            </div>
        </main>
    );
}
