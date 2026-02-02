'use client';

import React, { useState, useEffect } from 'react';

const Navbar = () => {
    // No more scroll state needed if it's always fixed and solid/blur
    // But user asked for "Solid background (derived from current section color)"
    // Since sections might change (Hero, SlowDown), standard solid dark background or blur is safest to act as "ceiling".
    // "Subtle opacity or blur allowed"

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#e0e0e0]/70 backdrop-blur-xl border-b border-white/10 h-24 flex items-center transition-all duration-500">
            {/* Gradient Mask for "Water" effect at bottom edge - experimental but adds softness */}
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-b from-transparent to-white/5 blur-xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between w-full relative z-10">
                {/* Logo - Darker for contrast on light bg */}
                <a href="/" className="font-sans font-bold text-xl tracking-tight text-[#1a1d21]/90 cursor-pointer">
                    Coach Voice
                </a>

                {/* Menu Items */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#475569]">
                    <a href="#" className="hover:text-[#1a1d21] transition-colors">About us</a>
                    <a href="#" className="hover:text-[#1a1d21] transition-colors">Insights</a>
                    <a href="#" className="hover:text-[#1a1d21] transition-colors">Customers</a>
                    <a href="#" className="hover:text-[#1a1d21] transition-colors">Pricing</a>

                    <a href="/book" className="px-5 py-2 rounded-full border border-[#3f857e]/30 text-[#3f857e] hover:bg-[#3f857e] hover:text-white transition-all duration-300 text-sm font-semibold">
                        Take Action
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
