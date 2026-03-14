'use client';

import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [heroIsDark, setHeroIsDark] = useState(false);
    const [heroVisible, setHeroVisible] = useState(true);

    // Listen for hero dark/light state changes
    useEffect(() => {
        const handler = (e: Event) => {
            setHeroIsDark((e as CustomEvent).detail.dark);
        };
        window.addEventListener('hero-state', handler);
        return () => window.removeEventListener('hero-state', handler);
    }, []);

    // Track hero section visibility
    useEffect(() => {
        const section = document.querySelector('#hero');
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => setHeroVisible(entry.isIntersecting),
            { threshold: 0.3 }
        );
        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    const isDark = heroIsDark && heroVisible;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 pointer-events-none pt-6 px-4">
            {/* Floating glass pill container */}
            <div className={`max-w-[1440px] mx-auto backdrop-blur-xl border rounded-[14px] shadow-lg shadow-black/5 px-8 py-3.5 flex items-center justify-between pointer-events-auto transition-all duration-700 ${
                isDark ? 'bg-black/25 border-white/10' : 'bg-white/35 border-white/25'
            }`}>
                {/* Logo */}
                <a href="/" className={`font-sans font-bold text-xl tracking-tight cursor-pointer transition-colors duration-700 ${
                    isDark ? 'text-white/90' : 'text-[#1a1d21]/90'
                }`}>
                    Coach Voice
                </a>

                {/* Menu Items */}
                <div className={`hidden md:flex items-center gap-8 text-sm font-medium transition-colors duration-700 ${
                    isDark ? 'text-white/85' : 'text-[#475569]'
                }`}>
                    <a href="#" className={`transition-colors duration-200 ${isDark ? 'hover:text-white' : 'hover:text-[#1a1d21]'}`}>About us</a>
                    <a href="#" className={`transition-colors duration-200 ${isDark ? 'hover:text-white' : 'hover:text-[#1a1d21]'}`}>Insights</a>
                    <a href="#" className={`transition-colors duration-200 ${isDark ? 'hover:text-white' : 'hover:text-[#1a1d21]'}`}>Customers</a>
                    <a href="#" className={`transition-colors duration-200 ${isDark ? 'hover:text-white' : 'hover:text-[#1a1d21]'}`}>Pricing</a>

                    <a href="/book" className={`px-5 py-2 rounded-full border transition-all duration-500 text-sm font-semibold ${
                        isDark
                            ? 'border-white/30 text-white hover:bg-white/15'
                            : 'border-[#3f857e]/30 text-[#3f857e] hover:bg-[#3f857e] hover:text-white'
                    }`}>
                        Take Action
                    </a>
                </div>
            </div>

            {/* Gradient fade mask — content fades behind the navbar area */}
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-b from-transparent to-transparent pointer-events-none -mb-6" />
        </nav>
    );
};

export default Navbar;
