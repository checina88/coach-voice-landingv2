"use client";

import { useEffect } from "react";

import Lenis from "@studio-freight/lenis";
import HeroV7 from "@/components/v7/Hero";

export default function HomeV7() {
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
        <main className="min-h-screen w-full bg-alokai-white font-sans text-alokai-text-primary selection:bg-alokai-green selection:text-black">
            {/* Navbar Placeholder (Will build next) */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-alokai-border h-16 flex items-center px-6">
                <div className="text-xl font-bold tracking-tight">
                    SPORTSPHERE <span className="text-alokai-green">.</span>
                </div>
                <div className="ml-auto flex gap-6 text-sm font-medium text-alokai-text-secondary">
                    <a href="#" className="hover:text-alokai-green transition-colors">Platform</a>
                    <a href="#" className="hover:text-alokai-green transition-colors">Solutions</a>
                    <a href="#" className="hover:text-alokai-green transition-colors">Developers</a>
                    <a href="#" className="hover:text-alokai-green transition-colors">Pricing</a>
                </div>
                <button className="ml-8 px-4 py-2 bg-alokai-text-primary text-white text-sm font-bold rounded-md hover:bg-alokai-blue-primary transition-colors">
                    Contact Custom
                </button>
            </nav>

            <HeroV7 />

            {/* Placeholder for next sections */}
            <section className="py-20 bg-alokai-gray">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">Composable Architecture</h2>
                    <p className="text-alokai-text-secondary max-w-2xl mx-auto">
                        Just like Alokai, we provide the building blocks. You build the stadium.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="alokai-card p-8 text-left h-64 flex flex-col justify-between">
                                <div className="w-12 h-12 bg-alokai-green/10 rounded-lg flex items-center justify-center text-alokai-green">
                                    <div className="w-6 h-6 bg-current rounded-sm" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2">Module {i}</h3>
                                    <p className="text-sm text-alokai-text-secondary">Full API coverage for seamless data integration.</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    );
}
