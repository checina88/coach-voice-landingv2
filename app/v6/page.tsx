"use client";

import { useEffect } from "react";

import Lenis from "@studio-freight/lenis";
import Navbar from "@/components/layout/Navbar";
import CosmicBackground from "@/components/ui/CosmicBackground";
import HeroPlanetRevealV6 from "@/components/3d/HeroPlanetRevealV6";
import Hero from "@/components/sections/Hero";
import Scrollytelling from "@/components/sections/Scrollytelling";
import HorizontalScroll from "@/components/sections/HorizontalScroll";

export default function HomeV6() {

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
        <main className="min-h-screen relative w-full overflow-x-hidden text-white selection:bg-alokai-green selection:text-black">
            <Navbar />
            <CosmicBackground />

            {/* Interactive Planet Background */}
            <div className="fixed inset-0 z-0">
                <HeroPlanetRevealV6 />
            </div>

            {/* Main Content */}
            {/* pointer-events-none on container so mouse passes through to Canvas */}
            <div className="relative z-10 w-full pointer-events-none">
                {/* Hero Section (Text) */}
                {/* We need to ensure buttons inside Hero are clickable (pointer-events-auto) */}
                <div className="[&_a]:pointer-events-auto [&_button]:pointer-events-auto">
                    <Hero />
                </div>

                <div className="pointer-events-auto">
                    {/* Vertical Story */}
                    <Scrollytelling />
                    {/* Horizontal Ecosystem */}
                    <HorizontalScroll />
                </div>
            </div>
        </main>
    );
}
