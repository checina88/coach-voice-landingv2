'use client';

import React from 'react';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 pointer-events-none pt-6 px-4">
            {/* Floating glass pill container */}
            <div className="max-w-[1440px] mx-auto bg-white/35 backdrop-blur-xl border border-white/25 rounded-[14px] shadow-lg shadow-black/5 px-8 py-3.5 flex items-center justify-between pointer-events-auto">
                {/* Logo */}
                <a href="/" className="font-sans font-bold text-xl tracking-tight text-[#1a1d21]/90 cursor-pointer">
                    Coach Voice
                </a>

                {/* Menu Items */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#475569]">
                    <a href="#" className="hover:text-[#1a1d21] transition-colors duration-200">About us</a>
                    <a href="#" className="hover:text-[#1a1d21] transition-colors duration-200">Insights</a>
                    <a href="#" className="hover:text-[#1a1d21] transition-colors duration-200">Customers</a>
                    <a href="#" className="hover:text-[#1a1d21] transition-colors duration-200">Pricing</a>

                    <a href="/book" className="px-5 py-2 rounded-full border border-[#3f857e]/30 text-[#3f857e] hover:bg-[#3f857e] hover:text-white transition-all duration-300 text-sm font-semibold">
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
