'use client';

import React, { useState, useEffect } from 'react';

const Navbar = () => {
    // No more scroll state needed if it's always fixed and solid/blur
    // But user asked for "Solid background (derived from current section color)"
    // Since sections might change (Hero, SlowDown), standard solid dark background or blur is safest to act as "ceiling".
    // "Subtle opacity or blur allowed"

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0F0D]/90 backdrop-blur-md border-b border-white/5 h-20 flex items-center transition-all duration-300">
            <div className="first-line:w-full max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between w-full">
                {/* Logo */}
                <div className="font-sans font-bold text-xl tracking-tight text-cv-text-primary cursor-pointer">
                    Coach Voice
                </div>

                {/* Menu Items */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-cv-text-secondary">
                    <a href="#" className="hover:text-cv-text-primary transition-colors">About us</a>
                    <a href="#" className="hover:text-cv-text-primary transition-colors">Insights</a>
                    <a href="#" className="hover:text-cv-text-primary transition-colors">Customers</a>
                    <a href="#" className="hover:text-cv-text-primary transition-colors">Pricing</a>

                    <button className="px-5 py-2 rounded-full border border-cv-accent/50 text-cv-accent hover:bg-cv-accent hover:text-white transition-all duration-300 text-sm">
                        Take Action
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
