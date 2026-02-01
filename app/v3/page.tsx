"use client";

import { useEffect } from "react";
// @ts-ignore
import Lenis from "@studio-freight/lenis";
import Navbar from "@/components/layout/Navbar";
import CosmicBackground from "@/components/ui/CosmicBackground";
import HeroSphere from "@/components/3d/HeroSphere";
import Hero from "@/components/sections/Hero";
import Scrollytelling from "@/components/sections/Scrollytelling";
import HorizontalScroll from "@/components/sections/HorizontalScroll";

export default function HomeV3() {

    // Initialize Smooth Scroll
    useEffect(() => {
        const lenis = new Lenis()

        function raf(time: any) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
    }, [])

    return (
        <main className="min-h-screen relative w-full overflow-hidden text-white selection:bg-alokai-green selection:text-black">
            <Navbar />
            <CosmicBackground />

            {/* Fixed Sphere Background */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
                <HeroSphere />
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full">
                <Hero />
                {/* Vertical Story */}
                <Scrollytelling />
                {/* Horizontal Ecosystem */}
                <HorizontalScroll />

                {/* Footer / CTA Area */}
                <div className="h-[50vh] flex items-center justify-center">
                    <h2 className="text-4xl font-mono">Ready to Launch?</h2>
                </div>
            </div>
        </main>
    );
}
